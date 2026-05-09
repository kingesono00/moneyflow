export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
};

export async function sendCoachMessage(messages: Array<Pick<ChatMessage, 'role' | 'content'>>) {
  const response = await fetch('/api/ai-coach', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Failed to send message');
  }

  return response.json() as Promise<{ reply: string }>;
}
