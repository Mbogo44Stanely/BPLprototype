import { VercelRequest, VercelResponse } from '@vercel/node';

// TypeScript types for auth requests
interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  full_name: string;
  email: string;
  password: string;
  role: 'player' | 'referee' | 'club_manager' | 'coach' | 'admin';
  phone?: string;
}

interface AuthResponse {
  success: boolean;
  user?: {
    id: number;
    email: string;
    fullName: string;
    role: string;
  };
  message?: string;
  error?: string;
}

// In-memory user storage (replace with real database in production)
const usersDB: any[] = [
  {
    user_id: 1,
    full_name: 'Super Admin',
    email: 'admin@badminton.ke',
    password: 'admin123',
    status: 'active',
    phone: '+254700000001',
    roles: [
      {
        id: 1,
        role_name: 'super_admin',
        status: 'approved',
        scope_type: 'national',
        scope_id: null,
        permissions: ['view_dashboard', 'manage_users', 'manage_roles_permissions']
      }
    ]
  },
  {
    user_id: 2,
    full_name: 'Test Player',
    email: 'player@badminton.ke',
    password: 'player123',
    status: 'active',
    phone: '+254700000002',
    roles: [
      {
        id: 2,
        role_name: 'player',
        status: 'approved',
        scope_type: 'national',
        scope_id: null,
        permissions: ['view_profile', 'edit_profile', 'view_tournaments']
      }
    ]
  },
  {
    user_id: 3,
    full_name: 'Test Referee',
    email: 'referee@badminton.ke',
    password: 'ref123',
    status: 'active',
    phone: '+254700000003',
    roles: [
      {
        id: 3,
        role_name: 'referee',
        status: 'approved',
        scope_type: 'national',
        scope_id: null,
        permissions: ['view_certification', 'view_assigned_matches', 'score_matches']
      }
    ]
  }
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const { action, email, password, full_name, role, phone } = req.body;

  // Route based on action
  switch (action) {
    case 'login':
      return handleLogin(res, { email, password } as LoginRequest);

    case 'register':
      return handleRegister(res, {
        full_name,
        email,
        password,
        role,
        phone
      } as RegisterRequest);

    default:
      return res.status(400).json({
        error: 'Invalid action',
        availableActions: ['login', 'register']
      });
  }
}

function handleLogin(
  res: VercelResponse,
  body: LoginRequest
): VercelResponse {
  const { email, password } = body;

  if (!email || !password) {
    return res.status(400).json({
      error: 'Email and password are required'
    });
  }

  const user = usersDB.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({
      error: 'Invalid email or password'
    });
  }

  return res.status(200).json({
    success: true,
    user: {
      user_id: user.user_id,
      full_name: user.full_name,
      email: user.email,
      status: user.status,
      phone: user.phone,
      roles: user.roles || []
    }
  });
}

function handleRegister(
  res: VercelResponse,
  body: RegisterRequest
): VercelResponse {
  const { full_name, email, password, role, phone } = body;

  // Validation
  if (!email || !password || !full_name) {
    return res.status(400).json({
      error: 'Full name, email, and password are required'
    });
  }

  if (email.length < 5) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (password.length < 6) {
    return res.status(400).json({
      error: 'Password must be at least 6 characters'
    });
  }

  // Check if email already exists
  const existingUser = usersDB.find(u => u.email === email);
  if (existingUser) {
    return res.status(409).json({ error: 'Email already registered' });
  }

  // Create new user
  const newUser = {
    id: usersDB.length + 1,
    full_name,
    email,
    password,
    role: role || 'player',
    phone: phone || '',
    status: 'pending',
    created_at: new Date().toISOString()
  };

  usersDB.push(newUser);

  return res.status(201).json({
    success: true,
    message: 'Registration successful! Please wait for admin approval.',
    user: {
      id: newUser.id,
      email: newUser.email,
      fullName: newUser.full_name,
      role: newUser.role
    }
  } as AuthResponse);
}
