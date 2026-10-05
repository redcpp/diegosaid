---
title: ADR-47 para ingenieros de software
subtitle: Cómo revisar una propuesta de economía de tokens como revisas un pull request. Encuentra el invariante, sigue el puntero, escribe la prueba que falla.
excerpt: El mismo argumento del ADR-47 formal, sin teoremas. Una propuesta para una stablecoin pedía saltarse el invariante de solvencia. Cuarenta líneas de Python muestran por qué ese atajo era un ciclo de referencias y cómo se ve la prueba que falla.
date: 2026-09-07
readMinutes: 10
tags:
  - DeFi
  - Code review
  - Invariantes
  - Python
---

En 2022 era desarrollador core en xBacked, que emitía xUSD, una stablecoin sobrecolateralizada en Algorand. Un socio, Pact, propuso un mecanismo para fondear un pool de liquidez PACT/xUSD para el lanzamiento de su token. Fui coautor del documento de decisión de arquitectura en contra, el ADR-47, y el lanzamiento no ocurrió de esa forma. La [versión formal](/es/blog/adr47/) tiene las demostraciones. Esta tiene el código.

Si alguna vez revisaste un pull request que agregaba un atajo "temporal" para saltarse una validación, ya conoces la forma del argumento.

## El invariante

xUSD tenía una regla de la que dependía todo lo demás. Cada vault (una bóveda: una posición donde depositas colateral y pides prestado contra él) guarda colateral $C$ y una deuda $D$ en xUSD, y el contrato rechaza cualquier operación que la deje en

$$
\frac{C}{D} < \mathrm{cr}
$$

donde $\mathrm{cr}$ era 1.10. Sumada sobre todas las vaults, esa regla es lo que convierte "1 xUSD vale un dólar" en una afirmación sobre activos y no en una esperanza. Todo lo que hace un keeper, cada liquidación y cada redención, existe para restablecer este invariante cuando el precio se mueve en contra.

En términos de código: `mint()` solo se puede llamar desde dentro de una vault, después de `deposit()`, y revisa la razón. No había otro camino en el código que creara xUSD.

## La propuesta, como diff

Sin la presentación, la propuesta del socio eran cuatro pasos.

1. Pact le manda $x$ tokens PACT a xBacked.
2. xBacked emite $y$ xUSD **sin vault y sin colateral**.
3. xBacked deposita ambos en un pool AMM de producto constante y recibe tokens LP.
4. Los tokens LP se declaran el respaldo de los $y$ xUSD del paso 2.

El paso 2 es un camino privilegiado nuevo en el código: un `mint()` que se salta la revisión de la razón. El paso 4 es el comentario en el pull request que explica por qué eso está bien. La pregunta de la revisión es si el comentario es cierto.

## "Respaldado por" es un puntero

Cuando alguien dice que el activo $A$ está respaldado por el activo $B$, te está dando un puntero. El respaldo solo significa algo si puedes seguir la cadena de punteros hasta algo fuera del sistema: dólares en un banco, un token que cotiza por su cuenta, colateral que aportó alguien más. Llamémosles raíces.

Un recolector de basura decide que un objeto está vivo solo si se puede alcanzar desde una raíz. Dos objetos que se apuntan entre sí sin ninguna raíz alcanzable son basura, por muchas referencias que tengan. La cadena de punteros de la propuesta era:

```text
y xUSD  ──respaldado por──▶  tokens LP
tokens LP  ──derecho sobre──▶  reservas del pool
reservas del pool  =  x PACT  +  y xUSD
```

Síguela. Los tokens LP son un derecho sobre el pool. El pool guarda dos cosas: el PACT, que es una raíz, y el xUSD que emitimos en el paso 2, que es justo lo que intentamos respaldar. La mitad del respaldo es una referencia de vuelta al propio pasivo.

Una vez que lo ves, la pregunta se vuelve cuantitativa: después de borrar la autorreferencia, ¿cuánto queda y alcanza?

## Escribe el invariante como función

Todo el ADR-47 se desprende de una función. Calcula por cuánto se puede redimir de verdad una participación LP, contando solo los activos que vinieron de fuera.

```python
def real_value(share, external_assets):
    """Lo que una participación LP puede redimir, contando solo activos que vinieron de fuera."""
    return share * external_assets
```

La palabra que hace el trabajo es `external_assets`. El valor nominal del pool incluye nuestro propio xUSD emitido. El valor real no. Cada resultado de abajo es esta función aplicada a un estado distinto del pool.

## Prueba 1: el emisor es el único LP

El caso más simple. xBacked crea el pool, así que es dueño del 100% de los tokens LP. Para que el pool abra al precio de mercado de PACT, el lado de xUSD tiene que valer en dólares lo mismo que el lado de PACT, así que $y = p\,x$.

```python
P = 1.00           # precio de lanzamiento de PACT, en dólares
X = 1_000_000      # PACT que aporta el socio
Y = P * X          # xUSD emitido de la nada para que el pool abra al precio P

pool_total = P * X + Y
external = P * X                      # el xUSD del pool es nuestro propio pasivo
issuer_share = (P * X + Y) / pool_total
backing = real_value(issuer_share, external)

assert backing >= Y                   # pasa, con margen cero
assert backing > Y, "no buffer"       # falla
```

```text
sole LP: minted=1,000,000 real backing=1,000,000 buffer=0
AssertionError: no buffer
```

La primera aserción pasa. También es la que tenían en mente los autores de la propuesta, y pasa por construcción: al lanzamiento recuperas exactamente el PACT que te dieron. La segunda es la que importa. Una vault de stablecoin exige colateral por encima de la deuda, no igual a ella. Esta posición equivale a una vault con 100% de loan-to-value. Cualquier caída en el precio de PACT, por mínima que sea, deja xUSD en circulación sin nada detrás.

Si hubieras propuesto abrir una vault normal con \$1M de PACT y emitir \$1M de xUSD contra ella, el contrato habría rechazado la transacción. El envoltorio de LP es la misma posición sin la revisión.

## Prueba 2: ya hay otras personas en el pool

Ahora supón que el pool ya existía y que proveedores de liquidez externos tenían \$3M dentro. xBacked agrega su \$1M de PACT más \$1M de xUSD emitido y recibe una participación de 40%.

```python
V0 = 3_000_000                        # valor que aportaron antes los LPs externos
pool_total = V0 + P * X + Y
external = V0 + P * X
issuer_share = (P * X + Y) / pool_total
lp_share = V0 / pool_total

issuer_real = real_value(issuer_share, external)
lp_real = real_value(lp_share, external)
```

```text
shared: issuer backing=1,600,000  external LPs 3,000,000 -> 2,400,000
```

El respaldo del emisor subió, de \$1.0M a \$1.6M. Parece que el pool compartido arregló el problema. Mira el segundo número. Los LPs externos aportaron \$3.0M y ahora pueden redimir \$2.4M. Los \$600 mil de respaldo extra que ganó el emisor son exactamente los \$600 mil que perdieron los LPs externos.

Nada en la cadena marca la diferencia. Un token LP es un token LP. Los proveedores externos no pueden ver, solo con el estado del pool, que el 20% de las reservas que comparten es un pasivo sin respaldo de alguien más. El mecanismo los diluye en silencio y en una cantidad que crece con la emisión.

En términos de revisión: el camino nuevo en el código pasa su propia prueba escribiendo en memoria que le pertenece a otro.

## Prueba 3: el precio se mueve

Las pruebas 1 y 2 son fotos del lanzamiento. Los tokens recién lanzados no sostienen su precio de salida. El pool es un AMM de producto constante, así que el arbitraje mueve las reservas hasta que el precio del pool coincide con el del mercado. Si PACT cae a una fracción $r$ de su precio de lanzamiento, las reservas quedan en

$$
R_{\mathrm{PACT}} = \sqrt{k / r}, \qquad R_{\mathrm{xUSD}} = \sqrt{k \cdot r}, \qquad k = x_0\, y_0.
$$

Cuando el emisor redime sus tokens LP, recibe ambas reservas. El xUSD lo puede quemar directo. El PACT lo puede vender al nuevo precio y usar lo que obtenga para comprar y quemar más xUSD.

```python
from math import sqrt

def retirable(r, x0=X, y0=Y):
    """xUSD que el emisor puede quemar después de redimir sus tokens LP con una razón de precio r."""
    k = x0 * y0
    reserve_y = sqrt(k * r)           # el arbitraje ajusta las reservas hasta que el precio = r
    reserve_x = sqrt(k / r)
    burn_direct = reserve_y
    burn_from_sale = reserve_x * (P * r)
    return burn_direct + burn_from_sale

for r in (1.0, 0.5, 0.25, 0.10, 0.01):
    got = retirable(r)
    print(f"r={r:<5} retirable={got:>12,.0f}  covered={'yes' if got >= Y else 'NO '} ({got / Y:.2f}x)")
```

```text
r=1.0   retirable=   2,000,000  covered=yes (2.00x)
r=0.5   retirable=   1,414,214  covered=yes (1.41x)
r=0.25  retirable=   1,000,000  covered=yes (1.00x)
r=0.1   retirable=     632,456  covered=NO  (0.63x)
r=0.01  retirable=     200,000  covered=NO  (0.20x)
```

Los dos términos se simplifican a $y_0\sqrt{r}$, así que el emisor puede retirar $2\sqrt{r}$ veces lo que emitió. Eso es al menos 1 solo mientras $r \ge 0.25$. Una caída de 75% es la línea. Por debajo, el mecanismo creó xUSD que ninguna cantidad de deshacer posiciones puede sacar de circulación, y cada otro tenedor de xUSD queda un poco menos respaldado de lo que el contrato le prometió.

Una caída de 75% en el primer año de un token no es un caso raro. Está más cerca de la mediana.

## El comentario de la revisión

El objetivo de una revisión no es decir que no. Es decir qué pasaría. La meta real de la alianza, usar el balance de xBacked para darle a PACT liquidez y un precio, era razonable. El arreglo era mandarla por el camino del código que ya existía.

Abre una vault. Deposita el PACT como colateral. Emite xUSD contra él con una razón de colateralización que refleje lo volátil que es un token nuevo, es decir, una alta. Todas las propiedades que le faltaban a la propuesta vienen gratis:

- La razón es pública y por vault. Cualquiera puede revisar el respaldo.
- El motor de liquidaciones que ya existe se encarga de una caída. Sin código para casos especiales.
- Ningún LP externo ni ningún otro dueño de vault queda reclutado en silencio como respaldo.
- El riesgo de precio lo carga el dueño de la vault, que es el socio, donde debe estar.

La vault emite menos xUSD por el mismo PACT. Eso no es un defecto de la alternativa. Es el colchón que la propuesta intentaba saltarse.

## Lo que se generaliza

**Todo "respaldado por" es un puntero. Síguelo hasta una raíz.** Si la cadena pasa por lo mismo que se está respaldando, el respaldo es un ciclo, y un ciclo vale exactamente su contenido externo.

**Nominal y real son campos distintos.** El valor total del pool y su valor externo estaban disponibles en la cadena. La propuesta citaba el primero. El invariante necesita el segundo. Un bug común en mecanismos económicos es confundir estos dos números.

**La prueba que falla es el argumento.** Las tres pruebas de arriba caben en cuarenta líneas. Escrita así, la discusión es sobre si el modelo es correcto, no sobre si la preocupación es válida.

**Nunca hagas un caso especial del invariante.** Un camino privilegiado alrededor de una revisión de solvencia no es una funcionalidad de una alianza. Es justo el cambio que el contrato se escribió para impedir. Cuando una petición necesita un atajo para funcionar, el problema es la petición, no la revisión.
