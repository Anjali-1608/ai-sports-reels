import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function generateScript(celebrity: string): Promise<string> {
  const prompt = `Write a short, engaging 60-second video script summarizing the sports journey and achievements of ${celebrity}. Focus on major highlights, achievements, and end with a catchy closing line.`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 300,
    temperature: 0.7,
  });

  const script = response.choices[0]?.message?.content?.trim();
  return script || "No script generated.";
}
