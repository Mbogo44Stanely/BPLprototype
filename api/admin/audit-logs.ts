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
    // Return mock admin audit logs
    return res.status(200).json([
      {
        id: 1,
        user_id: 1,
        full_name: 'Admin User',
        entity_type: 'User',
        entity_id: 5,
        action: 'USER_REGISTERED',
        details: { role: 'player' },
        timestamp: '2024-03-01T10:00:00Z'
      }
    ]);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
