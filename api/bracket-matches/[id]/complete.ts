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

    return res.status(200).json({
      success: true,
      message: `Match ${id} marked as completed`,
      match_id: id,
      status: 'completed'
    });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
