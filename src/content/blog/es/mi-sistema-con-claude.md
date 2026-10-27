---
title: "Ciento setenta y siete recordatorios"
subtitle: "Notas sobre el sistema que armé con Claude para organizar el entrenamiento, el trabajo y la maestría, y sobre lo que tuve que borrar en el camino."
excerpt: "Tenía 177 recordatorios para estudiar programación competitiva y los borré. Cómo armé por capas un sistema con Claude, por qué dejé de pedirle que escribiera solo y qué parte de todo esto se puede copiar."
date: 2026-11-01
readMinutes: 7
tags:
  - Inteligencia artificial
  - Hábitos
  - Escritura
---

## Los recordatorios

Tenía 177 recordatorios para estudiar programación competitiva, y me iba muy bien con ellos. Las notificaciones estaban ahí todo el tiempo, le daba seguimiento a cada tema y no fallaba. El problema era que cada recordatorio esperaba que yo hiciera algo en una fecha exacta, y la vida no siempre respeta las fechas: un día se carga el trabajo, otro crecen las responsabilidades, otro hay que salir de viaje. Entonces había que recorrer todas las fechas, sincronizarlas y ponerme al día, mientras la lista de pendientes en pausa crecía hasta volverse abrumadora.

Los borré y le pasé el seguimiento a Claude, que me deja retomar cuando hace falta. Estas semanas, por ejemplo, el trabajo me ha pedido más y la programación competitiva quedó en pausa. El proyecto sigue a la vista y no lo pierdo, pero sé que ahorita hay cosas más importantes. Naval Ravikant compara a quienes trabajamos con la cabeza con los atletas, que entrenan, aceleran a fondo, descansan y vuelven a evaluar (Jorgenson, 2020). Yo lo pienso como los leones, que descansan y, cuando toca trabajar, van a toda marcha. Siempre voy a toda marcha, pero enfoco esa marcha en distintos objetivos según lo que va pidiendo la vida.

## Chats sueltos

Ese sistema empezó, como casi todo lo que uno hace con estas herramientas, con chats sueltos. Cuando usaba poco Claude, abría una conversación, platicaba, y después de un rato se volvía repetitiva o lo más viejo empezaba a quedar ignorado. Tenía que resumir, abrir otro chat o guardar archivos para no perder el hilo. En 2023, un equipo encabezado por investigadores de Stanford midió algo parecido: los modelos de lenguaje aprovechan bien lo que está al principio y al final de un texto largo, y bastante peor lo que queda en medio (Liu et al., 2023). En una conversación larga, casi todo termina en medio.

De ahí salió la primera capa. Claude permite guardar *skills*, que en español serían habilidades: instrucciones sobre un área que consulta cada vez que hace falta. Hice una para el deporte, otra para el trabajo y otra para los estudios de programación de la maestría. Después descubrí por mi cuenta que una habilidad puede llamar a otras, y armé una para mi plan semanal: le pido la semana y ella se pone de acuerdo con las demás. Le digo *proxy*, porque habla con las otras en mi nombre. La tercera capa fueron los proyectos, donde vive el trabajo largo con sus archivos y su historia. Con eso empecé a estudiar Claude más a fondo, a buscar las buenas prácticas y a sacarle provecho a las herramientas que tiene.

A mi familia, que sí lee este blog, no le cuesta entenderlo. Habilidades, proyectos y documentos son palabras de todos los días, con las que también nos describimos como personas; ahora una herramienta las tiene a nuestra disposición.

No sé si mis resultados son mejores que antes. Con pura disciplina ya me iba bien, y Claude es lo bastante inteligente para dar buenas respuestas sin que uno itere mucho. Lo que sí noté es que el resultado se parece más a lo que quiero: me explico y me organizo mejor, y puedo llevar varias cosas en paralelo.

## El memo

Antes de todo esto tenía una habilidad de memo. Imprimía la conversación en un PDF y se la pasaba al chat siguiente, y así sucesivamente. Los memos se veían muy bien, pero eran de seis a diez páginas que yo no leía, llenas de información innecesaria y contexto de más. Si quería sacar una nota, tenía que leerlas completas para encontrar una línea que valiera la pena; una lista hecha a mano me hubiera tomado menos tiempo y la habría entendido mejor. Terminé llamándolo *AI slop*, como se le dice en inglés al relleno que produce la inteligencia artificial, y lo borré. Es fácil caer en la tentación de guardarlo todo, y a veces el exceso de información borra la señal porque la contamina con ruido.

## Dictar

Mi primera idea para este blog era que Claude escribiera solo, de noche, con la capacidad que nadie estaba usando a esas horas. La descarté porque la inteligencia artificial, por defecto, da respuestas promedio. Si a una persona se le pide un número al azar del 0 al 9, lo más común es que diga 7. En un estudio de 1976 lo eligieron 28% de 558 personas, casi el triple de lo que daría el azar (Kubovy y Psotka, 1976). Los modelos aprendieron de lo que escribimos y heredaron ese sesgo, amplificado (Coronado-Blázquez, 2025). En una prueba de la consultora Springboards, citada por el escritor Ian Leslie, GPT, Claude y Gemini respondieron 7 en al menos 90 de cada 100 intentos cuando se les pidió un número del 1 al 10 (Leslie, 2025). Un generador de números aleatorios repartiría las respuestas por igual. Un texto escrito de noche, sin nadie que le dé material original, sale igual de predecible: normal, genérico y, para lo que quiero hacer, mediocre.

Por eso dicto. Las ideas, los casos concretos y la forma de pensar son míos; Claude pasa a texto lo que digo y me ayuda con la edición, como lo haría un editor. Algo de dirección sí pone, porque al inicio de cada pieza me hace preguntas como un entrevistador. Lo que me da, sobre todo, es orden. Cuando hablo de un tema brinco de un lado a otro, y las ideas llegan sueltas, apenas relacionadas; Claude las agrupa según hagan sentido. Darles inicio, desarrollo y final me toca a mí. Kurt Vonnegut decía que las historias tienen formas que se pueden dibujar, como la de alguien que cae en un hoyo y sale mejor de lo que entró (Vonnegut, 2005); Claude ordena las piezas, pero esa forma la sigo conectando yo.

Nunca delego los ejemplos ni la forma de pensar, y por eso creo que ninguna inteligencia artificial podría reproducir estas piezas: lo que cuentan me pasó a mí, en mi situación particular. Si le pido a Claude un reporte sobre cualquier tema, puede salir genérico, o genérico dentro de un nicho. Las personas somos una serie de paradojas, de agrupaciones extrañas que nos hacen únicos, y eso no aparece en un reporte.

## El método

Si alguien me preguntara cómo copiar mi sistema, le diría que copie el metasistema, la manera de llegar a él. El mío está optimizado para mí después de meses de ajustes y no necesariamente es el mejor para nadie más. Lo que sí se puede copiar es el camino: estudiar, tener curiosidad, intentar cosas y fallar, poner mucha atención, correr varias pruebas en paralelo para ver cuál sale mejor. Es el método científico de toda la vida: cambiar una variable, dejar las demás quietas y ver qué pasa.

Con LinkedIn hice algo parecido. La manera en que se escribe ahí me da *cringe*; se siente artificial, sintética y a veces falsa. Yo no leo los posts largos, que rara vez tienen sustancia y cabrían en una imagen, así que decidí publicar justo eso: un carrusel con datos y un comentario breve. Quería algo que se sintiera mío, y hasta ahora estoy a gusto con la decisión.

No hay una forma correcta o incorrecta de usar estas herramientas, solo recomendaciones. La disciplina fue la base sobre la que armé todo esto, y el estudio me trae perspectivas y recursos que por mi cuenta no hubiera encontrado. Lo demás es intuición, gusto y el acomodo que cada quien le encuentra a sus herramientas, porque al final cada uno decide dónde está y a dónde quiere llegar.

Entonces, lo que hago es eso: ser curioso, poner atención e intentar mejorar un poco cada vez.

## Fuentes

Consultadas el 26 y 27 de octubre de 2026.

- Eric Jorgenson, [*The Almanack of Naval Ravikant*](https://www.navalmanack.com/), 2020.
- Nelson F. Liu y otros, [Lost in the Middle: How Language Models Use Long Contexts](https://arxiv.org/abs/2307.03172), arXiv, 2023; publicado en *Transactions of the ACL*, 2024.
- Michael Kubovy y Joseph Psotka, [The predominance of seven and the apparent spontaneity of numerical choices](https://doi.org/10.1037/0096-1523.2.2.291), *Journal of Experimental Psychology: Human Perception and Performance*, 1976.
- Javier Coronado-Blázquez, [Deterministic or probabilistic? The psychology of LLMs as random number generators](https://arxiv.org/abs/2502.19965), arXiv, feb 2025.
- Ian Leslie, [Why Are LLMs Fixated On the Number 7?](https://www.ian-leslie.com/p/why-are-llms-fixated-on-the-number), 21 oct 2025; cita la prueba de Springboards.
- Kurt Vonnegut, *A Man Without a Country*, 2005, [vía The Marginalian](https://www.themarginalian.org/2012/11/26/kurt-vonnegut-on-the-shapes-of-stories/).
