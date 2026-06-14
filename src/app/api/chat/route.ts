import { NextRequest, NextResponse } from "next/server";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_API_KEY = process.env.GROQ_API_KEY!;

const SYSTEM_PROMPT = `You are AXIOM Intelligence, an expert AI assistant specializing in finance, quantitative analysis, data science, and capital markets. You were built by the AXIOM platform — a cutting-edge finance and data science research system.

Provide precise, expert-level answers. Use specific numbers, formulas, and real-world examples where relevant. Structure longer answers with clear sections. When discussing mathematical concepts, write formulas in a readable format. Be direct, confident, and substantive — never vague or generic.

Areas of expertise:
- Quantitative finance & algorithmic trading
- Portfolio theory & risk management (VaR, CVaR, Sharpe ratio)
- Financial econometrics (GARCH, cointegration, factor models)
- Machine learning for finance (time series forecasting, NLP for markets)
- Derivatives pricing & structured products
- Macroeconomics & monetary policy analysis
- Data science methods (regression, classification, clustering, deep learning)
- Statistical testing & experimental design`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
    }

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Groq API error:", err);
      return NextResponse.json({ error: "Groq API request failed" }, { status: response.status });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content ?? "";

    return NextResponse.json({ content });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
