'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface RAGPipelineOverviewProps {
  stats?: Record<string, string>;
}

export function RAGPipelineOverview({ stats }: RAGPipelineOverviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Technical Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-0">
          {/* RAG Pipeline Flow */}
          <section className="py-10 border-b">
            <h2 className="mb-6 text-2xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              RAG Pipeline Flow
            </h2>
            <div className="rounded-lg border bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="shrink-0">1</Badge>
                  <div>
                    <span className="font-semibold">Intent Detection</span>
                    <p className="text-sm text-muted-foreground">Hybrid (rule + LLM). Only triggers retrieval for knowledge intents (QUESTION, HOW_TO, etc.)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="shrink-0">2</Badge>
                  <div>
                    <span className="font-semibold">Memory Retrieval</span>
                    <p className="text-sm text-muted-foreground">Optimized context: last 3 messages + relevance-filtered history (60–70% token savings)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="shrink-0">3</Badge>
                  <div>
                    <span className="font-semibold">Document Retrieval</span>
                    <p className="text-sm text-muted-foreground">Hybrid search (Vector + BM25 RRF) → LLM reranking (top 50 → top 5)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="shrink-0">4</Badge>
                  <div>
                    <span className="font-semibold">LLM Generation</span>
                    <p className="text-sm text-muted-foreground">Context + retrieved docs → response. Supports streaming.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Document Ingestion */}
          <section className="py-10 border-b bg-muted/30">
            <h2 className="mb-6 text-2xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Document Ingestion
            </h2>
            <p className="mb-6 text-muted-foreground">
              Documents are processed before retrieval. Upload via API (text or file), then preprocess → chunk → embed → store in Qdrant.
            </p>
            <div className="space-y-6">
              <div>
                <h3 className="mb-3 font-semibold">Supported Formats</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">PDF</Badge>
                  <Badge variant="secondary">TXT</Badge>
                  <Badge variant="secondary">Markdown</Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  POST /api/v1/documents/upload (text) or /upload/file (file)
                </p>
              </div>
              <div>
                <h3 className="mb-3 font-semibold">Chunking Strategies</h3>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-lg border bg-card p-3">
                    <h4 className="mb-1 text-sm font-medium text-purple-600 dark:text-purple-400">Fixed</h4>
                    <p className="text-xs text-muted-foreground">Fixed-size chunks with overlap. Simple and predictable.</p>
                  </div>
                  <div className="rounded-lg border bg-card p-3">
                    <h4 className="mb-1 text-sm font-medium text-blue-600 dark:text-blue-400">Semantic</h4>
                    <p className="text-xs text-muted-foreground">Split at paragraph/sentence boundaries. Better context preservation.</p>
                  </div>
                  <div className="rounded-lg border bg-card p-3">
                    <h4 className="mb-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">Recursive</h4>
                    <p className="text-xs text-muted-foreground">Recursive character splitting. Handles varied document structures.</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="mb-3 font-semibold">Pipeline</h3>
                <div className="rounded-lg border bg-card p-4 font-mono text-xs text-muted-foreground">
                  <pre>{`Document → Preprocess (clean, normalize)
       → Chunk (fixed / semantic / recursive)
       → Embed (BGE-M3 / GLM)
       → Store in Qdrant`}</pre>
                </div>
              </div>
            </div>
          </section>

          {/* Stats */}
          {stats && (
            <section className="py-10 border-b">
              <h2 className="mb-6 text-2xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Project Stats
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
                    <p className="mt-1 text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      {value}
                    </p>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Architecture Diagram */}
          <section className="py-10 bg-muted/30">
            <h2 className="mb-6 text-2xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Architecture
            </h2>
            <div className="rounded-lg border bg-card p-4 font-mono text-xs overflow-x-auto">
              <pre className="text-muted-foreground">{`Client → FastAPI
  ├── Middleware: Request ID, Rate Limit, Metrics
  ├── Document Service (Ingestion)
  │   ├── Preprocess (clean, normalize)
  │   ├── Chunk (fixed / semantic / recursive)
  │   └── Embed & Store → Qdrant
  ├── Chat Service
  │   ├── Intent Detection (Rule + LLM hybrid)
  │   ├── Memory (Optimized / Sliding / Summarization)
  │   ├── Retrieval (Vector + BM25 → Rerank)
  │   └── LLM (OpenAI / Anthropic / GLM)
  └── Data Layer
      ├── PostgreSQL (sessions, messages)
      ├── Redis (embedding cache)
      └── Qdrant (vector DB)`}</pre>
            </div>
          </section>
        </CardContent>
      </Card>
    </motion.div>
  );
}
