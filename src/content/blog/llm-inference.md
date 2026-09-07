---
title: LLM Inference On-Premise
subtitle: A Mac mini, Gemma 3 under MLX, and Tailscale. What it takes to keep client documents off third-party APIs at a small firm.
excerpt: A practical account of running a private LLM server for a real estate brokerage on a 2025 Mac mini with Apple's MLX framework and Gemma 3, reachable only over Tailscale. Architecture, setup, throughput, and when not to do this.
date: 2026-09-07
readMinutes: 7
tags:
  - LLM
  - MLX
  - Apple Silicon
  - Tailscale
---

In 2025 I set up a private LLM inference server for CAM Grupo, a real estate brokerage, on a Mac mini. The model runs under Apple's MLX framework and the machine is reachable only over a Tailscale network. The motive was not cost. At our volume a hosted API is cheap. The motive was that contracts, client communications, and pre-sale pricing should not leave the firm's network, whatever a provider's retention policy says.

This is what the stack looks like, what it took to set up, and where it stops being the right answer.

## Why a Mac and not a GPU box

Apple Silicon shares one memory pool between CPU and GPU. For LLM inference that matters more than raw compute, because the constraint on running a model is whether the weights fit in memory the GPU can address. On a discrete GPU that is VRAM, and consumer cards top out around 24 GB. On a Mac it is the whole machine's RAM.

MLX is Apple's array framework built for that architecture. Tensors live in unified memory and move between CPU and GPU without copies. The practical effect is that a quiet, low-power desktop can hold a model that would otherwise need a workstation GPU, at the cost of generation speed.

A 2025 Mac mini with an M4 Pro is enough. It is small, silent, draws little power at idle, and sits on a shelf in the office.

## The model

The server runs Gemma 3, Google's open-weight model, in the 27B-parameter instruction-tuned variant quantized to 4 bits. At that size the weights take roughly 16 GB, which leaves the rest of memory for the KV cache and long documents. Gemma 3 handles Spanish well, which matters for Mexican real estate contracts, and its 128k context window means a full contract fits in one prompt.

The 4-bit quantization costs some quality against the full-precision model. For our tasks, comparing contract versions, extracting clauses, summarizing communications, the difference has not been material. For anything where it might be, the router below sends the job elsewhere.

## The stack

```text
Model serving
  mlx-lm server, OpenAI-compatible HTTP API
  model: mlx-community/gemma-3-27b-it-4bit
  bound to the Tailscale interface, not 0.0.0.0

Network
  Tailscale mesh over WireGuard
  every staff laptop is a node
  ACL: only tagged staff devices may reach the server's port

Application
  hosted Claude API when the inputs are not confidential
  local Gemma when a document must stay on premises
  the caller decides based on data classification, not on convenience
```

## Setup

MLX ships a server that speaks the OpenAI chat-completions format, so existing client code needs only a new base URL.

```bash
pip install mlx-lm

mlx_lm.server \
  --model mlx-community/gemma-3-27b-it-4bit \
  --host 100.x.y.z \
  --port 8080
```

The host is the machine's Tailscale address. Binding there instead of to all interfaces means the port does not exist on the office LAN or the public internet, only inside the mesh.

```python
from openai import OpenAI

client = OpenAI(base_url="http://100.x.y.z:8080/v1", api_key="unused")

response = client.chat.completions.create(
    model="local",
    messages=[{"role": "user", "content": prompt}],
    temperature=0.1,
)
```

The low temperature is deliberate. Contract review wants the same answer to the same question every time, and a near-greedy decode is the closest a sampling model gets to that.

## Tailscale

Tailscale gives every device a stable address on a private WireGuard mesh, with no port forwarding, no static IP, and no VPN concentrator. Access control is a policy file:

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

Devices in the staff group can reach the inference tag on that port. Nothing else can, including other devices on the same office network. Connections between two Macs on the mesh are direct once the initial hole-punch succeeds, and relayed through Tailscale's DERP servers only when it fails.

## Throughput, and how to estimate it

Single-stream generation on this class of hardware is bound by memory bandwidth, not compute. Each generated token reads the full set of weights once, so the ceiling is bandwidth divided by weight size. An M4 Pro moves about 273 GB/s and a 4-bit 27B model is about 16 GB, so the theoretical ceiling is around 17 tokens per second. In practice, with cache reads and overhead, expect something on the order of ten.

That is slow for interactive chat and fine for what we use it for. Contract review is a batch job. A document goes in, an analysis comes out a minute later, and nobody is watching the cursor. Prompt processing, the phase where the model reads the input, is compute-bound and much faster per token, so long documents are not the bottleneck they look like.

## Where it stops working

- **Concurrency.** One machine serves one stream well. Two simultaneous users halve each other's speed. Ten need a queue or more machines.
- **Model lag.** The strongest models are hosted-only, and open weights arrive later and smaller. For hard reasoning tasks the hosted API is better, and the router sends non-confidential hard tasks there.
- **Operations.** Someone updates the model, watches memory, and restarts the server when it wedges. At a firm this size that someone is me. The stack is simple enough that this costs an hour a month, but it is not zero.

## When this is the right call

On-premise inference makes sense when the data cannot leave, when the workload is batch rather than interactive, when a model that fits in 32 to 64 GB is good enough for the task, and when one person can own the box part-time. All four held for us.

If you need a frontier model, or real-time responses for many users, use a hosted API and put the confidential data somewhere else. If you need to read sensitive documents without sending them to a third party, a Mac mini on a Tailscale network is a small, quiet, and sufficient answer.
