import { Project } from '@/types/common';

export const projects: Project[] = [
  {
    slug: 'rag-chatbot',
    title: 'RAG Chatbot',
    description: 'RAG chatbot with intent-based retrieval, optimized memory (60–70% token savings), and hybrid search',
    longDescription: `RAG chatbot built with FastAPI, featuring intent-based retrieval (skips vector search for small talk),
    optimized memory with relevance filtering (60–70% token savings vs sliding window), and hybrid search (vector + BM25 with RRF).

    Key aspects: BGE-M3 local embeddings (free), Redis embedding cache, LLM reranking (top 50 → top 5),
    multiple chunking strategies (fixed, semantic, recursive), and 335+ tests with 80%+ coverage.`,
    tags: ['RAG', 'FastAPI', 'Vector Search', 'LLM', 'Docker'],
    coverImage: '/images/projects/rag-cover.png',
    demoType: 'interactive',
    featured: true,
    stats: {
      'Test Coverage': '80%+',
      'Test Cases': '335+',
      'Memory Strategies': '4',
      'LLM Providers': '3',
    },
    capabilities: [
      'Document Ingestion (PDF, TXT, MD)',
      'Multiple Chunking Strategies (fixed, semantic, recursive)',
      'Intent-Based Retrieval (skips search for greetings)',
      'Optimized Memory (60–70% token savings)',
      'Hybrid Search (Vector + BM25 RRF)',
      'LLM Reranking (top 50 → top 5)',
      'BGE-M3 Local Embeddings (free)',
      'Redis Embedding Cache',
      'Streaming Responses',
      'Multi-LLM (OpenAI, Anthropic, GLM)',
      'JWT Auth & Rate Limiting',
    ],
    githubUrl: 'https://github.com/Bensonluo/rag_chatbot',
    techStack: [
      'Python',
      'FastAPI',
      'Qdrant (Vector DB)',
      'PostgreSQL',
      'Redis',
      'Docker',
      'Kubernetes',
      'OpenAI/GLM APIs',
    ],
  },
  {
    slug: '4bit-qlora-post-training',
    title: '4-bit QLoRA Post-Training',
    description: '4-bit QLoRA fine-tuning for LLMs on consumer GPUs — SFT, DPO, domain adaptation',
    longDescription: `A 4-bit QLoRA framework for fine-tuning LLMs on consumer GPUs (e.g., RTX 4060 8GB).
    Implements SFT, Domain Adaptation, and DPO with testing, logging, and cross-platform workflows.

    Key aspects: 84% memory reduction via NF4 quantization, multiple fine-tuning techniques,
    and a finance domain specialization as a practical use case.`,
    tags: ['LLM', 'PyTorch', 'QLoRA', 'Transformers', 'DPO', 'MLOps'],
    coverImage: '/images/projects/qlora-cover.png',
    demoType: 'visualization',
    featured: true,
    stats: {
      'Memory Reduction': '84%',
      'Model Support': '0.5B - 3.8B',
      'Min VRAM': '8GB (RTX 4060)',
      'Training Time': '14s (quick test)',
    },
    githubUrl: 'https://github.com/Bensonluo/4bit-QLoRA-post-training',
    techStack: [
      'Python',
      'PyTorch',
      'Hugging Face Transformers',
      'PEFT (LoRA)',
      'bitsandbytes',
      'TRL',
      'Weights & Biases',
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
