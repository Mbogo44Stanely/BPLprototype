import { VercelRequest, VercelResponse } from '@vercel/node';

// TypeScript types
interface PlayerRequest {
  action: 'list' | 'create';
  full_name?: string;
  email?: string;
  club_id?: number;
  ranking_points?: number;
}

interface Player {
  id: number;
  user_id: number;
  full_name: string;
  email: string;
  club_id?: number;
  ranking_points: number;
  status: string;
}

interface ApiResponse<T> {
  success?: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Mock database
const playersDB: Player[] = [
  {
    id: 1,
    user_id: 2,
    full_name: 'John Doe',
    email: 'john@example.com',
    club_id: 1,
    ranking_points: 1250,
    status: 'active'
  },
  {
    id: 2,
    user_id: 3,
    full_name: 'Jane Smith',
    email: 'jane@example.com',
    club_id: 1,
    ranking_points: 980,
    status: 'active'
  }
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    // GET /api/players - List all players
    return res.status(200).json({
      success: true,
      data: playersDB
    } as ApiResponse<Player[]>);
  }

  if (req.method === 'POST') {
    const { action, ...body } = req.body as PlayerRequest;

    switch (action) {
      case 'list':
        return res.status(200).json({
          success: true,
          data: playersDB
        } as ApiResponse<Player[]>);

      case 'create':
        return handleCreatePlayer(res, body);

      default:
        return res.status(400).json({
          error: 'Invalid action',
          availableActions: ['list', 'create']
        });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}

function handleCreatePlayer(
  res: VercelResponse,
  body: PlayerRequest
): VercelResponse {
  const { full_name, email, club_id } = body;

  if (!full_name || !email) {
    return res.status(400).json({
      error: 'Full name and email are required'
    });
  }

  const newPlayer: Player = {
    id: playersDB.length + 1,
    user_id: Math.floor(Math.random() * 1000),
    full_name,
    email,
    club_id,
    ranking_points: 0,
    status: 'active'
  };

  playersDB.push(newPlayer);

  return res.status(201).json({
    success: true,
    data: newPlayer,
    message: 'Player created successfully'
  } as ApiResponse<Player>);
}
