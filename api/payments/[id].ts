import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { id } = req.query;

  if (req.method === 'GET') {
    return res.status(200).json({
      id: id,
      amount: 2500,
      currency: 'KES',
      status: 'completed',
      payment_method: 'M-Pesa',
      created_at: '2024-03-01T10:30:00Z',
      completed_at: '2024-03-01T10:32:00Z'
    });
  }

  if (req.method === 'POST') {
    // Simulate payment success
    return res.status(200).json({
      success: true,
      message: 'Payment simulation successful',
      payment_id: id,
      status: 'completed'
    });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
