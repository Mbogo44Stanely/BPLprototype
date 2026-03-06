import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const userId = req.query.userId || '1';

  if (req.method === 'GET') {
    // Return mock profile data
    return res.status(200).json({
      id: userId,
      full_name: 'John Doe',
      email: 'john@badminton.ke',
      phone: '+254712345678',
      status: 'active',
      profile_data: {
        bio: 'Badminton player from Nairobi',
        club: 'Nairobi Badminton Club',
        ranking: 1250
      },
      created_at: '2024-01-15'
    });
  }

  if (req.method === 'PUT') {
    const { full_name, phone, profile_data } = req.body;
    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: userId,
        full_name: full_name || 'John Doe',
        phone: phone || '+254712345678',
        profile_data: profile_data || {}
      }
    });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
