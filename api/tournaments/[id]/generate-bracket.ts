import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const { id } = req.query;

    // Simulate bracket generation
    return res.status(200).json({
      success: true,
      message: `Bracket generated for tournament ${id}`,
      bracket_id: Math.floor(Math.random() * 10000),
      generated_at: new Date().toISOString()
    });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
