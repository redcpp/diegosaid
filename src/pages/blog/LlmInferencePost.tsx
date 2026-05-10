import BlogPostLayout from './BlogPostLayout';

export default function LlmInferencePost() {
  return (
    <BlogPostLayout
      title="LLM Inference On-Premise"
      subtitle="Running private MLX + Tailscale + Apple Silicon for secure, cost-effective LLM serving."
      date="SEPTEMBER 2024"
      readTime="10 MIN READ"
      tags={['LLM', 'MLX', 'Apple Silicon', 'Tailscale']}
    >
      <p>
        In 2023, I made a decision that saved CAM Grupo thousands of dollars monthly and kept our client data out of third-party APIs: I built a private LLM inference stack on Apple Silicon using Apple's MLX framework, connected via Tailscale for secure remote access. This article explains the architecture, the trade-offs, and why on-premise inference is viable for small teams.
      </p>

      <h2>The Problem: API Costs and Data Sovereignty</h2>
      <p>
        CAM Grupo processes legal contracts, client communications, and proprietary market data. Sending this to OpenAI or Anthropic's APIs introduces two problems: (1) recurring costs that scale with usage, and (2) data leaving our infrastructure. For a brokerage handling pre-sale developments with confidential pricing, data sovereignty is not optional.
      </p>
      <p>
        The alternative — running models locally — was historically impractical. CUDA dependencies, power consumption, and model availability made self-hosting a full-time job. MLX changed that.
      </p>

      <h2>MLX: Why Apple Silicon?</h2>
      <p>
        Apple's MLX framework is not just a PyTorch clone for Macs. It is designed specifically for the Unified Memory Architecture of Apple Silicon, where CPU, GPU, and Neural Engine share a single memory pool. This has a profound implication for LLM inference:
      </p>
      <pre>
{`Traditional GPU (CUDA):
  - Model weights in VRAM (24GB max on consumer cards)
  - Activations copied between CPU RAM and VRAM
  - Context window limited by VRAM capacity

Apple Silicon (MLX):
  - Model weights in unified memory (up to 192GB on Mac Studio)
  - Zero-copy tensor operations
  - Context window limited by total RAM, not VRAM`}
      </pre>
      <p>
        On a Mac Studio with 64GB unified memory, I can run a 70B parameter model with 4-bit quantization — something that requires multiple A100s in a traditional setup. The throughput is lower, but for our use case (batch contract analysis, not real-time chat), latency is acceptable.
      </p>

      <h2>The Stack</h2>
      <p>
        Our inference stack has three layers:
      </p>
      <pre>
{`Layer 1: Model Serving (MLX Server)
  - Framework: mlx-lm
  - Model: Meta-Llama-3.1-70B-Instruct (4-bit quantized)
  - Interface: OpenAI-compatible HTTP API
  - Local endpoint: http://localhost:8080/v1/completions

Layer 2: Network (Tailscale)
  - VPN mesh network over WireGuard
  - Each agent's MacBook is a node
  - Mac Studio is the "server" node
  - ACLs restrict who can reach port 8080

Layer 3: Application Integration
  - Claude API for non-sensitive tasks (marketing copy)
  - Local MLX for sensitive tasks (contract review)
  - Router decides based on data classification`}
      </pre>

      <h2>Setting Up MLX Server</h2>
      <p>
        The setup is surprisingly minimal. MLX provides a drop-in server compatible with the OpenAI API format:
      </p>
      <pre>
{`# Install
pip install mlx-lm

# Download quantized model
huggingface-cli download mlx-community/Meta-Llama-3.1-70B-Instruct-4bit

# Start server
python -m mlx_lm.server \
  --model mlx-community/Meta-Llama-3.1-70B-Instruct-4bit \
  --host 127.0.0.1 \
  --port 8080

# Test
 curl http://localhost:8080/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "local",
    "messages": [{"role": "user", "content": "Hello"}]
  }'`}
      </pre>
      <p>
        The key advantage is API compatibility. Existing code that calls OpenAI's API works with minimal changes — just change the base URL.
      </p>

      <h2>Tailscale: The Networking Layer</h2>
      <p>
        Tailscale makes the Mac Studio accessible from anywhere without opening firewall ports or managing static IPs. Each agent installs Tailscale on their laptop, and I configure ACLs so only authorized devices can reach the inference endpoint:
      </p>
      <pre>
{`// tailscale ACL
{
  "acls": [
    {
      "action": "accept",
      "src": ["group:agents"],
      "dst": ["tag:inference-server:8080"]
    }
  ]
}`}
      </pre>
      <p>
        The connection is encrypted with WireGuard and routed through Tailscale's DERP relays only when direct connections fail. In practice, two Macs on the same Tailscale network communicate directly with ~2ms latency.
      </p>

      <h2>Custom Skills: Contract Comparison</h2>
      <p>
        Raw inference is not enough. We built a "skill" layer that structures LLM calls into reusable workflows. The contract comparison skill, for example:
      </p>
      <pre>
{`class ContractComparisonSkill:
    def __init__(self, mlx_client):
        self.client = mlx_client
    
    def compare(self, contract_a, contract_b):
        prompt = f"""
        Compare these two real estate contracts.
        Identify differences in: payment terms, delivery dates, 
        penalty clauses, and force majeure provisions.
        
        Contract A: {contract_a}
        Contract B: {contract_b}
        """
        
        response = self.client.chat.completions.create(
            model="local",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.1,  # Low temperature for consistency
        )
        
        return self.parse_comparison(response.choices[0].message.content)`}
      </pre>
      <p>
        The temperature of 0.1 is critical for legal analysis. High temperatures produce creative language; legal review requires deterministic outputs.
      </p>

      <h2>Performance Benchmarks</h2>
      <p>
        On a Mac Studio (M2 Ultra, 64GB RAM):
      </p>
      <pre>
{`Model: Meta-Llama-3.1-70B-Instruct (4-bit)
Context: 4096 tokens
Throughput: ~18 tokens/second
Memory usage: ~42GB unified memory

Comparison: GPT-4 API
Cost per 1M tokens: ~$30
Our usage: ~500K tokens/month
Monthly savings: ~$15 (direct inference)
                        + $0 (data never leaves premises)`}
      </pre>
      <p>
        The raw cost savings are modest because our volume is low. The real value is data sovereignty and zero latency for batch processing. A contract review job that would queue on OpenAI's API runs immediately on our stack.
      </p>

      <h2>Limitations and Trade-offs</h2>
      <p>
        On-premise inference is not a universal replacement for API services:
      </p>
      <ul>
        <li>
          <strong>Throughput ceiling.</strong> A Mac Studio handles one inference stream well. Concurrent users require queuing or multiple machines.
        </li>
        <li>
          <strong>Model lag.</strong> New models appear on Hugging Face days or weeks after API release. If you need GPT-4-level reasoning on day one, APIs win.
        </li>
        <li>
          <strong>Operational burden.</strong> Someone has to update models, monitor memory usage, and restart the server. At CAM Grupo, that is me.
        </li>
      </ul>

      <h2>When to Choose On-Premise</h2>
      <p>
        Based on our experience, on-premise LLM inference makes sense when:
      </p>
      <ol>
        <li>Data cannot leave your infrastructure (legal, medical, financial).</li>
        <li>Usage is batch-oriented, not real-time (report generation, document review).</li>
        <li>You have Apple Silicon with 32GB+ unified memory available.</li>
        <li>You have one person who can manage the stack part-time.</li>
      </ol>
      <p>
        If you need real-time chat for thousands of users, use the APIs. If you need to analyze sensitive documents without sending them to San Francisco, MLX + Tailscale is a pragmatic, surprisingly powerful solution.
      </p>
    </BlogPostLayout>
  );
}
