const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not configured.');
}

export type CoachMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export type CoachRequest = {
  messages: CoachMessage[];
};

const SYSTEM_INSTRUCTIONS = `Eres MoneyFlow AI Coach, un asesor financiero personal para principiantes en Guinea Ecuatorial.

Reglas:
- Responde siempre en español, tono simple, amable y práctico.
- Usa contexto de moneda XAF (franco CFA de África Central) para ejemplos.
- Ayuda con presupuestos, análisis de gastos, ahorro, alertas de sobre-gasto y educación financiera.
- Evita lenguaje técnico complejo. Explica paso a paso.
- Si faltan datos, haz preguntas cortas para aclarar.`;

const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

function toGeminiContents(messages: CoachMessage[]) {
  return messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));
}

export async function askFinancialCoach({ messages }: CoachRequest): Promise<string> {
  if (!messages?.length) {
    throw new Error('At least one message is required.');
  }

  const response = await fetch(`${GEMINI_API_URL}?key=${encodeURIComponent(GEMINI_API_KEY as string)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      systemInstruction: {
        role: 'system',
        parts: [{ text: SYSTEM_INSTRUCTIONS }],
      },
      contents: toGeminiContents(messages),
      generationConfig: {
        temperature: 0.6,
        topP: 0.9,
        maxOutputTokens: 700,
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errorBody}`);
  }

  const data = await response.json();
  return (
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    'No pude generar una respuesta ahora mismo. Intenta de nuevo en unos segundos.'
  );
}

export const examplePrompts = {
  presupuesto: 'Gano 250.000 XAF al mes. ¿Cómo hago un presupuesto básico para comida, transporte y ahorro?',
  gastos: 'Estos son mis gastos semanales: 15.000 XAF comida, 8.000 XAF transporte, 12.000 XAF ocio. ¿Qué puedo mejorar?',
  ahorro: 'Quiero ahorrar 300.000 XAF en 6 meses. ¿Qué plan simple me recomiendas?',
  alerta: 'Este mes ya gasté 80% de mi salario y faltan 10 días. ¿Qué hago para no sobrepasarme?',
};
