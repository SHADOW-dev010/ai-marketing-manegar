import { useAppStore } from '../store/useAppStore'

const API_BASE = 'http://localhost:8765'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const apiKey = useAppStore.getState().apiKey
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(apiKey ? { 'X-Api-Key': apiKey } : {}),
    },
    ...options,
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(err)
  }
  return res.json()
}

export const api = {
  // Content Generation
  generateContent: (data: { prompt: string; type: string; tone?: string }) =>
    request<{ content: string }>('/api/generate-content', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Image Generation
  generateImage: (data: { prompt: string; style?: string }) =>
    request<{ url: string }>('/api/generate-image', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Sentiment Analysis
  analyzeSentiment: (data: { text: string }) =>
    request<{ sentiment: string; score: number }>('/api/analyze-sentiment', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // AI Assistant
  chat: (data: { message: string; history?: { role: string; content: string }[] }) =>
    request<{ reply: string }>('/api/chat', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Health check
  health: () => request<{ status: string }>('/api/health'),
}
