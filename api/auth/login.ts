import { VercelRequest, VercelResponse } from '@vercel/node';

// Simple in-memory storage for demo purposes
// In production, use a database like MongoDB, PostgreSQL, etc.
let usersDB: any[] = [];

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email and password are required' 
      });
    }

    // For demo: validate against test credentials
    // In production, query your database
    const testUsers = [
      { id: 1, email: 'admin@badminton.ke', password: 'admin123', fullName: 'Super Admin' },
      { id: 2, email: 'player@badminton.ke', password: 'player123', fullName: 'Test Player' },
      { id: 3, email: 'referee@badminton.ke', password: 'ref123', fullName: 'Test Referee' },
    ];

    const user = testUsers.find(u => u.email === email && u.password === password);

    if (!user) {
      return res.status(401).json({ 
        error: 'Invalid email or password' 
      });
    }

    // Return user data (don't include password)
    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      }
    });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
