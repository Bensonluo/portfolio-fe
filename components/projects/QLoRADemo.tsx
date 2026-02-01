'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface QLoRADemoProps {
  stats?: Record<string, string>;
}

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'techniques', label: 'Techniques' },
  { id: 'implementation', label: 'Implementation' },
];

export function QLoRADemo({ stats }: QLoRADemoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Technical Deep Dive</CardTitle>
            <nav className="flex flex-wrap gap-2 text-sm">
              {SECTIONS.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </CardHeader>
        <CardContent className="space-y-0">
          {/* ─── Section 1: Overview ─── */}
          <section id="overview" className="scroll-mt-8 py-10 border-b">
            <h2 className="mb-6 text-2xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Overview
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="mb-4 text-xl font-semibold">What is QLoRA?</h3>
                <p className="mb-4 text-muted-foreground">
                  <strong>QLoRA (Quantized Low-Rank Adaptation)</strong> enables efficient fine-tuning of large
                  language models on consumer GPUs by combining 4-bit quantization with low-rank adapters.
                </p>
                <div className="rounded-lg border bg-purple-50 dark:bg-purple-950/20 p-4">
                  <p className="text-sm">
                    <strong className="text-purple-600 dark:text-purple-400">Key Benefit:</strong> Train 7B+ parameter models on RTX 4060 GPU with as little as 8GB VRAM, achieving 84% memory reduction with minimal quality loss.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="mb-4 font-semibold">VRAM Comparison (7B Model)</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-4 rounded-lg border p-4">
                    <div className="flex-1">
                      <div className="mb-1 flex justify-between text-sm">
                        <span>Full Fine-tuning (FP16)</span>
                        <Badge variant="destructive">~14GB</Badge>
                      </div>
                      <div className="h-3 w-full overflow-hidden rounded-full bg-secondary">
                        <div className="h-full w-full bg-destructive" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 rounded-lg border p-4">
                    <div className="flex-1">
                      <div className="mb-1 flex justify-between text-sm">
                        <span>8-bit Quantization</span>
                        <Badge variant="secondary">~7GB</Badge>
                      </div>
                      <div className="h-3 w-full overflow-hidden rounded-full bg-secondary">
                        <div className="h-full w-1/2 bg-orange-500" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 rounded-lg border-2 border-purple-200 bg-purple-50 p-4 dark:border-purple-800 dark:bg-purple-950/20">
                    <div className="flex-1">
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="font-semibold">QLoRA (4-bit)</span>
                        <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">~3-4GB</Badge>
                      </div>
                      <div className="h-3 w-full overflow-hidden rounded-full bg-secondary">
                        <div className="h-full w-[25%] bg-gradient-to-r from-purple-600 to-blue-600" />
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">
                        84% memory reduction • Fits in 8GB VRAM ✓
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-4 font-semibold">Key Features</h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { title: 'Memory Efficient', desc: 'Train 1.5B models on 8GB VRAM' },
                    { title: '4-bit QLoRA', desc: '84% memory reduction, minimal quality loss' },
                    { title: 'DPO Support', desc: 'Direct Preference Optimization for alignment' },
                    { title: 'Domain Adaptation', desc: 'Finance specialization demonstrated' },
                    { title: 'Testable & Documented', desc: 'Tests, logging, monitoring' },
                    { title: 'Cross-Platform', desc: 'Mac dev + Windows GPU training workflow' },
                  ].map((feature) => (
                    <div key={feature.title} className="rounded-lg border p-3">
                      <h5 className="mb-1 font-medium text-sm">{feature.title}</h5>
                      <p className="text-xs text-muted-foreground">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {stats && (
                <div>
                  <h4 className="mb-4 font-semibold">Training Results (Qwen 0.5B)</h4>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {Object.entries(stats).map(([key, value]) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3 }}
                        className="rounded-lg border bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 p-4"
                      >
                        <p className="text-xs text-muted-foreground">{key}</p>
                        <p className="mt-1 text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                          {value}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* ─── Section 2: Architecture ─── */}
          <section id="architecture" className="scroll-mt-8 py-10 border-b bg-muted/30">
            <h2 className="mb-6 text-2xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Architecture
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="mb-4 text-xl font-semibold">QLoRA Architecture</h3>
                <p className="mb-4 text-muted-foreground">
                  QLoRA combines three key components to enable efficient fine-tuning.
                </p>
                <div className="rounded-lg border bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 p-6">
                  <div className="mb-4 space-y-4">
                    <div className="rounded-lg border-2 border-dashed border-purple-300 bg-white p-4 dark:border-purple-700 dark:bg-gray-900">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-semibold text-sm">🧊 Base Model (Frozen)</span>
                        <Badge variant="secondary" className="text-xs">4-bit NF4</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Quantized weights (not trainable)</p>
                    </div>
                    <div className="flex justify-center">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>+</span>
                        <span className="font-semibold text-purple-600 dark:text-purple-400">LoRA Adapters (Trainable)</span>
                        <span>+</span>
                      </div>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      <div className="rounded-lg border-2 border-purple-300 bg-purple-50 p-3 dark:border-purple-700 dark:bg-purple-950/30">
                        <div className="mb-1 text-xs font-medium">Matrix A</div>
                        <div className="text-xs text-muted-foreground">d × r (e.g., 4096 × 16)</div>
                      </div>
                      <div className="rounded-lg border-2 border-blue-300 bg-blue-50 p-3 dark:border-blue-700 dark:bg-blue-950/30">
                        <div className="mb-1 text-xs font-medium">Matrix B</div>
                        <div className="text-xs text-muted-foreground">r × d (e.g., 16 × 4096)</div>
                      </div>
                    </div>
                    <div className="rounded-lg border bg-white p-3 dark:bg-gray-900">
                      <div className="text-center text-xs">
                        <strong className="text-purple-600 dark:text-purple-400">Output:</strong> Frozen + Low-rank update
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-4 font-semibold">LoRA Mathematics</h4>
                <div className="rounded-lg border bg-card p-4">
                  <p className="mb-3 text-sm text-muted-foreground">
                    Instead of updating all parameters, LoRA learns small adapter matrices:
                  </p>
                  <div className="mb-4 rounded-lg bg-muted p-4 text-center font-mono text-sm">
                    W<sub>new</sub> = W<sub>frozen</sub> + ΔW = W<sub>frozen</sub> + BA
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><strong>B ∈ ℝ</strong><sup>d×r</sup>: Learnable adapter (rank r)</p>
                    <p><strong>A ∈ ℝ</strong><sup>r×d</sup>: Learnable adapter (rank r)</p>
                    <p><strong>r ≪ d</strong>: Rank (typically 8, 16, 32)</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      For a 7B model: trainable params reduced from ~7B to ~40M (<strong>99.4% reduction</strong>)
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-4 font-semibold">4-bit NF4 Quantization</h4>
                <div className="rounded-lg border bg-card p-4">
                  <p className="mb-3 text-sm text-muted-foreground">
                    NF4 (4-bit NormalFloat) is optimized for normally distributed weight data.
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg border bg-purple-50 dark:bg-purple-950/20 p-3">
                      <h5 className="mb-1 text-xs font-semibold text-purple-600 dark:text-purple-400">Normal Distribution</h5>
                      <p className="text-xs text-muted-foreground">LLM weights follow a bell curve, not uniform</p>
                    </div>
                    <div className="rounded-lg border bg-blue-50 dark:bg-blue-950/20 p-3">
                      <h5 className="mb-1 text-xs font-semibold text-blue-600 dark:text-blue-400">Precision Levels</h5>
                      <p className="text-xs text-muted-foreground">16 possible values vs 65,536 (FP16)</p>
                    </div>
                    <div className="rounded-lg border bg-indigo-50 dark:bg-indigo-950/20 p-3">
                      <h5 className="mb-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">Double Quantization</h5>
                      <p className="text-xs text-muted-foreground">Quantize quantization constants too</p>
                    </div>
                    <div className="rounded-lg border bg-pink-50 dark:bg-pink-950/20 p-3">
                      <h5 className="mb-1 text-xs font-semibold text-pink-600 dark:text-pink-400">Optimal Precision</h5>
                      <p className="text-xs text-muted-foreground">More precision where weights concentrate (near 0)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-4 font-semibold">VRAM Usage Breakdown (Qwen 1.5B)</h4>
                <div className="rounded-lg border bg-card p-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2 text-left font-medium">Component</th>
                        <th className="py-2 text-right font-medium">VRAM</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b"><td className="py-2">Base model (4-bit)</td><td className="py-2 text-right font-mono">~1.8 GB</td></tr>
                      <tr className="border-b"><td className="py-2">LoRA adapters (r=16)</td><td className="py-2 text-right font-mono">~0.4 GB</td></tr>
                      <tr className="border-b"><td className="py-2">Activations (BS=1, seq=512)</td><td className="py-2 text-right font-mono">~1.2 GB</td></tr>
                      <tr className="border-b"><td className="py-2">Optimizer states</td><td className="py-2 text-right font-mono">~0.8 GB</td></tr>
                      <tr><td className="py-2 font-semibold">Total</td><td className="py-2 text-right font-mono font-bold">~4.2 GB ✓</td></tr>
                    </tbody>
                  </table>
                  <p className="mt-3 text-xs text-center text-muted-foreground">
                    ✅ Fits comfortably in 8GB VRAM (RTX 4060)
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ─── Section 3: Techniques ─── */}
          <section id="techniques" className="scroll-mt-8 py-10 border-b">
            <h2 className="mb-6 text-2xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Techniques
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="mb-4 text-xl font-semibold">Training Techniques</h3>
                <p className="mb-4 text-muted-foreground">
                  This project implements three major fine-tuning techniques:
                </p>
                <div className="space-y-4">
                  <div className="rounded-lg border-2 border-purple-200 bg-purple-50 p-4 dark:border-purple-800 dark:bg-purple-950/20">
                    <div className="mb-3 flex items-center gap-2">
                      <Badge className="bg-gradient-to-r from-purple-600 to-blue-600">SFT</Badge>
                      <h4 className="font-semibold">Supervised Fine-Tuning</h4>
                    </div>
                    <p className="mb-3 text-sm text-muted-foreground">
                      Training on instruction-response pairs to teach the model to follow instructions and adapt to specific domains.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 text-sm">
                        <span className="text-purple-600 dark:text-purple-400">•</span>
                        <span><strong>Cross-Entropy Loss:</strong> Standard supervised learning objective</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <span className="text-purple-600 dark:text-purple-400">•</span>
                        <span><strong>Alpaca Format:</strong> Instruction-Input-Response structure</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <span className="text-purple-600 dark:text-purple-400">•</span>
                        <span><strong>Domain Adaptation:</strong> Finance-specialized dataset demonstrated</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/20">
                    <div className="mb-3 flex items-center gap-2">
                      <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600">DPO</Badge>
                      <h4 className="font-semibold">Direct Preference Optimization</h4>
                    </div>
                    <p className="mb-3 text-sm text-muted-foreground">
                      Align model with human preferences without training a separate reward model (simpler than RLHF).
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 text-sm">
                        <span className="text-blue-600 dark:text-blue-400">•</span>
                        <span><strong>No Reward Model:</strong> Directly optimizes using preference pairs</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <span className="text-blue-600 dark:text-blue-400">•</span>
                        <span><strong>More Stable:</strong> Avoids PPO instability issues</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <span className="text-blue-600 dark:text-blue-400">•</span>
                        <span><strong>Data Format:</strong> Prompt-Chosen-Rejected triplets</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border-2 border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-800 dark:bg-indigo-950/20">
                    <div className="mb-3 flex items-center gap-2">
                      <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600">QLoRA</Badge>
                      <h4 className="font-semibold">4-bit Quantization</h4>
                    </div>
                    <p className="mb-3 text-sm text-muted-foreground">
                      Quantization technique that reduces memory by 84% while maintaining model quality.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 text-sm">
                        <span className="text-indigo-600 dark:text-indigo-400">•</span>
                        <span><strong>NF4 Quantization:</strong> Optimized for normal distributions</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <span className="text-indigo-600 dark:text-indigo-400">•</span>
                        <span><strong>Double Quantization:</strong> Quantizes quantization constants</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <span className="text-indigo-600 dark:text-indigo-400">•</span>
                        <span><strong>Flash Attention:</strong> Faster attention computation</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-4 font-semibold">LoRA Hyperparameters</h4>
                <div className="rounded-lg border bg-card p-4">
                  <div className="space-y-4">
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <span className="font-semibold text-sm">Rank (r)</span>
                        <Badge variant="secondary">r=16</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Controls expressiveness. Higher = more parameters. Recommended for most cases.</p>
                    </div>
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <span className="font-semibold text-sm">Alpha (α)</span>
                        <Badge variant="secondary">α=32</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Scaling factor: α = 2r. Controls the magnitude of the update.</p>
                    </div>
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <span className="font-semibold text-sm">Target Modules</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {['q_proj', 'v_proj', 'k_proj', 'o_proj', 'gate_proj', 'up_proj', 'down_proj'].map((mod) => (
                          <Badge key={mod} variant="outline" className="text-xs">{mod}</Badge>
                        ))}
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">Attention + FFN layers for comprehensive adaptation</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-4 font-semibold">Memory Optimization Techniques</h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border bg-card p-3">
                    <h5 className="mb-1 text-sm font-medium">Gradient Checkpointing</h5>
                    <p className="text-xs text-muted-foreground">Trade compute for memory • Saves ~50% activation memory</p>
                  </div>
                  <div className="rounded-lg border bg-card p-3">
                    <h5 className="mb-1 text-sm font-medium">Mixed Precision (BF16)</h5>
                    <p className="text-xs text-muted-foreground">Brain Float 16 • Saves ~30-40% memory</p>
                  </div>
                  <div className="rounded-lg border bg-card p-3">
                    <h5 className="mb-1 text-sm font-medium">Gradient Accumulation</h5>
                    <p className="text-xs text-muted-foreground">Simulate BS=8 with BS=1 • Same effective batch</p>
                  </div>
                  <div className="rounded-lg border bg-card p-3">
                    <h5 className="mb-1 text-sm font-medium">Paged Optimizers</h5>
                    <p className="text-xs text-muted-foreground">CPU offloading for optimizer states</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ─── Section 4: Implementation ─── */}
          <section id="implementation" className="scroll-mt-8 py-10 bg-muted/30">
            <h2 className="mb-6 text-2xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Implementation
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="mb-4 text-xl font-semibold">Complete Training Pipeline</h3>
                <div className="overflow-x-auto rounded-lg border bg-card p-4">
                  <pre className="text-sm"><code>{`# 1. Quantization Config (4-bit NF4)
from transformers import BitsAndBytesConfig

bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.float16,
    bnb_4bit_use_double_quant=True,
)

# 2. Load Model (Quantized)
model = AutoModelForCausalLM.from_pretrained(
    "Qwen/Qwen2.5-1.5B-Instruct",
    quantization_config=bnb_config,
    device_map="auto",
)

# 3. Prepare for k-bit training
model = prepare_model_for_kbit_training(model)

# 4. LoRA Config
lora_config = LoraConfig(
    r=16,              # Rank
    lora_alpha=32,     # Alpha = 2*r
    target_modules=["q_proj", "v_proj"],
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM",
)

# 5. Apply LoRA
model = get_peft_model(model, lora_config)

# 6. Train!
# Trainable params: ~40M (0.5% of 7B total)
trainer.train()`}</code></pre>
                </div>
              </div>

              <div>
                <h4 className="mb-4 font-semibold">Project Structure</h4>
                <div className="rounded-lg border bg-card p-4">
                  <pre className="text-sm text-muted-foreground"><code>{`4bit-QLoRA-post-training/
├── config/
│   ├── base.py          # Model, training, LoRA configs
│   ├── sft.py           # SFT-specific configs
│   └── dpo.py           # DPO-specific configs
├── src/
│   ├── models/          # Model loading, quantization
│   ├── data/            # Dataset loaders, preprocessing
│   ├── training/        # Trainers (SFT, Domain, DPO)
│   ├── evaluation/      # Metrics, generation, comparison
│   └── utils/           # Logging, memory, remote execution
├── scripts/
│   ├── train_quick_test.py      # Quick test (10 samples)
│   ├── train_finance_full.py    # Full finance (50K samples)
│   ├── train_sft.py             # Generic SFT
│   ├── train_dpo.py             # DPO training
│   └── merge_lora.py            # Merge adapters
└── tests/
    ├── unit/            # Unit tests
    └── integration/     # Integration tests`}</code></pre>
                </div>
              </div>

              <div>
                <h4 className="mb-4 font-semibold">Quick Start</h4>
                <div className="space-y-2">
                  <div className="rounded-lg border bg-card p-3">
                    <p className="mb-2 text-xs font-semibold text-muted-foreground"># Quick test (14 seconds)</p>
                    <code className="text-xs bg-muted px-2 py-1 rounded">python scripts/train_quick_test.py</code>
                  </div>
                  <div className="rounded-lg border bg-card p-3">
                    <p className="mb-2 text-xs font-semibold text-muted-foreground"># Full finance training (2-3 hours)</p>
                    <code className="text-xs bg-muted px-2 py-1 rounded">python scripts/train_finance_full.py</code>
                  </div>
                  <div className="rounded-lg border bg-card p-3">
                    <p className="mb-2 text-xs font-semibold text-muted-foreground"># DPO preference training</p>
                    <code className="text-xs bg-muted px-2 py-1 rounded">python scripts/train_dpo.py --quick-test</code>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-4 font-semibold">Tech Stack</h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border bg-purple-50 dark:bg-purple-950/20 p-3">
                    <h5 className="mb-2 text-xs font-semibold text-purple-600 dark:text-purple-400">Core Framework</h5>
                    <div className="flex flex-wrap gap-1">
                      {['transformers', 'peft', 'bitsandbytes', 'trl', 'accelerate'].map((lib) => (
                        <Badge key={lib} variant="secondary" className="text-xs">{lib}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-lg border bg-blue-50 dark:bg-blue-950/20 p-3">
                    <h5 className="mb-2 text-xs font-semibold text-blue-600 dark:text-blue-400">Training</h5>
                    <div className="flex flex-wrap gap-1">
                      {['torch', 'datasets', 'wandb', 'tensorboard', 'rich'].map((lib) => (
                        <Badge key={lib} variant="secondary" className="text-xs">{lib}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-lg border bg-indigo-50 dark:bg-indigo-950/20 p-3">
                    <h5 className="mb-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">Development</h5>
                    <div className="flex flex-wrap gap-1">
                      {['pytest', 'ruff', 'mypy', 'pre-commit', 'jupyter'].map((lib) => (
                        <Badge key={lib} variant="secondary" className="text-xs">{lib}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-lg border bg-pink-50 dark:bg-pink-950/20 p-3">
                    <h5 className="mb-2 text-xs font-semibold text-pink-600 dark:text-pink-400">Models Supported</h5>
                    <div className="flex flex-wrap gap-1">
                      {['Qwen 0.5B', 'Qwen 1.5B', 'Llama 3.2 3B', 'Phi-3'].map((model) => (
                        <Badge key={model} variant="outline" className="text-xs">{model}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <h4 className="mb-3 font-semibold">Project Highlights</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span><strong>99.4% parameter reduction:</strong> Only ~40M trainable params out of 7B</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span><strong>14-second quick test:</strong> Fast iteration and debugging</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span><strong>Structured codebase:</strong> Tests, logging, CI/CD</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span><strong>Multiple techniques:</strong> SFT, Domain Adaptation, DPO all supported</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span><strong>Distributed workflow:</strong> Mac dev + Windows GPU training</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </CardContent>
      </Card>
    </motion.div>
  );
}
