import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    // Return mock tournament data
    return res.status(200).json([
      {
        id: 1,
        name: 'National Championship 2024',
        status: 'ongoing',
        created_at: '2024-01-15',
        registrations_open: true,
        max_participants: 128
      },
      {
        id: 2,
        name: 'County League Tables',
        status: 'planning',
        created_at: '2024-02-01',
        registrations_open: false,
        max_participants: 64
      }
    ]);
  }

  if (req.method === 'POST') {
    return res.status(201).json({
      success: true,
      message: 'Tournament created',
      id: 3
    });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
