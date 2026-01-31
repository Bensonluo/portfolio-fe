// API configuration for RAG Chatbot
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Clean up the base URL (remove trailing slash if present)
// This prevents double-slash URLs like "//api/v1/chat"
const cleanBaseUrl = API_BASE_URL.replace(/\/+$/, '');

export const API_ENDPOINTS = {
  // Authentication (optional in demo mode)
  LOGIN: `${cleanBaseUrl}/api/v1/auth/login`,
  REGISTER: `${cleanBaseUrl}/api/v1/auth/register`,
  REFRESH: `${cleanBaseUrl}/api/v1/auth/refres`,

  // Chat
  CHAT: `${cleanBaseUrl}/api/v1/chat`,
  CHAT_STREAM: `${cleanBaseUrl}/api/v1/chat/stream`,

  // Sessions
  SESSIONS: `${cleanBaseUrl}/api/v1/sessions`,
  SESSION_DETAIL: (id: number) => `${cleanBaseUrl}/api/v1/sessions/${id}`,
  SESSION_MESSAGES: (id: number) => `${cleanBaseUrl}/api/v1/sessions/${id}/messages`,

  // Documents
  UPLOAD_DOCUMENT: `${cleanBaseUrl}/api/v1/documents/upload`,
  SEARCH_DOCUMENTS: `${cleanBaseUrl}/api/v1/documents/search`,

  // Health
  HEALTH: `${cleanBaseUrl}/health`,
} as const;

// API client helper functions
export class ApiClient {
  private static getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add auth token if available (demo mode: token is optional)
    const token = localStorage.getItem('access_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  // Generic request method
  private static async request<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return response.json() as Promise<T>;
  }

  // POST request
  static async post<T>(
    url: string,
    data: Record<string, unknown>
  ): Promise<T> {
    return this.request<T>(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // GET request
  static async get<T>(url: string): Promise<T> {
    return this.request<T>(url, {
      method: 'GET',
    });
  }

  // DELETE request
  static async delete<T>(url: string): Promise<T> {
    return this.request<T>(url, {
      method: 'DELETE',
    });
  }

  // Non-streaming chat
  static async chat(message: string, sessionId: number = 1): Promise<ChatResponse> {
    return this.post<ChatResponse>(API_ENDPOINTS.CHAT, {
      message,
      session_id: sessionId,
    });
  }

  // Streaming chat using Server-Sent Events
  static async *streamChat(message: string, sessionId: number = 1): AsyncGenerator<string, void, unknown> {
    const response = await fetch(API_ENDPOINTS.CHAT_STREAM, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ message, session_id: sessionId }),
    });

    if (!response.ok) {
      throw new Error(`Chat API Error: ${response.status} ${response.statusText}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('Response body is not readable');
    }

    const decoder = new TextDecoder();
    let buffer = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // Process SSE format: data: <content>\n\n
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // Keep incomplete line in buffer

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6); // Remove 'data: ' prefix
            if (data.trim() === '[DONE]') {
              return; // End of stream
            }
            yield data;
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }

  // Health check
  static async healthCheck(): Promise<{ status: string; version?: string }> {
    return this.get<{ status: string; version?: string }>(API_ENDPOINTS.HEALTH);
  }

  // Get sessions list
  static async getSessions(limit: number = 10): Promise<SessionsResponse> {
    return this.get<SessionsResponse>(`${API_ENDPOINTS.SESSIONS}?limit=${limit}`);
  }

  // Get session messages
  static async getSessionMessages(sessionId: number, limit: number = 50): Promise<MessagesResponse> {
    return this.get<MessagesResponse>(`${API_ENDPOINTS.SESSION_MESSAGES(sessionId)}?limit=${limit}`);
  }

  // Create new session
  static async createSession(title: string = 'New Chat'): Promise<SessionResponse> {
    return this.post<SessionResponse>(API_ENDPOINTS.SESSIONS, { title });
  }

  // Delete session
  static async deleteSession(sessionId: number): Promise<void> {
    return this.delete<void>(API_ENDPOINTS.SESSION_DETAIL(sessionId));
  }
}

// API Types matching backend response format
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: string;
}

export interface ChatRequest {
  message: string;
  session_id: number;  // Required, defaults to 1 (demo session)
}

export interface ChatResponse {
  response: string;
  session_id: number;
  intent: string;
  sources?: string[];
  metadata?: {
    confidence?: number;
    tokens_used?: number;
  };
  timestamp: string;
}

export interface Session {
  id: number;
  title: string;
  memory_type: string;
  context_window: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SessionsResponse {
  sessions: Session[];
  total: number;
}

export interface MessagesResponse {
  messages: ChatMessage[];
  total: number;
  session_id: number;
}

export interface SessionResponse {
  session: Session;
}

export interface AuthRequest {
  email: string;
  password: string;
  full_name?: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

export interface User {
  id: number;
  email: string;
  full_name: string;
  is_active: boolean;
  is_admin: boolean;
  created_at: string;
}
