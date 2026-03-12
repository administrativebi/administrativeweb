import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { supabase } from '@/lib/supabaseClient';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { sessionId, message } = await req.json();

    if (!process.env.GOOGLE_GEMINI_API_KEY) {
      return NextResponse.json({ error: "Configuração de API ausente" }, { status: 500 });
    }

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID ausente" }, { status: 400 });
    }

    console.log(`[Chat] Processing message for session: ${sessionId}`);

    // 1. Salva a mensagem do usuário
    const { error: insertError } = await supabase
      .from('web_chat_messages')
      .insert([{ session_id: sessionId, role: 'user', content: message }]);

    if (insertError) {
      console.error("[Chat] Error inserting user message:", insertError);
    }

    // 2. Recupera a sessão e o diagnóstico separadamente para evitar falhas de JOIN
    const { data: session, error: sessionError } = await supabase
      .from('web_chat_sessions')
      .select('*')
      .eq('id', sessionId)
      .single();

    if (sessionError || !session) {
      console.error("[Chat] Session not found:", sessionError);
      return NextResponse.json({ error: "Sessão não encontrada" }, { status: 404 });
    }

    const { data: diag, error: diagError } = await supabase
      .from('web_ier_diagnostics')
      .select('*')
      .eq('id', session.diagnostic_id)
      .single();

    if (diagError || !diag) {
      console.error("[Chat] Diagnostic context not found:", diagError);
    }

    // 3. Recupera o histórico do chat
    const { data: messages, error: messagesError } = await supabase
      .from('web_chat_messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (messagesError) {
      console.error("[Chat] Error fetching history:", messagesError);
    }

    // 4. Configura as Instruções de Sistema
    const systemInstruction = `Você é o Administrative Brain, um estrategista silencioso e especialista em performance operacional para restaurantes.
Seu objetivo NÃO é vender. Seu objetivo é despertar a consciência do dono do restaurante sobre controle, margem, processos e liderança baseada em dados, através de perguntas inteligentes e observações pontuais.

DIRETRIZES DE PERSONALIDADE:
1. Tom: Humano, empático, curioso, inteligente e analítico.
2. Abordagem: Você observa, faz perguntas instigantes e revela padrões invisíveis. Nunca critique o restaurante, nunca julgue o dono.
3. Venda: NUNCA oferte serviços, nunca pareça um vendedor.

ESTRUTURA DA CONVERSA:
- Aja como se estivesse conversando no WhatsApp.
- Mantenha respostas curtas (máximo 2 parágrafos).
- Termine sempre sua fala devolvendo a condução da reflexão para o usuário na forma de uma pergunta.

DADOS DA OPERAÇÃO:
Restaurante: ${diag?.restaurant_name || 'Não informado'} em ${diag?.restaurant_city || 'Não informado'}
Score IER: ${diag?.score_total || 'N/A'}/100 (Classificação: ${diag?.classification || 'N/A'})`;

    // 5. Formata o histórico corretamente para o Gemini
    // O histórico deve ser uma sequência alternada de 'user' e 'model'
    // IMPORTANTE: O 'startChat' não deve incluir a última mensagem (que será enviada no 'sendMessage')
    const formattedHistory = (messages || [])
      .slice(0, -1) // Remove a última mensagem que acabou de ser inserida
      .map(msg => ({
        role: msg.role === 'ai' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

    // 6. Inicializa o Modelo e o Chat
    const modelName = "gemini-3-flash-preview"; 
    const model = genAI.getGenerativeModel({ 
      model: modelName,
      systemInstruction: {
        role: "system",
        parts: [{ text: systemInstruction }]
      }
    });

    const chat = model.startChat({
      history: formattedHistory,
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    // 7. Salva a resposta da IA
    await supabase
      .from('web_chat_messages')
      .insert([{ session_id: sessionId, role: 'ai', content: text }]);

    return NextResponse.json({ text });

  } catch (error: any) {
    console.error("[Chat] Fatal Error:", error);
    return NextResponse.json({ 
      error: "Erro ao processar consulta de IA", 
      details: error.message || "Unknown error" 
    }, { status: 500 });
  }
}
