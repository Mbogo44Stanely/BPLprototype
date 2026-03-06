import { VercelRequest, VercelResponse } from '@vercel/node';

// TypeScript types
interface UserProfile {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  status: string;
  profile_data: Record<string, any>;
}

interface ProfileRequest {
  action: 'get' | 'update';
  user_id?: number;
  full_name?: string;
  phone?: string;
  profile_data?: Record<string, any>;
}

interface ApiResponse<T> {
  success?: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Mock database
const profilesDB: Record<number, UserProfile> = {
  1: {
    id: 1,
    full_name: 'Super Admin',
    email: 'admin@badminton.ke',
    phone: '+254712345678',
    status: 'active',
    profile_data: { role: 'admin' }
  },
  2: {
    id: 2,
    full_name: 'John Doe',
    email: 'john@badminton.ke',
    phone: '+254712345678',
    status: 'active',
    profile_data: {
      bio: 'Badminton player from Nairobi',
      club: 'Nairobi Badminton Club',
      ranking: 1250
    }
  }
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // GET /api/profile?user_id=1
  if (req.method === 'GET') {
    const userId = req.query.user_id
      ? Number(req.query.user_id)
      : Number(req.headers['x-user-id']);

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const profile = profilesDB[userId];
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    return res.status(200).json({
      success: true,
      data: profile
    } as ApiResponse<UserProfile>);
  }

  // PUT or POST /api/profile
  if (req.method === 'PUT' || req.method === 'POST') {
    const { action, user_id, ...body } = req.body as ProfileRequest;

    switch (action) {
      case 'get':
        return handleGetProfile(res, user_id);

      case 'update':
        return handleUpdateProfile(res, user_id, body);

      default:
        return res.status(400).json({
          error: 'Invalid action',
          availableActions: ['get', 'update']
        });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}

function handleGetProfile(
  res: VercelResponse,
  userId?: number
): VercelResponse {
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  const profile = profilesDB[userId];
  if (!profile) {
    return res.status(404).json({ error: 'Profile not found' });
  }

  return res.status(200).json({
    success: true,
    data: profile
  } as ApiResponse<UserProfile>);
}

function handleUpdateProfile(
  res: VercelResponse,
  userId: number | undefined,
  body: Partial<ProfileRequest>
): VercelResponse {
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  if (!profilesDB[userId]) {
    return res.status(404).json({ error: 'Profile not found' });
  }

  const { full_name, phone, profile_data } = body;

  // Update profile fields
  if (full_name) profilesDB[userId].full_name = full_name;
  if (phone) profilesDB[userId].phone = phone;
  if (profile_data) profilesDB[userId].profile_data = profile_data;

  return res.status(200).json({
    success: true,
    data: profilesDB[userId],
    message: 'Profile updated successfully'
  } as ApiResponse<UserProfile>);
}
