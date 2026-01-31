'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Send, Bot, User, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { ApiClient, ChatMessage } from '@/lib/api';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

// Mock responses for demo purposes
const MOCK_RESPONSES: Record<string, string> = {
  hello: 'Hello! This is a RAG chatbot demo. I can answer questions about the project, demonstrate retrieval capabilities, and showcase the chat interface. Ask me anything!',
  hi: 'Hi there! I\'m the RAG chatbot demo. Feel free to ask me about the project architecture, features, or try any question!',
  architecture: 'This RAG system uses a sophisticated architecture:\n\n• **Vector Search**: Qdrant vector database for semantic similarity\n• **Hybrid Search**: Combines vector search with BM25 keyword matching\n• **Intent Detection**: Hybrid rule-based + LLM-powered classification\n• **Memory Management**: Multiple strategies (sliding window, summarization, hybrid)\n• **Streaming**: Real-time server-sent events for faster response time',
  rag: 'RAG (Retrieval-Augmented Generation) combines the power of retrieval systems with large language models. It retrieves relevant context from a knowledge base and uses it to generate accurate, contextual responses. This approach reduces hallucinations and keeps answers grounded in actual data.',
  features: 'Key features include:\n\n✅ Hybrid Vector + BM25 Search\n✅ Multiple Intent Detection Strategies\n✅ Flexible Memory Management\n✅ Streaming Responses\n✅ Multi-LLM Support (OpenAI, Anthropic, GLM)\n✅ JWT Authentication\n✅ Rate Limiting\n✅ Docker & Kubernetes Ready',
  tech: 'Tech Stack:\n\n• **Backend**: FastAPI, Python\n• **Vector DB**: Qdrant\n• **Databases**: PostgreSQL, Redis\n• **LLM**: OpenAI, Anthropic, or GLM APIs\n• **Deployment**: Docker, Kubernetes\n• **Testing**: 335+ test cases, 80%+ coverage',
  demo: 'This is a frontend demo with placeholder responses. The full backend integrates with real LLM APIs and supports streaming responses, document upload, and advanced RAG features.',
  api: 'The API provides:\n\n• POST /api/v1/chat - Send messages\n• POST /api/v1/chat/stream - Stream responses\n• POST /api/v1/documents/upload - Upload documents\n• POST /api/v1/documents/search - Search knowledge base\n• JWT-based authentication\n• Comprehensive error handling',
};

const DEFAULT_RESPONSE =
  'That\'s an interesting question! In the full implementation, this would:\n\n1. Analyze your intent using hybrid detection\n2. Retrieve relevant context from Qdrant vector DB\n3. Combine vector search with BM25 keyword results\n4. Apply LLM reranking for best results\n5. Generate a response using the retrieved context\n\nFeel free to ask about the architecture, features, or technical details!';

function getMockResponse(query: string): string {
  const lower = query.toLowerCase();
  for (const [key, response] of Object.entries(MOCK_RESPONSES)) {
    if (lower.includes(key)) return response;
  }
  return DEFAULT_RESPONSE;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m a RAG chatbot demo. Ask me about the project architecture, features, or try any question!',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input, timestamp: new Date().toISOString() };
    setMessages((prev) => [...prev, userMessage]);
    const userQuery = input;
    setInput('');
    setIsLoading(true);

    try {
      // Try to use real API first, fallback to mock if API is unavailable
      let assistantResponse = '';
      
      // Add empty assistant message for streaming
      setMessages((prev) => [...prev, { 
        role: 'assistant', 
        content: '',
        timestamp: new Date().toISOString()
      }]);
      
      // Read streaming response
      for await (const chunk of ApiClient.streamChat(userQuery)) {
        assistantResponse += chunk;
        setMessages((prev) => {
          const updated = [...prev];
          const lastMessage = updated[updated.length - 1];
          if (lastMessage && lastMessage.role === 'assistant') {
            lastMessage.content = assistantResponse;
          }
          return updated;
        });
      }

      if (assistantResponse.trim()) {
        setIsLoading(false);
      } else {
        throw new Error('Empty response from API');
      }
    } catch (error) {
      console.warn('API unavailable, using mock response:', error);
      
      // Fallback to mock response
      setTimeout(() => {
        const response = getMockResponse(userQuery);
        setMessages((prev) => [...prev, { 
          role: 'assistant', 
          content: response,
          timestamp: new Date().toISOString()
        }]);
        setIsLoading(false);
      }, 500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Interactive Demo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-[500px] flex-col rounded-lg border">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                  </div>
                  {message.role === 'user' && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                      <User className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="flex items-center gap-1 rounded-lg bg-muted px-4 py-2">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground delay-100" />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground delay-200" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about the RAG system..."
                  className="flex-1 rounded-md border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  disabled={isLoading}
                />
                <Button onClick={handleSend} disabled={isLoading || !input.trim()} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Try asking about: <strong>architecture</strong>, <strong>features</strong>,{' '}
                <strong>RAG</strong>, <strong>tech stack</strong>, or <strong>API</strong>
              </p>
            </div>
          </div>

          {/* Demo Notice */}
          <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-3">
            <p className="text-xs text-muted-foreground">
              <strong>Note:</strong> This is a frontend demo with mock responses. The production
              version integrates with real LLM APIs and supports streaming, document upload, and
              advanced RAG features.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
