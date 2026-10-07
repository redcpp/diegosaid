---
title: "xUSD por diseño: el litepaper de xBacked, comentado"
subtitle: Cómo una stablecoin sobrecolateralizada sostuvo su paridad en Algorand. Vaults, liquidación parcial, un piso de redención y los keepers que la operaban, con el razonamiento que el litepaper dejó implícito.
excerpt: El Litepaper v2.0 de xBacked describía xUSD con ejemplos. Este es el mismo diseño explicado mecanismo por mecanismo, incluida la fórmula de liquidación derivada desde first principles y la aritmética detrás de la banda de paridad.
date: 2026-09-07
origin: "El Litepaper v2.0 de xBacked se publicó en marzo de 2022. Comentado en 2026."
featured: true
readMinutes: 10
tags:
  - DeFi
  - Stablecoins
  - Diseño de protocolos
  - Algorand
---

xBacked emitía xUSD, una stablecoin sobrecolateralizada en Algorand. Cada xUSD en circulación estaba respaldado por colateral en una vault, una posición de deuda colateralizada en la tradición de MakerDAO. En marzo de 2022 el equipo publicó la versión 2.0 del litepaper, del que fui coautor. Describía el sistema casi por completo con ejemplos resueltos.

Este post es el mismo diseño explicado como un conjunto de mecanismos. Donde el litepaper daba un número, intento dar la razón del número.

## Un principio: la deuda está denominada en xUSD

El protocolo nunca piensa en dólares. La deuda de una vault es una cantidad de xUSD; las comisiones se acumulan en xUSD; el pago es en xUSD. Alicia deposita \$100 de ALGO, emite 50 xUSD y cierra su vault devolviendo 50 xUSD más la comisión de suministro que se haya acumulado. Si ya vendió los 50 xUSD, recompra 50 en el mercado abierto para cerrar.

Esto tiene una consecuencia que vale la pena decir. Hay una deuda del sistema, el suministro total de xUSD, y hay una deuda por vault. De nadie que emite xUSD se espera que le pague al protocolo. Lo único que se espera es que cada vault se cierre tarde o temprano, ya sea por pago, por liquidación o por redención. Los mecanismos de paridad de abajo son formas de lograr que ocurra una de esas tres cuando el precio dice que debe ocurrir.

## Las vaults y las dos razones

La razón de colateralización de una vault es el valor de su colateral entre su deuda. El contrato impone un número: por debajo de 110% una vault se puede liquidar. El frontend, que construí yo, imponía un segundo: una vault debe crearse en 120% o más, y no se puede retirar colateral si eso deja la razón por debajo de 120%.

La distancia entre los dos es el colchón del usuario. Alicia deposita \$100 de ALGO y emite 80 xUSD, con una razón de 125%. Si su ALGO cae a \$87.55, la razón es 109% y su vault se puede liquidar. La banda de 10 puntos entre el piso de retiro y la línea de liquidación es lo que le da tiempo de agregar colateral o pagar.

La división entre contrato y frontend fue deliberada. El invariante del contrato era el mínimo necesario para la solvencia. La regla más estricta era un valor por default que cualquier interfaz podía imponer, pero la cadena no, lo que mantenía simple el contrato y dejaba espacio para que otros frontends fijaran su propia política.

## Las comisiones, y a dónde van

| Comisión | Tasa | Se cobra sobre |
|---|---:|---|
| Liquidación | 1% | colateral liquidado |
| Redención | 2% | colateral redimido |
| Suministro | varía según el tipo de colateral | xUSD en circulación, se acumula de forma continua |

Las comisiones de suministro se reparten entre la tesorería de la DAO y quienes tienen en staking el token de gobernanza. Las de liquidación y redención se reparten entre la tesorería y el pool de staking de xUSD que fondea las liquidaciones. La tabla de comisiones del litepaper indica un reparto 50/50 y sus ejemplos resueltos mandan 60% a quienes hacen staking de xUSD; el reparto era un parámetro de gobernanza. El principio detrás del reparto es que cada comisión fondea una de dos cosas: a quienes mantienen el protocolo o a quienes lo mantienen solvente.

## Liquidación: parcial y dimensionada con una fórmula

Una vault por debajo de 110% no se cierra. Se liquida solo lo suficiente para regresarla a 120%. La liquidación parcial es más amable con el dueño de la vault, que conserva la mayor parte de su posición, y limita cuánto colateral sale al mercado en un solo choque.

Dos tipos de keeper pueden liquidar. Uno usa su propio xUSD para pagar la deuda de la vault y recibe el colateral liquidado con descuento. El otro usa un pool de xUSD que terceros pusieron en staking, no aporta capital y se queda con una pequeña parte, mientras el resto del colateral va a quienes hacen staking en el pool. El segundo diseño importa más de lo que parece: separa el capital que fondea las liquidaciones de los bots que las ejecutan, así que una liquidación nunca espera al saldo de un keeper.

El litepaper da la liquidación máxima como un bloque de JavaScript. Aquí está de dónde sale. Sea $V$ el valor del colateral de la vault, $D$ su deuda, $\rho$ la razón objetivo después de la liquidación y $d$ el inverso del descuento del liquidador, de modo que un pago de $\ell$ xUSD le da derecho al liquidador a $\ell/d$ de colateral. Después de pagar $\ell$, la vault debe quedar exactamente en el objetivo:

$$
\frac{V - \ell/d}{D - \ell} = \rho
\quad\Longrightarrow\quad
\ell = \frac{d\,V - \rho\, d\, D}{1 - \rho\, d}.
$$

Con los parámetros de lanzamiento $\rho = 1.20$ y $d = 1 - 0.035 = 0.965$, una vault con \$1,000 de ALGO contra una deuda de 910 xUSD, en 109.9% y por lo tanto liquidable, da

$$
\ell = \frac{965 - 1{,}053.78}{1 - 1.158} \approx 562 \text{ xUSD}.
$$

El keeper paga 562 xUSD y se lleva unos \$582 de colateral. El protocolo se queda con 1% de eso como comisión; el descuento era de 3.5%, así que el keeper gana 2.5% neto. La vault queda con unos \$418 de ALGO contra 348 xUSD, que es 120%. Cualquier pago mayor que $\ell$ rebasaría el objetivo y le quitaría al dueño más de lo que exige la solvencia.

Dos keepers también pueden liquidar la misma vault uno después del otro. El primero paga 100 xUSD y se lleva su colateral, y mueve la vault solo una parte del camino. El segundo recalcula $\ell$ con el nuevo estado y paga el resto. Como la fórmula solo depende de los $V$ y $D$ actuales, los keepers se combinan sin coordinarse.

## Redención: el piso debajo de la paridad

Un retiro es el dueño sacando colateral de su propia vault. Una redención es cualquier persona convirtiendo 1 xUSD en \$1 de colateral tomado de las vaults más riesgosas del sistema, menos una comisión de 2%. Esa garantía es lo que vuelve la paridad algo firme y no una aspiración.

La aritmética del piso es simple. Redimir 1 xUSD devuelve \$0.98 de colateral. Si xUSD cotiza en \$0.97, comprarlo y redimirlo deja un centavo por token, y esas compras empujan el precio de vuelta hacia arriba. Por debajo de \$0.98 el arbitraje está abierto; por encima, redimir pierde dinero y nadie lo hace. La redención está dormida en mercados tranquilos y se enciende justo cuando se necesita.

Como la redención empieza por las vaults más riesgosas, hace algo más: castiga la colateralización delgada. Una vault en 111% es la primera en perder colateral cuando alguien redime. Los dueños que quieren que los dejen en paz mantienen alta su razón. El contrato llevaba registro de las dos vaults más riesgosas, y un tipo de keeper ganaba una recompensa por proponer una vault más riesgosa que cualquiera de las dos.

¿Y si alguien intenta redimir más de lo que el sistema puede pagar? xUSD solo se puede emitir contra colateral de 110% o más, así que un millón de xUSD en circulación está respaldado por al menos \$1.1 millones. Para vaciar el sistema, alguien tendría que tener la mayoría de todo el xUSD, y comprar tanto movería el precio de vuelta hacia la par mucho antes de terminar. Un cártel de las vaults más grandes podría redimir, digamos, 750,000 xUSD a \$0.90 y ganar \$75,000, pero los 250,000 xUSD restantes seguirían respaldados por \$350,000 de colateral. La paridad sobrevive al ataque por construcción.

## La banda de paridad

Si juntas los mecanismos, xUSD tiene un piso y un techo suave.

**Por debajo de la par.** Dos fuerzas empujan hacia arriba. Los dueños de vaults pueden comprar xUSD barato y pagar deuda con descuento, lo que contrae el suministro. Por debajo de \$0.98, quienes redimen compran xUSD y lo convierten en colateral, lo que contrae el suministro más rápido.

**Por encima de la par.** Cualquiera puede abrir una vault, emitir xUSD a la par y venderlo por encima. El suministro se expande hasta que se cierra la prima. El litepaper también describe, en este régimen, la liquidación parcial de vaults riesgosas, que devuelve colateral al mercado y deja que se recupere la razón general del sistema.

Ninguno de los dos lados necesita un actor central. La banda va más o menos de \$0.98 a un poco más de \$1.00, y cada movimiento fuera de ella es una oportunidad de ganancia para alguien cuya ganancia restablece la banda.

## Mercados de riesgo aislados

Cada tipo de colateral vive en su propio contrato de vault. La vault de ALGO de un usuario y su vault en un activo más volátil son posiciones separadas: una se puede liquidar sin tocar la otra.

Para el protocolo, el aislamiento es una perilla de riesgo. Cada tipo de colateral tiene su propia razón mínima, su propia comisión de suministro y su propia capacidad de emisión. El colateral de primera línea recibe los mejores términos y el mayor margen. El colateral especulativo se puede admitir con una razón alta y un tope bajo, así que el experimento queda contenido si sale mal. También le permitió al equipo listar colateral nuevo rápido, porque listar era un cambio de parámetros en un contrato nuevo y no una modificación al contrato compartido.

## Los keepers como la fuerza de trabajo del protocolo

Cada acción de mantenimiento en xBacked era abierta a cualquiera y pagada.

- **Los liquidadores** pagan las vaults en mal estado, con su propio xUSD o con el pool en staking.
- **Quienes proponen vaults** mantienen al día el objetivo de redención proponiendo vaults más riesgosas, a cambio de una recompensa.
- **Quienes cobran comisiones** disparan el reparto de las comisiones acumuladas de un contrato de vault y se quedan con 0.5%.
- **Quienes liquidan las comisiones de suministro** reparten las comisiones de suministro acumuladas a la DAO y a quienes hacen staking de gobernanza. Esta no pagaba nada directamente, pero quien tenía tokens de gobernanza en staking tenía motivos para ejecutarla.

Cualquiera podía poner xUSD en staking en el pool de liquidación, tuviera o no una vault, y ganar una parte de las comisiones de liquidación y redención. Quienes hacían staking acumulaban puntos según el monto y el tiempo, y podían cambiarlos en cualquier momento por una parte proporcional de las comisiones del contrato. El pool hizo que las liquidaciones no dependieran del capital de un solo keeper, y el sistema de puntos volvió legible el rendimiento del pool.

El principio de diseño, que el litepaper nunca dice de forma explícita, es que un protocolo sin empleados necesita que cada trabajo del que depende sea un trabajo por el que alguien recibe un pago.

## Lo que escribiría distinto hoy

El litepaper era una descripción, no un argumento. No explicaba por qué las razones eran 110 y 120, ni qué le hace el mecanismo de redención a los incentivos de los dueños de vaults, ni qué pasa cuando los usuarios combinan xUSD con un mercado de préstamos. Los dos documentos de decisión de arquitectura de los que fui coautor, el [ADR-46 sobre el looping de vaults](/blog/adr46/) y el [ADR-47 sobre la emisión respaldada por LP](/blog/adr47/), fueron intentos de aportar el razonamiento que el documento de lanzamiento se saltó. El documento público de un protocolo debería traer sus propias demostraciones. Este confiaba en que sus lectores creyeran que alguien había pensado los números. Sí se habían pensado, pero el documento debió mostrarlo.
