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
    // Return mock player data
    return res.status(200).json([
      {
        id: 1,
        user_id: 2,
        full_name: 'John Doe',
        email: 'john@example.com',
        club_id: 1,
        date_of_birth: '1995-05-15',
        gender: 'M',
        ranking_points: 1250,
        status: 'active'
      },
      {
        id: 2,
        user_id: 3,
        full_name: 'Jane Smith',
        email: 'jane@example.com',
        club_id: 1,
        date_of_birth: '1998-08-22',
        gender: 'F',
        ranking_points: 980,
        status: 'active'
      }
    ]);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
