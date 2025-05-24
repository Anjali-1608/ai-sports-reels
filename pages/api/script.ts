import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // List and log available models
    const models = await openai.models.list();
    console.log('Available models:', models.data.map(m => m.id));  // Logs model IDs like 'gpt-3.5-turbo', etc.

    // Your existing logic here
    const celebrity = req.query.celebrity;
    if (!celebrity || typeof celebrity !== 'string') {
      return res.status(400).json({ error: 'Missing celebrity query param' });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // use accessible model
      messages: [{ role: 'user', content: `Write a short script about ${celebrity}` }],
    });

    res.status(200).json({ script: completion.choices[0].message?.content });
  } catch (error) {
    console.error('OpenAI error:', error);
    res.status(500).json({ error: 'Failed to generate script' });
  }
}
