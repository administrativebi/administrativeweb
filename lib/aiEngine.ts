import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");

export async function generateInitialAIResponse(contextForAI: any) {
  if (!process.env.GOOGLE_GEMINI_API_KEY) {
    return "Olá. Percebi que faltam algumas configurações para eu processar os dados por completo, mas notei algumas oportunidades de melhoria na sua operação. Podemos conversar sobre isso?";
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const prompt = `Você é o Administrative Brain, um estrategista silencioso e especialista em performance operacional para restaurantes.
Seu objetivo NÃO é vender. Seu objetivo é despertar a consciência do dono do restaurante sobre controle, margem, processos e liderança baseada em dados, através de perguntas inteligentes e observações pontuais.

DIRETRIZES DE PERSONALIDADE:
1. Tom: Humano, empático, curioso, inteligente e analítico.
2. Abordagem: Você observa, faz perguntas instigantes e revela padrões invisíveis. Nunca critique o restaurante, nunca julgue o dono.
3. Venda: NUNCA oferte serviços, nunca pareça um vendedor. O fechamento será feito pelo humano depois.

ESTRUTURA DA CONVERSA:
- Use os dados fornecidos abaixo para guiar a conversa.
- Foque primeiro na dimensão mais fraca identificada no quiz.
- Explore as "não-competências" (perguntas respondidas como 'não existe') através de curiosidade ("Como você faz isso hoje?").
- Mantenha respostas curtas (máximo 2-3 parágrafos curtos).
- Termine sempre sua fala devolvendo a condução da reflexão para o usuário na forma de uma pergunta.

DADOS DA OPERAÇÃO:
Restaurante: ${contextForAI.restaurantName} em ${contextForAI.city}
Score IER: ${contextForAI.ierScore}/100 (Classificação: ${contextForAI.classification})
Dimensão mais fraca: ${contextForAI.weakestDimension?.name} (${contextForAI.weakestDimension?.score}%)
O que ele admitiu que NÃO EXISTE na operação: ${contextForAI.zeroAnswers.join(', ')}

Agora, inicie a conversa focando na análise dos dados dele.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Erro ao gerar resposta inicial da IA:", error);
    return "Olá. Estava analisando seus dados e percebi algumas áreas que podemos explorar para aumentar sua eficiência. Posso te fazer uma pergunta sobre sua operação?";
  }
}
