---
title: Patrones de sistemas distribuidos
subtitle: Cuatro hábitos que sobrevivieron al cambio de un proveedor de nube Fortune 500 a una empresa donde la rotación de guardias es una sola persona.
excerpt: Lo que me traje de construir pipelines de imágenes y cargar el pager de severidad 1 en Oracle Cloud a operar todo en una inmobiliaria pequeña. Máquinas de estados, idempotencia, salud que depende de las dependencias y elegir la herramienta más chica.
date: 2026-09-07
readMinutes: 6
tags:
  - Diseño de sistemas
  - Nube
  - CI/CD
  - Oracle
---

Entre 2019 y 2021 trabajé en Big Data Service de Oracle Cloud Infrastructure. Construía los pipelines de imágenes que llevaban aplicaciones de Big Data on-premise a la nube y hacía mi turno en la rotación global de guardias para incidentes de severidad 1. Desde 2024 dirijo la ingeniería de Century 21 CAM Grupo, una inmobiliaria en Riviera Nayarit. Ahí la infraestructura es un puñado de sitios en Astro sobre Cloudflare, una base de datos PostgreSQL con transacciones de la MLS, un servicio que genera documentos y un servidor privado de LLM.

En escala, los dos entornos no tienen casi nada en común. Aun así, cuatro hábitos se vinieron conmigo. He llegado a pensar que son la parte de los sistemas distribuidos que de verdad trata de sistemas, y no la que trata de Kubernetes.

## Un pipeline es una máquina de estados, y cada estado necesita una salida

Un pipeline de imágenes toma una imagen base, le instala una pila de software, verifica el resultado y publica un artefacto. Escrito como script, es una secuencia de pasos. Escrito como máquina de estados, es un conjunto de estados con transiciones explícitas, incluidas las que no quieres que pasen.

La diferencia aparece cuando algo falla. Un script que muere a mitad de la publicación deja un artefacto subido a medias, o subido pero sin verificar, y la siguiente ejecución tiene que adivinar qué pasó. Una máquina de estados te obliga a responder desde el diseño: si la verificación falla, ¿en qué estado estamos y cuál es el único movimiento válido desde ahí? En Oracle la respuesta casi siempre era "descarta y reconstruye desde la última etapa verificada". Codificar eso en TeamCity como etapas separadas, con artefactos entre ellas, permitía que una ejecución fallida se reanudara en lugar de empezar de cero.

En CAM Grupo el pipeline es un generador de documentos: entran los datos de una propiedad y sale un contrato regulado. Hay menos estados, pero la regla es idéntica. Un contrato está generado y validado por completo, o no existe. No hay un estado en el que un documento renderizado a medias haya llegado a manos de un cliente.

## Cada frontera es una frontera de reintentos, así que toda operación debe ser idempotente

Las redes reintentan. Las colas vuelven a entregar. Los usuarios hacen doble clic. Si una operación no es segura de ejecutar dos veces, tarde o temprano se va a ejecutar dos veces, y la segunda va a ser la cara.

En Oracle esta era una regla para los servicios REST en Python que manejaban los pipelines: cada petición que modificaba algo llevaba una llave proporcionada por el cliente, y repetir una llave devolvía el resultado original en lugar de volver a hacer el trabajo. El patrón es viejo y aburrido, y eliminó una clase entera de incidentes.

La misma regla le dio forma al generador de contratos. Generar es una función pura de sus entradas. Regenerar un contrato para la misma propiedad, el mismo cliente y los mismos términos produce el mismo documento, byte por byte, así que un reintento después de un timeout no puede crear un segundo contrato, sutilmente distinto, dentro de un proceso legal. El determinismo es idempotencia que te sale gratis.

## Sano quiere decir que las dependencias están sanas

Una rotación de severidad 1 te enseña algo muy rápido: un servicio que responde 200 en su endpoint de salud mientras su base de datos es inalcanzable te mintió en el peor momento posible. Un análisis de causa raíz tras otro, en caídas de clientes empresariales, terminaba en un componente que estaba arriba pero no funcionaba, y en un monitoreo que no sabía distinguir entre las dos cosas.

El hábito que me quedó es tratar el health check como un contrato sobre las dependencias. Cada cosa que el servicio necesita para hacer su trabajo tiene su propia línea: la base de datos, la caché, la API externa, el disco. La salud es la conjunción de todas. Cuando algo se degrada, el check dice qué dependencia fue, y el pager te dice dónde buscar en lugar de solo avisarte que algo anda mal.

En la inmobiliaria la idea aplica a los datos más que a los servicios. El pipeline de inteligencia de mercado que limpia las transacciones de la MLS corre detección de anomalías sobre su propia salida antes de que algo más adelante la lea. Un tablero que muestra datos malos sin avisar es la versión de datos de un health check que responde 200.

## Las restricciones eligen la herramienta, no al revés

Oracle tenía cómputo prácticamente ilimitado y un proceso a la altura. CAM Grupo tiene un presupuesto muy limitado y autonomía completa. Los patrones de arriba aplican en los dos lugares. Las implementaciones no.

- Oracle publicaba imágenes con Artifactory, con TeamCity orquestando. Los sitios de la inmobiliaria se construyen en Cloudflare a partir de un git push.
- Oracle tenía equipos de SRE rotando para cubrir las 24 horas. La inmobiliaria me tiene a mí, y los sistemas están elegidos para que una alerta a las 3 de la mañana sea rara y sencilla.
- Oracle necesitaba un servicio con estado para casi todo. La inmobiliaria usa sitios estáticos donde un sitio estático alcanza, que es en casi todos lados.

El error que veo más seguido, en equipos grandes y chicos, es elegir primero la herramienta y después descubrir qué propiedades te da. Funciona mejor en el orden inverso. Decide qué necesitas: publicaciones atómicas, reintentos seguros, señales de salud honestas. Luego elige lo más simple que te lo dé. La complejidad que no compra ninguna de esas propiedades es una restricción que te pusiste tú solo.
