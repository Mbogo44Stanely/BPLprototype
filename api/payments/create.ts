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
    const { tournament_id, amount, player_id } = req.body;

    if (!tournament_id || !amount) {
      return res.status(400).json({
        error: 'Tournament ID and amount are required'
      });
    }

    // Create mock payment record
    const payment_id = Math.floor(Math.random() * 100000);
    
    return res.status(201).json({
      success: true,
      payment_id: payment_id,
      tournament_id: tournament_id,
      amount: amount,
      currency: 'KES',
      status: 'pending',
      created_at: new Date().toISOString(),
      payment_url: `https://payment.example.com/${payment_id}`
    });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
