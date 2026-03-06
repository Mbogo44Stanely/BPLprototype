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
    const { full_name, email, password, role, phone } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email and password are required' 
      });
    }

    if (email.length < 5) {
      return res.status(400).json({ 
        error: 'Invalid email format' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        error: 'Password must be at least 6 characters' 
      });
    }

    // Check if user already exists (simulate database check)
    const existingUser = usersDB.find(u => u.email === email);
    if (existingUser) {
      return res.status(409).json({ 
        error: 'Email already registered' 
      });
    }

    // Create new user (in production, save to database)
    const newUser = {
      id: usersDB.length + 1,
      full_name: full_name || email.split('@')[0],
      email,
      password, // In production: hash this with bcrypt!
      role: role || 'player',
      phone: phone || '',
      status: 'pending',
      created_at: new Date().toISOString()
    };

    usersDB.push(newUser);

    return res.status(201).json({
      success: true,
      message: 'Registration successful! Please wait for admin approval.',
      userId: newUser.id,
      user: {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.full_name,
        role: newUser.role
      }
    });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
