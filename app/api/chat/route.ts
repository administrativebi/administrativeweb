import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    console.log("AI Chat Request received:", { messageLength: message?.length });

    if (!process.env.GOOGLE_GEMINI_API_KEY) {
      console.error("GOOGLE_GEMINI_API_KEY is not defined in environment variables");
      return NextResponse.json({ error: "Configuração de API ausente" }, { status: 500 });
    }

    // 1. Ler o arquivo de conhecimento (Cérebro)
    let knowledgeBase = "";
    try {
      const knowledgePath = path.join(process.cwd(), "md/ai_knowledge.md");
      if (fs.existsSync(knowledgePath)) {
        knowledgeBase = fs.readFileSync(knowledgePath, "utf8");
      }
    } catch (fsError) {
      console.error("Error reading knowledge base:", fsError);
    }

    // 2. Configurar o Modelo gemini-3-flash-preview
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const prompt = `
      Você é o Engenheiro de Eficiência Chefe da Administrative. 
      Realize uma análise técnica baseada no conhecimento da empresa e nos dados fornecidos.
      
      CONHECIMENTO BASE DA EMPRESA:
      ${knowledgeBase || "Administrative PaaS: Foco em Margem e Estados de Eficiência."}
      
      DADOS/MENSAGEM:
      ${message}
      
      Responda em tom autoritário, industrial e focado em performance. Use Markdown e negritos. 
      Sempre provoque reflexão estratégica sobre o impacto financeiro da ineficiência operacional.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("AI Chat Full Error:", error);
    return NextResponse.json({ 
      error: "Erro ao processar consulta de IA", 
      details: error.message || "Unknown error" 
    }, { status: 500 });
  }
}
