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
    const { player_id } = req.body;

    if (!id || !player_id) {
      return res.status(400).json({
        error: 'Tournament ID and player ID are required'
      });
    }

    // Simulate tournament registration
    return res.status(201).json({
      success: true,
      message: `Player ${player_id} registered for tournament ${id}`,
      registration_id: Math.floor(Math.random() * 10000),
      tournament_id: id,
      player_id: player_id,
      status: 'registered',
      registered_at: new Date().toISOString()
    });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
