import React, { useEffect, useMemo, useState } from 'react';
import { sendCoachMessage, type ChatMessage } from '../../api/lib/aiCoachClient';

const STORAGE_KEY = 'moneyflow.ai.coach.history';

export default function AICoachScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setMessages(JSON.parse(raw));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);

  async function onSend() {
    if (!canSend) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input.trim(),
      createdAt: new Date().toISOString(),
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const { reply } = await sendCoachMessage(nextMessages.map(({ role, content }) => ({ role, content })));
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: reply,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <h1>AI Financial Coach</h1>
      <p>Asesor financiero en español con contexto XAF (Guinea Ecuatorial).</p>

      <div style={{ flex: 1, overflowY: 'auto', padding: 12, border: '1px solid #ddd', borderRadius: 8 }}>
        {messages.map((m) => (
          <div key={m.id} style={{ textAlign: m.role === 'user' ? 'right' : 'left', marginBottom: 10 }}>
            <span
              style={{
                display: 'inline-block',
                maxWidth: '80%',
                padding: '10px 12px',
                borderRadius: 16,
                background: m.role === 'user' ? '#DCF8C6' : '#F1F0F0',
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
        {loading && <div style={{ color: '#888' }}>MoneyFlow AI está escribiendo...</div>}
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu pregunta financiera..."
          style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid #ccc' }}
        />
        <button disabled={!canSend} onClick={onSend}>
          Enviar
        </button>
      </div>
    </div>
  );
}
