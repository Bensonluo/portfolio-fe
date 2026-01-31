import { Project } from '@/types/common';

export const projects: Project[] = [
  {
    slug: 'rag-chatbot',
    title: 'RAG Chatbot',
    description: 'Production-grade RAG chatbot with intelligent intent detection and memory management',
    longDescription: `Production-ready RAG chatbot built with FastAPI, featuring intelligent intent detection,
    memory management, and hybrid vector search. This system demonstrates enterprise-grade architecture with
    comprehensive testing, monitoring, and deployment configurations.

    The chatbot supports multiple LLM providers (OpenAI, Anthropic, GLM), hybrid search combining semantic
    and keyword matching, and advanced features like streaming responses, JWT authentication, and rate limiting.`,
    tags: ['RAG', 'FastAPI', 'Vector Search', 'LLM', 'Docker'],
    coverImage: '/images/projects/rag-cover.png',
    demoType: 'interactive',
    featured: true,
    capabilities: [
      'Hybrid Vector + BM25 Search',
      'Intent Detection (Rule + LLM)',
      'Memory Management Strategies',
      'Streaming Responses',
      'Multi-LLM Support',
      'JWT Authentication',
    ],
    githubUrl: 'https://github.com/PengLuo-TR/rag_chatbot',
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
    description: 'Efficient LLM fine-tuning using quantized low-rank adaptation for consumer GPUs',
    longDescription: `A complete 4-bit QLoRA framework for fine-tuning Large Language Models on consumer GPUs.
    This project demonstrates production-ready ML engineering with comprehensive testing, monitoring, and
    cross-platform training workflows.

    Key innovations include 84% memory reduction through NF4 quantization while maintaining model quality,
    support for multiple training techniques (SFT, Domain Adaptation, DPO), and a finance domain specialization
    that showcases practical LLM applications.`,
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
    githubUrl: 'https://github.com/PengLuo-TR/4bit-QLoRA-post-training',
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
