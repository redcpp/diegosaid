---
title: "ADR-46: el looping de vaults en forma cerrada"
subtitle: Emitir de forma recursiva a través de un mercado de préstamos es una serie geométrica. La serie dice que la estrategia es un carry trade, no apalancamiento, y que su riesgo cae sobre alguien más.
excerpt: ¿Hasta dónde puede llevar un usuario su apalancamiento emitiendo xUSD, prestándolo, pidiendo colateral prestado y volviendo a emitir? Una serie geométrica da el límite, muestra que la exposición neta nunca cambia y ubica el riesgo de liquidación en los usuarios sin apalancamiento.
date: 2026-09-07
origin: "Originalmente, un documento de decisión de arquitectura de xBacked DAO, 2022. Comentado en 2026."
readMinutes: 13
featured: true
tags:
  - DeFi
  - Stablecoins
  - Apalancamiento
  - Algorand
---

En cuanto xUSD entró a Folks Finance, el principal mercado de préstamos de Algorand, quedó disponible una estrategia predecible: emitir xUSD contra colateral, prestar ese xUSD, pedir prestado más colateral contra él y volver a emitir. En otras cadenas los usuarios llevaban años haciéndolo con DAI y Aave. El ADR-46 hizo dos preguntas antes de que alguien en xBacked tuviera que contestarlas con prisa. ¿Cuánto apalancamiento produce de verdad el ciclo, y quién termina cargando el riesgo?

Las dos respuestas salieron de una página de álgebra. Este post es esa página, desarrollada.

## El ciclo

Fija dos parámetros: $\mathrm{cr} > 1$, la razón mínima de colateralización del emisor, y $0 < \mathrm{LTV} < 1$, el loan-to-value que el mercado externo permite contra xUSD. Empieza con un colateral $C_0$ en dólares. Una iteración son cuatro transacciones.

1. Emite $\mathrm{xUSD}_n = C_n / \mathrm{cr}$ contra el colateral que acabas de depositar.
2. Aporta ese xUSD al mercado de préstamos.
3. Pide prestado colateral por $\mathrm{LTV} \cdot \mathrm{xUSD}_n$ contra él.
4. Deposita de vuelta en la vault el colateral prestado. Ese depósito es $C_{n+1}$.

Con los parámetros que usaban xBacked y Folks en ese momento, $\mathrm{cr} = 1.20$ y $\mathrm{LTV} = 0.80$, un depósito de \$1,000 emite 833 xUSD, que sirven para pedir prestados 667 de colateral, que emiten 556 xUSD, y así sucesivamente.

## La recursión

Cada depósito es una fracción fija del anterior:

$$
C_{n} = \mathrm{LTV} \cdot \frac{C_{n-1}}{\mathrm{cr}} = \alpha\, C_{n-1}, \qquad \alpha = \frac{\mathrm{LTV}}{\mathrm{cr}}.
$$

Entonces $C_n = C_0\,\alpha^n$ y el colateral acumulado después de $n$ ciclos es una suma geométrica parcial:

$$
TC_n = \sum_{i=0}^{n} C_0\,\alpha^i = C_0 \cdot \frac{1 - \alpha^{n+1}}{1 - \alpha}.
$$

La deuda acumulada es $TC_n / \mathrm{cr}$ todo el tiempo, porque cada emisión se hizo exactamente a la razón mínima.

## El límite

La serie converge cuando $\alpha < 1$, es decir, siempre que $\mathrm{LTV} < \mathrm{cr}$. Eso se cumple en cualquier combinación sensata: el emisor exige más de un dólar de colateral por cada dólar de deuda, y el prestamista adelanta menos de un dólar por cada dólar de xUSD. En el límite,

$$
TC_\infty = \frac{C_0}{1-\alpha} = C_0 \cdot \frac{\mathrm{cr}}{\mathrm{cr} - \mathrm{LTV}}, \qquad L_\infty = \frac{\mathrm{cr}}{\mathrm{cr} - \mathrm{LTV}}.
$$

Con $(1.20, 0.80)$ el límite es $3\times$. Ningún comportamiento del usuario lo cambia. Los parámetros fijan el techo; hacer ciclos solo decide qué tan cerca llegas.

| $n$ | $C_n$ | $\mathrm{xUSD}_n$ | $TC_n$ | Apalancamiento $TC_n / C_0$ |
|---:|---:|---:|---:|---:|
| 0 | 1,000.00 | 833.33 | 1,000.00 | 1.00 |
| 1 | 666.67 | 555.56 | 1,666.67 | 1.67 |
| 2 | 444.44 | 370.37 | 2,111.11 | 2.11 |
| 3 | 296.30 | 246.91 | 2,407.41 | 2.41 |
| 4 | 197.53 | 164.61 | 2,604.94 | 2.60 |
| 5 | 131.69 | 109.74 | 2,736.63 | 2.74 |
| $\infty$ | 0 | 0 | 3,000.00 | 3.00 |

Cinco ciclos capturan el 91% del límite. Cada ciclo adicional suma dos tercios de lo que sumó el anterior, y en una cadena con comisiones por transacción llega un punto en el que la emisión marginal vale menos que las comisiones para ejecutarla.

El límite es más sensible al parámetro del prestamista que al del emisor. Con $(1.20, 0.80)$,

$$
\frac{\partial L_\infty}{\partial\,\mathrm{LTV}} = \frac{\mathrm{cr}}{(\mathrm{cr}-\mathrm{LTV})^2} = 7.5, \qquad \frac{\partial L_\infty}{\partial\,\mathrm{cr}} = -\frac{\mathrm{LTV}}{(\mathrm{cr}-\mathrm{LTV})^2} = -5.
$$

Relajar un punto el LTV en Folks subía el apalancamiento disponible más de lo que lo bajaba endurecer un punto la razón de colateral en xBacked. Parte de la exposición del emisor al looping estaba en un parámetro que no controlaba.

| $\mathrm{cr}$ | $\mathrm{LTV}$ | $\alpha$ | $L_\infty$ | Ciclos para llegar al 95% del límite |
|---:|---:|---:|---:|---:|
| 1.10 | 0.80 | 0.73 | 3.67 | 9 |
| 1.20 | 0.80 | 0.67 | 3.00 | 7 |
| 1.50 | 0.80 | 0.53 | 2.14 | 4 |
| 1.20 | 0.60 | 0.50 | 2.00 | 4 |

Los límites más altos convergen más lento. Los regímenes que ofrecen más apalancamiento son también los que necesitan más transacciones para alcanzarlo.

## Dos balances

Después de $n$ ciclos, el usuario tiene dos posiciones que se reflejan una a la otra.

**Pila A, la vault de xBacked.** Colateral $TC_n$, volátil, contra una deuda de $TC_n/\mathrm{cr}$ en xUSD, estable.

**Pila B, el mercado de préstamos.** xUSD aportado $S_n$, estable, contra colateral prestado $B_n$, volátil.

Bajo el supuesto de ciclo cerrado, en el que cada iteración se fondea por completo con la emisión anterior,

$$
S_n = TC_{n-1}/\mathrm{cr}, \qquad B_n = TC_n - C_0.
$$

Todo lo emitido, salvo la última ronda, se aportó al mercado; todo lo depositado, salvo la primera ronda, se pidió prestado.

## La exposición neta es $C_0$, para toda $n$

El apalancamiento de la vault, $L_\infty$, mide cuánto colateral controla el usuario dentro de la Pila A. No es la exposición del usuario al precio del colateral. Esa es

$$
TC_n - B_n = TC_n - (TC_n - C_0) = C_0.
$$

El usuario está largo en $TC_n$ de colateral en la vault y corto en $B_n$ con el prestamista, y la diferencia es el depósito original. El lado de xUSD se compensa en $-\mathrm{xUSD}_n$, que tiende a cero conforme crece $n$. En el límite, la posición tiene una delta en dólares de exactamente $C_0$ y ninguna delta en la stablecoin.

Así que el ciclo cerrado no es una posición larga apalancada. Es una estructura de carry: su rendimiento es el diferencial entre lo que gana el xUSD aportado en el mercado de préstamos y lo que cuesta ahí el colateral prestado, ajustado por la comisión de estabilidad del emisor y por cualquier rendimiento que genere el colateral de la vault. Un usuario que de verdad quiere exposición apalancada al colateral debería cambiar el xUSD emitido por colateral en un DEX y volver a depositarlo. Ese ciclo tiene $\alpha = 1/\mathrm{cr}$, un límite de $\mathrm{cr}/(\mathrm{cr}-1)$, que es $6\times$ con $\mathrm{cr} = 1.20$, y una delta neta larga de $C_0 L_\infty$. Misma palabra, otra operación.

## Liquidación en las dos direcciones

Una delta neta de cero no significa riesgo de liquidación cero. Cada pila tiene el activo volátil de un lado distinto, así que cada una tiene su propio disparador. Sea $p_t$ el precio del colateral relativo al de entrada.

La razón de la Pila A en el momento $t$ es $\mathrm{cr} \cdot p_t$. Se liquida cuando baja a la razón de liquidación $\mathrm{cr}_{\mathrm{liq}}$, es decir, con una caída de

$$
\delta^{\mathrm{down}} = 1 - \frac{\mathrm{cr}_{\mathrm{liq}}}{\mathrm{cr}}.
$$

El loan-to-value de la Pila B en el momento $t$ es $\mathrm{LTV} \cdot p_t$, porque $B_n/S_n = \mathrm{cr}\cdot\alpha = \mathrm{LTV}$ para toda $n$. Se liquida cuando llega al máximo del prestamista, es decir, con una subida de

$$
\delta^{\mathrm{up}} = \frac{\mathrm{LTV}_{\max}}{\mathrm{LTV}} - 1.
$$

Con $\mathrm{cr}_{\mathrm{liq}} = 1.10$ y $\mathrm{LTV}_{\max} = 0.85$, eso es una caída de 8.3% y una subida de 6.25%. Una posición sin exposición direccional se liquida con un movimiento de unos cuantos puntos porcentuales en cualquier dirección, y cada liquidación cobra una penalización que sale de $C_0$.

Las dos patas no pueden arrastrarse en cascada entre sí. Cualquier movimiento que pone en peligro a la Pila A alivia a la Pila B, y al revés. El ciclo está cubierto por dentro.

## A dónde va el riesgo

La cascada es externa. Supón que un choque a la baja liquida un grupo de vaults en ciclo. El motor de liquidaciones vende el colateral embargado y empuja el precio todavía más abajo. Eso no les afecta a los usuarios en ciclo que sobreviven, cuyas Pilas B se vuelven más seguras mientras cae el precio. Sí les afecta a todos los usuarios normales de una sola vault, cuyo margen ya se había comprimido con el mismo movimiento.

Los usuarios en ciclo están neutrales en dólares. Los usuarios sin apalancamiento están largos. La estrategia exporta su presión de liquidación a la baja del primer grupo al segundo. El margen $\delta^{\mathrm{down}}$ de una vault es el mismo sea o no parte de un ciclo, pero conforme sube la parte del protocolo que está en ciclo, el colateral agregado se concentra justo por encima de $\mathrm{cr}_{\mathrm{liq}}$ y todo el sistema se vuelve frágil ante choques pequeños. Ese fue el hallazgo que importó para el diseño del protocolo.

## Cuándo el carry es positivo

Sea $r_{\mathrm{stab}}$ la comisión de estabilidad, $r_{\mathrm{sup}}$ la tasa que paga el mercado por aportar xUSD, $r_{\mathrm{bor}}$ la tasa por pedir prestado el colateral y $r_{\mathrm{stk}}$ cualquier rendimiento que genere el colateral de la vault. Por cada dólar de capital propio, la posición límite rinde

$$
\frac{R_\infty}{C_0} = \frac{\mathrm{cr}\, r_{\mathrm{stk}} - r_{\mathrm{stab}} + r_{\mathrm{sup}} - \mathrm{LTV}\, r_{\mathrm{bor}}}{\mathrm{cr} - \mathrm{LTV}}.
$$

Tener el colateral sin apalancamiento rinde $r_{\mathrm{stk}}$. El ciclo le gana a solo mantenerlo si y solo si

$$
r_{\mathrm{sup}} - r_{\mathrm{stab}} > \mathrm{LTV}\,(r_{\mathrm{bor}} - r_{\mathrm{stk}}).
$$

Lado izquierdo: lo que ganas emitiendo xUSD y prestándolo. Lado derecho: lo que pagas por pedir prestado el colateral, ponderado por cuánto pides, menos lo que rinde ese colateral. Es una operación de tasas relativas entre dos mercados. El signo puede voltearse cada vez que cualquiera de los dos cambia sus tasas, así que la posición necesita monitoreo, no solo configurarse.

## Notas de implementación

En Algorand, los cuatro pasos de un ciclo se pueden enviar como un solo grupo atómico de transacciones, así que un ciclo se completa o no ocurre. El ciclo se acota con un número de iteraciones o con un tamaño económico mínimo: con un costo fijo por ciclo $\phi$ y un diferencial capturado $\eta$ por unidad de xUSD, detente en la primera $n$ en la que $C_0\,\alpha^{n}/\mathrm{cr}$ quede por debajo de $\phi/\eta$. Deshacer la posición es la secuencia inversa: retirar colateral, pagar el préstamo externo, retirar el xUSD aportado, pagar la deuda de la vault y repetir.

## Por qué valió la pena escribir una página de álgebra

Nada de esto necesitó simulación. Dos parámetros dan el límite, una resta da la exposición neta, dos razones dan las bandas de liquidación y una desigualdad da la condición de rentabilidad. Quienes diseñan el protocolo pueden dimensionar la fragilidad que introduce el looping y los usuarios pueden dimensionar sus posiciones, ambos sin iterar.

El resultado que pondría en una diapositiva es la resta. El apalancamiento de la vault y el apalancamiento neto son cantidades distintas, y esa diferencia es toda la historia de quién carga el riesgo.
