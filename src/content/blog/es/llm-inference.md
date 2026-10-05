---
title: Inferencia de LLM on-premise
subtitle: Una Mac mini, Gemma 3 sobre MLX y Tailscale. Lo que hace falta para que los documentos de los clientes no pasen por APIs de terceros en una empresa pequeña.
excerpt: Un relato práctico de cómo opero un servidor privado de LLM para una inmobiliaria en una Mac mini 2025, con el framework MLX de Apple y Gemma 3, accesible solo por Tailscale. Arquitectura, instalación, velocidad y cuándo no conviene hacerlo.
date: 2026-09-07
readMinutes: 7
tags:
  - LLM
  - MLX
  - Apple Silicon
  - Tailscale
---

En 2025 monté un servidor privado de inferencia de LLM (modelos de lenguaje grandes, la tecnología detrás de ChatGPT o Claude) para CAM Grupo, una inmobiliaria, en una Mac mini. El modelo corre sobre MLX, el framework de Apple, y la máquina solo es accesible dentro de una red de Tailscale. El motivo no fue el costo. Con nuestro volumen, una API en la nube sale barata. El motivo fue que los contratos, las comunicaciones con clientes y los precios de preventa no deberían salir de la red de la empresa, diga lo que diga la política de retención de un proveedor.

Así se ve el stack, esto costó montarlo y aquí deja de ser la respuesta correcta.

## Por qué una Mac y no un equipo con GPU

Apple Silicon comparte una sola memoria entre el CPU y el GPU. Para la inferencia de LLM eso pesa más que el cómputo bruto, porque lo que limita correr un modelo es si los pesos caben en la memoria a la que el GPU tiene acceso. En un GPU dedicado esa memoria es la VRAM, y las tarjetas de consumo llegan a unos 24 GB. En una Mac es toda la RAM de la máquina.

MLX es el framework de arreglos que Apple diseñó para esa arquitectura. Los tensores viven en memoria unificada y pasan del CPU al GPU sin copias. El efecto práctico es que una computadora de escritorio silenciosa y de bajo consumo puede cargar un modelo que de otro modo necesitaría un GPU de estación de trabajo, a cambio de generar más lento.

Una Mac mini 2025 con M4 Pro alcanza. Es chica, no hace ruido, consume poco en reposo y vive en un estante de la oficina.

## El modelo

El servidor corre Gemma 3, el modelo de pesos abiertos de Google, en su variante de 27 mil millones de parámetros ajustada para instrucciones y cuantizada a 4 bits. A ese tamaño los pesos ocupan unos 16 GB, y el resto de la memoria queda para la caché KV y los documentos largos. Gemma 3 maneja bien el español, lo cual importa para contratos inmobiliarios mexicanos, y su ventana de contexto de 128 mil tokens permite que un contrato completo quepa en un solo prompt.

La cuantización a 4 bits cuesta algo de calidad frente al modelo en precisión completa. Para nuestras tareas (comparar versiones de contratos, extraer cláusulas, resumir comunicaciones) la diferencia no ha sido relevante. Para cualquier cosa donde pudiera serlo, el enrutamiento que describo abajo manda el trabajo a otro lado.

## El stack

```text
Servir el modelo
  servidor de mlx-lm, API HTTP compatible con OpenAI
  modelo: mlx-community/gemma-3-27b-it-4bit
  escucha en la interfaz de Tailscale, no en 0.0.0.0

Red
  malla de Tailscale sobre WireGuard
  cada laptop del equipo es un nodo
  ACL: solo los dispositivos etiquetados del equipo llegan al puerto del servidor

Aplicación
  API de Claude en la nube cuando las entradas no son confidenciales
  Gemma local cuando un documento debe quedarse en la oficina
  decide quien llama, según la clasificación de los datos y no por comodidad
```

## Instalación

MLX incluye un servidor que habla el formato de chat completions de OpenAI, así que el código cliente que ya existe solo necesita una nueva URL base.

```bash
pip install mlx-lm

mlx_lm.server \
  --model mlx-community/gemma-3-27b-it-4bit \
  --host 100.x.y.z \
  --port 8080
```

El host es la dirección de Tailscale de la máquina. Escuchar ahí en lugar de en todas las interfaces significa que el puerto no existe en la red local de la oficina ni en el internet público, solo dentro de la malla.

```python
from openai import OpenAI

client = OpenAI(base_url="http://100.x.y.z:8080/v1", api_key="unused")

response = client.chat.completions.create(
    model="local",
    messages=[{"role": "user", "content": prompt}],
    temperature=0.1,
)
```

La temperatura baja es a propósito. Revisar contratos pide la misma respuesta a la misma pregunta cada vez, y una decodificación casi voraz es lo más cerca que llega a eso un modelo que muestrea.

## Tailscale

Tailscale le da a cada dispositivo una dirección estable en una malla privada de WireGuard, sin redirección de puertos, sin IP fija y sin concentrador de VPN. El control de acceso es un archivo de políticas:

```json
{
  "acls": [
    {
      "action": "accept",
      "src": ["group:staff"],
      "dst": ["tag:inference:8080"]
    }
  ]
}
```

Los dispositivos del grupo `staff` pueden llegar a la etiqueta `inference` en ese puerto. Nada más puede, ni siquiera otros dispositivos en la misma red de la oficina. Las conexiones entre dos Macs de la malla son directas una vez que funciona el hole punching inicial, y solo pasan por los servidores DERP de Tailscale cuando falla.

## Velocidad, y cómo estimarla

Generar un solo flujo en este tipo de hardware está limitado por el ancho de banda de memoria, no por el cómputo. Cada token generado lee una vez todos los pesos, así que el techo es el ancho de banda dividido entre el tamaño de los pesos. Un M4 Pro mueve unos 273 GB/s y un modelo de 27B a 4 bits pesa unos 16 GB, así que el techo teórico ronda los 17 tokens por segundo. En la práctica, con lecturas de caché y overhead, espera algo del orden de diez.

Es lento para un chat interactivo y suficiente para lo que lo usamos. Revisar contratos es un trabajo por lotes. Entra un documento, sale un análisis un minuto después y nadie está mirando el cursor. Procesar el prompt, la fase en la que el modelo lee la entrada, está limitado por el cómputo y es mucho más rápido por token, así que los documentos largos no son el cuello de botella que parecen.

## Dónde deja de funcionar

- **Concurrencia.** Una máquina atiende bien un flujo. Dos usuarios al mismo tiempo se reparten la velocidad a la mitad. Diez necesitan una cola o más máquinas.
- **Rezago de los modelos.** Los modelos más fuertes solo están en la nube, y los de pesos abiertos llegan después y más chicos. Para tareas de razonamiento difíciles la API en la nube es mejor, y el enrutamiento manda ahí las tareas difíciles que no son confidenciales.
- **Operación.** Alguien actualiza el modelo, vigila la memoria y reinicia el servidor cuando se traba. En una empresa de este tamaño ese alguien soy yo. El stack es lo bastante simple para que me cueste una hora al mes, pero no es cero.

## Cuándo es la decisión correcta

La inferencia on-premise tiene sentido cuando los datos no pueden salir, cuando la carga es por lotes y no interactiva, cuando un modelo que cabe en 32 a 64 GB es suficiente para la tarea y cuando una persona puede hacerse cargo del equipo a tiempo parcial. Las cuatro se cumplían en nuestro caso.

Si necesitas un modelo de frontera, o respuestas en tiempo real para muchos usuarios, usa una API en la nube y guarda los datos confidenciales en otro lado. Si necesitas leer documentos sensibles sin mandárselos a un tercero, una Mac mini en una red de Tailscale es una respuesta chica, silenciosa y suficiente.
