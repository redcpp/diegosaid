---
title: "ADR-47: el caso contra el lanzamiento de Pact con xUSD"
subtitle: Los tokens LP no pueden respaldar la stablecoin que se emitió para crearlos. Tres demostraciones cortas y el lanzamiento que no ocurrió.
excerpt: A principios de 2022 un socio propuso emitir xUSD sin colateral y declarar como respaldo los tokens LP resultantes. Tres demostraciones cortas mostraron que el respaldo era circular, que las pérdidas eran de otros y que una caída de 75% dejaba insolvente al emisor.
date: 2026-09-07
readMinutes: 12
featured: true
tags:
  - DeFi
  - Stablecoins
  - AMM
  - Algorand
---

En febrero de 2022 era desarrollador core en xBacked DAO, el emisor de xUSD, una stablecoin sobrecolateralizada en Algorand. Pact, un DEX (exchange descentralizado) en la misma cadena, preparaba el lanzamiento de su token y propuso una forma de fondear un pool PACT/xUSD con ayuda del protocolo. El atractivo era obvio: liquidez profunda para un socio desde el primer día, sin costo visible.

El ADR-47 fue el documento de decisión de arquitectura que argumentó en contra. El argumento cabe en unas cuantas páginas y no necesita más que álgebra. El lanzamiento no siguió adelante en la forma propuesta. Este post reconstruye el argumento como lo escribiría hoy. Si prefieres leerlo como código y no como demostraciones, hay una [versión para ingenieros de software](/es/blog/adr47-for-engineers/).

## La propuesta

Sea $X$ el token del socio y $Y$ la stablecoin. El mecanismo tenía cuatro pasos.

1. El socio transfiere $x$ unidades de $X$ al emisor.
2. El emisor emite $y$ unidades de $Y$ **sin depositar colateral en ninguna vault**.
3. El emisor aporta $(x, y)$ a un AMM de producto constante y recibe tokens LP.
4. Los tokens LP del paso 3 se declaran el respaldo en cadena de los $y$ emitidos en el paso 2.

Se suponía que cada xUSD en circulación estaba respaldado por colateral en una vault con una razón de colateralización pública. El paso 2 rompe esa regla y el paso 4 es la justificación: la emisión no está sin respaldo, está respaldada por la posición LP. La pregunta es si esa frase significa algo.

## Lo que tiene que significar "respaldado"

Sea $p$ el precio de lanzamiento de $X$ en dólares y tomemos $Y$ a la par. Sea $V_0 \ge 0$ el valor en dólares que ya había en el pool, aportado por otros proveedores de liquidez, antes de que entre el emisor. Después de la aportación del emisor, el pool contiene

$$
V = V_0 + px + y,
$$

y la participación del emisor es $\beta = (px + y)/V$. Los tokens LP que recibe el emisor tienen un valor nominal de $\beta V$.

El problema es que $V$ cuenta los $y$ que los tokens LP deberían respaldar. El valor que de verdad se puede redimir por algo externo al mecanismo es

$$
V^{\mathrm{real}} = V_0 + px,
$$

que excluye la emisión sin respaldo. Así que hay dos versiones de la afirmación de respaldo:

$$
\text{nominal:}\quad y \le \beta V, \qquad\qquad \text{real:}\quad y \le \beta V^{\mathrm{real}}.
$$

Todo el análisis es la distancia entre estas dos desigualdades.

## Resultado 1. Único LP: la afirmación es vacía

Supón que el emisor crea el pool, así que $V_0 = 0$ y $\beta = 1$. La afirmación nominal se vuelve

$$
y \le px + y,
$$

que es cierta para cualquier $y$. No acota nada. Con esa lectura, el emisor podría emitir cualquier cantidad de $Y$ y decir que está respaldada.

La afirmación real se vuelve $y \le px$. Para que el pool abra al precio externo, los dos lados tienen que equilibrarse, así que $y = px$ exactamente. En ese punto, redimir los tokens LP devuelve $x$ unidades de $X$ que valen $px$, más $y$ unidades de $Y$ que el emisor puede quemar contra su propia emisión. El valor externo neto que se recupera es $px$: justo lo que depositó el socio, y nada más. La emisión está "colateralizada" solo en el sentido de que el $Y$ recién creado por el emisor cancela la deuda del propio emisor.

Si le quitas el envoltorio de LP, esto es el emisor aceptando $X$ como colateral con 100% de loan-to-value y cero margen de liquidación. Cualquier caída en $p$ produce un faltante del mismo tamaño.

## Resultado 2. Pool compartido: el respaldo es dinero de otros

Ahora sea $V_0 > 0$, así que $0 < \beta < 1$. Cada token LP reclama nominalmente una parte de $V$, pero solo $V^{\mathrm{real}}/V$ de cada reclamo es real. El valor LP real del emisor es

$$
\beta V^{\mathrm{real}} = \frac{px + y}{V}\,(V - y) = px + y - \frac{(px+y)\,y}{V} = px + (1-\beta)\,y.
$$

La condición de respaldo real $y \le px + (1-\beta)y$ se simplifica a

$$
y \le \frac{px}{\beta}.
$$

Parece una mejora sobre el Resultado 1: con una participación menor, el emisor puede emitir más. Mira de dónde sale el respaldo extra. Los LPs externos tienen el $1 - \beta = V_0/V$ restante del pool, y su valor real es

$$
(1-\beta)\,V^{\mathrm{real}} = \frac{V_0}{V}(V - y) = V_0 - (1-\beta)\,y.
$$

Aportaron $V_0$ y ahora tienen $V_0 - (1-\beta)y$. El respaldo del emisor por encima de $px$ es exactamente lo que sale de la posición de los LPs externos. Cuando $\beta \to 0$, el emisor puede emitir sin límite y la transferencia se acerca a la emisión completa.

La transferencia es silenciosa. Nada en la cadena distingue los $y$ sin respaldo del emisor de los $y$ de cualquier otro LP. Los proveedores externos entraron a un pool público suponiendo que cada reserva era valor aportado, y su dilución se acumula sola como función de los saldos del pool.

## Resultado 3. Las asignaciones grandes diluyen a los dueños de vaults

Si ni la posición LP ni los LPs externos alcanzan a cubrir la emisión, la última fuente en el balance del emisor es su free float: el margen de colateral por encima de la razón mínima del sistema,

$$
\mathrm{FF} = \frac{\mathrm{TVL}}{\mathrm{cr}} - \sum Y + \text{comisiones acumuladas}.
$$

Este es el colchón que absorbe los choques sin disparar liquidaciones. Para cualquier $\mathrm{FF}$ y precio $p$ fijos, una asignación de $x^* = \mathrm{FF}/p$ tokens es el umbral a partir del cual $y = px > \mathrm{FF}$. Escrita como una fracción $\lambda$ del suministro máximo del socio, con capitalización de mercado totalmente diluida $M_X$, la emisión rebasa el free float siempre que $\lambda > \mathrm{FF}/M_X$. Para cualquier socio cuya capitalización supere el free float del emisor, ese umbral es alcanzable.

Más allá de ese punto, el mecanismo crea oferta sin colateral que todos los dueños de vaults existentes subsidian con una razón de colateralización global más baja, sin que ninguno haya aceptado nada.

## Después del lanzamiento: la curva $2\sqrt{r}$

Los tres resultados anteriores suponen que $X$ tiene un precio justo en el lanzamiento. Ahora dejemos que el precio se mueva. En un pool de producto constante con reservas $(R_X, R_Y)$ e invariante $R_X R_Y = K$, el arbitraje mantiene el precio del pool igual al precio externo. En el caso de un único LP, $K = x_0 y_0$ y $y_0 = p x_0$. Si el precio externo se vuelve $p r$ para alguna razón $r$, las reservas quedan en

$$
R_X = \frac{x_0}{\sqrt{r}}, \qquad R_Y = y_0 \sqrt{r}.
$$

Redimir los tokens LP le da al emisor $y_0\sqrt{r}$ de $Y$ para quemar directo, más $x_0/\sqrt{r}$ de $X$ que se vende en $p r \cdot x_0/\sqrt{r} = y_0 \sqrt{r}$ dólares, suficiente para recomprar y quemar otros $y_0\sqrt{r}$. La oferta total que puede retirar es $2\sqrt{r}\,y_0$. El emisor puede retirar toda la emisión solo cuando

$$
2\sqrt{r} \ge 1 \quad\Longleftrightarrow\quad r \ge \tfrac{1}{4}.
$$

| Razón de precio $r$ | $Y$ retirable (en unidades de $y_0$) | Oferta residual sin respaldo |
|---:|---:|---:|
| 1.00 | 2.00 | ninguna, y $y_0$ de excedente |
| 0.50 | 1.41 | ninguna |
| 0.25 | 1.00 | ninguna, con margen cero |
| 0.10 | 0.63 | 37% de la emisión |
| 0.01 | 0.20 | 80% de la emisión |

Una caída de 75% en un token recién lanzado no es un evento de cola. Por debajo de ese punto, una fracción $1 - 2\sqrt{r}$ de la emisión original circula sin nada detrás. La curva es cóncava, así que la cobertura se degrada más rápido entre más cae el precio.

Compáralo con una vault normal que acepta $X$ como colateral a una razón mínima $\mathrm{cr}$. Emite $px/\mathrm{cr}$ y se liquida en $r = 1/\mathrm{cr}$. Una vault con $\mathrm{cr} = 4$ aguanta la misma caída de 75% que el mecanismo LP, pero emite la cuarta parte. La aparente ventaja del mecanismo LP, emitir más con la misma tolerancia, se paga con los Resultados 2 y 3: el faltante cae sobre los LPs externos o sobre dueños de vaults que no tienen nada que ver.

## La alternativa

El contenido económico de la alianza era legítimo: extender el balance del emisor para apoyar la liquidez de $X$ y la formación de su precio. Una vault que acepte $X$ como colateral estándar logra eso sin la circularidad.

- El colateral y la deuda quedan en el balance del emisor, con una razón pública por vault.
- El motor de liquidaciones que ya existe se encarga. Sin código para casos especiales.
- Ningún LP externo ni dueño de vault ajeno queda reclutado como respaldo.
- El riesgo de precio de $X$ lo carga el dueño de la vault, que en este caso es el socio.

Vale la pena abrir la vault solo si se cumplen tres condiciones. El precio de $X$ se puede obtener con un oráculo confiable. Su razón de colateralización supera $1/r_{\mathrm{worst}}$ para una cota conservadora de las caídas durante la ventana de liquidación. Y los ingresos esperados por comisiones cubren la deuda incobrable esperada con colas pesadas. El ADR-47 se detuvo ahí. Dimensionar esos parámetros fue otro documento.

## Lo que me llevé

**Escribe el balance antes que el mecanismo.** Cada paso de la propuesta era razonable por separado. La circularidad solo aparece cuando escribes qué es real y qué es nominal en los dos lados del libro contable.

**"Respaldado por" es una afirmación sobre la redención, no sobre la custodia.** Tener un activo que hace referencia a tu propio pasivo no es respaldo. Tres meses después del ADR-47, UST de Terra, cuyo activo de respaldo sacaba su valor de la demanda del propio UST, perdió su paridad. Los mecanismos son distintos, pero la falla estructural es la misma: un ciclo de referencias donde debería haber un activo externo.

**Una demostración resuelve lo que una junta no puede.** Escribir las desigualdades nominal y real lado a lado mueve la discusión de la opinión a la aritmética, y la aritmética no tiene otra versión.
