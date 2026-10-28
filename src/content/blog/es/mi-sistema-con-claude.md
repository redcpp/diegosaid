---
title: "Arma tu propio sistema de trabajo con IA"
subtitle: "No hay una forma correcta de usar la inteligencia artificial: cada quien la usa desde su visión del mundo. Estos son los datos que me ayudaron a armar mi sistema con Claude y lo que hago con cada uno, para que armes el tuyo."
excerpt: "Si le pides a una IA un número al azar, casi siempre dice 7. Por qué conviene usar estas herramientas desde quien uno es, y cuatro datos sobre textos largos, relleno y hábitos para armar un sistema propio, con los ejemplos del mío."
date: 2026-11-01
readMinutes: 9
tags:
  - Inteligencia artificial
  - Hábitos
  - Escritura
---

## El 7

Si a ChatGPT, a Claude o a Gemini se les pide un número al azar del 1 al 10, responden 7 en al menos 90 de cada 100 intentos. Lo midió la consultora Springboards y lo contó el escritor Ian Leslie (Leslie, 2025). Un generador de números aleatorios repartiría las respuestas por igual. Las personas también tenemos ese sesgo, aunque mucho menos: en un estudio de 1976, 28% de 558 personas eligió el 7 entre el 0 y el 9, casi el triple de lo que daría el azar (Kubovy y Psotka, 1976). Los modelos aprendieron de lo que escribimos y heredaron el sesgo, amplificado (Coronado-Blázquez, 2025).

Por defecto, la inteligencia artificial da la respuesta promedio. Lo que la saca de ahí es quien la usa: su visión del mundo, su contexto, de dónde viene y a dónde quiere llegar. No hay una forma correcta de usar estas herramientas; hay recomendaciones, y al final del día cada quien decide dónde está y hacia dónde va. Por eso creo que lo primero es ser uno mismo, y desde ahí pensar en las herramientas.

## Dictar

Mi primera idea para este blog era que Claude escribiera solo, de noche, con la capacidad que nadie estaba usando a esas horas. La descarté por lo mismo que pasa con el 7: sin nadie que le dé material original, un texto sale normal, genérico y, para lo que quiero hacer, mediocre.

Por eso dicto. Las ideas, los casos concretos y la forma de pensar son míos; Claude pasa a texto lo que digo y me ayuda con la edición, como lo haría un editor. Algo de dirección sí pone, porque al inicio de cada pieza me hace preguntas como un entrevistador. Lo que me da, sobre todo, es orden: cuando hablo de un tema brinco de un lado a otro, y las ideas llegan sueltas, apenas relacionadas; Claude las agrupa según hagan sentido. Darles inicio, desarrollo y final me toca a mí. Kurt Vonnegut decía que las historias tienen formas que se pueden dibujar, como la de alguien que cae en un hoyo y sale mejor de lo que entró (Vonnegut, 2005); Claude ordena las piezas, pero esa forma la sigo conectando yo.

Delegar las ideas también tiene un costo que ya se midió. En 2024, Anil Doshi y Oliver Hauser pidieron a 293 personas escribir un cuento corto y a algunas les dieron ideas generadas por inteligencia artificial. Los cuentos con ayuda se calificaron más creativos y mejor escritos, sobre todo los de quienes eran menos creativos, y al mismo tiempo se parecieron más entre sí (Doshi y Hauser, 2024). Si le pido a Claude un reporte sobre cualquier tema, puede salir genérico, o genérico dentro de un nicho. Lo que cuento aquí me pasó a mí, en mi situación particular, y eso no sale en un reporte.

Con LinkedIn me pasó algo parecido. La manera en que se escribe ahí me da *cringe*; se siente artificial, sintética y a veces falsa. Yo no leo los posts largos, que rara vez tienen sustancia y que en realidad cabrían en una imagen, así que decidí publicar justo eso: un carrusel con datos y un comentario breve. Quise hacer algo que se sintiera muy mío, y hasta ahora estoy contento con la decisión.

Dicho así, ser uno mismo puede sonar a que no estoy diciendo nada concreto. Lo concreto es que cada quien arme su propio sistema con estas herramientas. Si alguien me preguntara cómo copiar el mío, le diría que copie el metasistema, la manera de llegar a él, porque el mío está optimizado para mí después de meses de ajustes y no necesariamente es el mejor para nadie más. Lo que sigue son cuatro datos que me ayudaron a armarlo, cada uno con lo que hago yo y lo que tú podrías probar desde tu contexto.

## 1. Instrucciones cortas por área

Mi sistema empezó, como casi todo lo que uno hace con estas herramientas, con chats sueltos. Abría una conversación, platicaba, y después de un rato se volvía repetitiva o lo más viejo empezaba a quedar ignorado. Tenía que resumir, abrir otro chat o guardar archivos para no perder el hilo.

En 2023, un equipo encabezado por investigadores de Stanford midió algo parecido. Le dio a GPT-3.5, el modelo detrás del ChatGPT de entonces, veinte documentos para responder cada pregunta. Acertaba 76 de cada 100 veces cuando la respuesta estaba en el primero y 54 cuando estaba en el décimo, menos que las 56 que acertaba sin ningún documento (Liu et al., 2023). Los modelos aprovechan bien el principio y el final de un texto largo y bastante peor lo que queda en medio, que en una conversación larga es casi todo. Dos años después, Chroma, una empresa que hace bases de datos para aplicaciones de inteligencia artificial, probó 18 modelos más recientes, entre ellos Claude Opus 4, y encontró que su desempeño se vuelve menos confiable conforme crece el texto (Hong et al., 2025).

Lo que hice fue guardar instrucciones cortas por área. Claude permite guardar *skills*, que en español serían habilidades: instrucciones sobre un área que consulta cada vez que hace falta. Hice una para el deporte, otra para el trabajo y otra para los estudios de programación de la maestría. Después descubrí por mi cuenta que una habilidad puede llamar a otras, y armé una para mi plan semanal: le pido la semana y ella se pone de acuerdo con las demás. Le digo *proxy*, porque habla con las otras en mi nombre. La tercera capa fueron los proyectos, donde vive el trabajo largo con sus archivos y su historia. Habilidades, proyectos y documentos son palabras de todos los días, con las que también nos describimos como personas; ahora una herramienta las tiene a nuestra disposición.

Tus áreas van a ser otras. Lo que sí te puede servir es dejar de cargar todo en una conversación que crece sin fin y guardar, para cada área, unas cuantas instrucciones cortas que el modelo lea desde el principio.

## 2. Menos texto

Antes de todo esto tenía una habilidad de memo. Imprimía la conversación en un PDF y se la pasaba al chat siguiente, y así sucesivamente. Los memos se veían muy bien, pero eran de seis a diez páginas que yo no leía, llenas de información innecesaria y contexto de más. Si quería sacar una nota, tenía que leerlas completas para encontrar una línea que valiera la pena; una lista hecha a mano me hubiera tomado menos tiempo y la habría entendido mejor. Terminé llamándolo *AI slop*, como se le dice en inglés al relleno que produce la inteligencia artificial, y lo borré.

El relleno tampoco le sirve al modelo. En 2024, tres investigadores le pusieron a cinco modelos, entre ellos GPT-4 y Gemini Pro, la misma tarea de razonamiento y le fueron agregando texto irrelevante alrededor. Cuando el total llegó a unas 2,250 palabras, el promedio de aciertos bajó de 92% a 68% (Levy et al., 2024). Mis memos eran más largos que eso. Es fácil caer en la tentación de guardarlo todo, y a veces el exceso de información borra la señal porque la contamina con ruido.

Si hay algo que le pasas al modelo y que tú no leerías completo, vale la pena probar con una lista corta de lo importante y comparar las respuestas.

## 3. Un sistema que se pueda pausar

Tenía 177 recordatorios para estudiar programación competitiva, y me iba muy bien con ellos. Las notificaciones estaban ahí todo el tiempo, le daba seguimiento a cada tema y no fallaba. El problema era que cada recordatorio esperaba que yo hiciera algo en una fecha exacta, y la vida no siempre respeta las fechas: un día se carga el trabajo, otro crecen las responsabilidades, otro hay que salir de viaje. Entonces había que recorrer todas las fechas, sincronizarlas y ponerme al día, mientras la lista de pendientes en pausa crecía hasta volverse abrumadora.

Cada fecha que se pasaba se volvía un pendiente más, aunque un día fallado pesa menos de lo que parece. En el University College de Londres siguieron a 96 voluntarios mientras formaban un hábito diario nuevo. A la mitad de quienes tuvieron datos suficientes les tomó más de 66 días volverlo automático, y saltarse un día no cambió de forma importante su avance (Lally et al., 2010).

Borré los recordatorios y le pasé el seguimiento a Claude, que me deja retomar cuando hace falta. Estas semanas, por ejemplo, el trabajo me ha pedido más y la programación competitiva quedó en pausa. El proyecto sigue a la vista y no lo pierdo, pero sé que ahorita hay cosas más importantes. Naval Ravikant compara a quienes trabajamos con la cabeza con los atletas, que entrenan, aceleran a fondo, descansan y vuelven a evaluar (Jorgenson, 2020). Yo lo pienso como los leones, que descansan y, cuando toca trabajar, van a toda marcha. Usualmente voy a toda marcha, pero enfoco esa marcha en distintos objetivos según lo que va pidiendo la vida.

Tu sistema también va a tener semanas así, y conviene que te deje pausar un frente y retomarlo sin que cada día perdido se vuelva un pendiente más.

## 4. Una variable a la vez

Todo lo anterior salió de estudiar cómo funciona la herramienta, intentar cosas aunque fallen y poner mucha atención a lo que pasa; a veces corro varias pruebas en paralelo para ver cuál sale mejor. Es el método científico de toda la vida: cambiar una variable, dejar las demás quietas y ver qué pasa.

La disciplina fue la base sobre la que armé todo esto, y el estudio me trae perspectivas y recursos que por mi cuenta no hubiera encontrado. No sé si mis resultados son mejores que antes. Con pura disciplina ya me iba bien, y Claude es lo bastante inteligente para dar buenas respuestas sin que uno itere mucho. Lo que sí noté es que el resultado se parece más a lo que quiero: me explico y me organizo mejor, y puedo llevar varias cosas en paralelo.

Seguir al pie de la letra una serie de pasos, los míos o los de cualquiera, sirve poco. Lo que sirve es ir creando una intuición, tus propios métodos, tu propio gusto y el acomodo que le encuentres a tus herramientas, desde dónde estás y hacia dónde quieres llegar.

## Lo que no se delega

No hay una forma correcta o incorrecta de usar estas herramientas, solo recomendaciones.

Entonces, lo que hago es eso: ser curioso, poner atención e intentar mejorar un poco cada vez.

Lo importante es no delegar nuestra creatividad, nuestro pensamiento ni nuestra esencia a la IA. Las personas somos una serie de paradojas, de agrupaciones extrañas que nos hacen únicos, y eso no lo puede copiar una IA.

Sé tú mismo y usa las herramientas desde tu visión del mundo.

## Fuentes

Consultadas del 26 al 28 de octubre de 2026.

- Ian Leslie, [Why Are LLMs Fixated On the Number 7?](https://www.ian-leslie.com/p/why-are-llms-fixated-on-the-number), 21 oct 2025; cita la prueba de Springboards.
- Michael Kubovy y Joseph Psotka, [The predominance of seven and the apparent spontaneity of numerical choices](https://doi.org/10.1037/0096-1523.2.2.291), *Journal of Experimental Psychology: Human Perception and Performance*, 1976.
- Javier Coronado-Blázquez, [Deterministic or probabilistic? The psychology of LLMs as random number generators](https://arxiv.org/abs/2502.19965), arXiv, feb 2025.
- Kurt Vonnegut, *A Man Without a Country*, 2005, [vía The Marginalian](https://www.themarginalian.org/2012/11/26/kurt-vonnegut-on-the-shapes-of-stories/).
- Anil R. Doshi y Oliver P. Hauser, [Generative AI enhances individual creativity but reduces the collective diversity of novel content](https://doi.org/10.1126/sciadv.adn5290), *Science Advances*, 2024.
- Nelson F. Liu y otros, [Lost in the Middle: How Language Models Use Long Contexts](https://arxiv.org/abs/2307.03172), arXiv, 2023; publicado en *Transactions of the ACL*, 2024.
- Kelly Hong, Anton Troynikov y Jeff Huber, [Context Rot: How Increasing Input Tokens Impacts LLM Performance](https://www.trychroma.com/research/context-rot), Chroma, 14 jul 2025.
- Mosh Levy, Alon Jacoby y Yoav Goldberg, [Same Task, More Tokens: the Impact of Input Length on the Reasoning Performance of Large Language Models](https://aclanthology.org/2024.acl-long.818/), *ACL*, 2024.
- Phillippa Lally y otros, [How are habits formed: Modelling habit formation in the real world](https://doi.org/10.1002/ejsp.674), *European Journal of Social Psychology*, 2010.
- Eric Jorgenson, [*The Almanack of Naval Ravikant*](https://www.navalmanack.com/), 2020.
