import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    const { id } = req.query;

    // Return mock bracket data
    return res.status(200).json({
      tournament_id: id,
      bracket: {
        round_1: [
          { match_id: 1, player_1: 'John Doe', player_2: 'Jane Smith', winner: null },
          { match_id: 2, player_1: 'Tom Brown', player_2: 'Lisa Johnson', winner: null }
        ]
      },
      status: 'active'
    });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
