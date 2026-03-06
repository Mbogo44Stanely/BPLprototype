import { VercelRequest, VercelResponse } from '@vercel/node';

// TypeScript types
interface Match {
  id: number;
  tournament_id: number;
  player_1: string;
  player_2: string;
  winner?: string;
  status: 'pending' | 'completed';
}

interface MatchRequest {
  action: 'get' | 'complete';
  match_id?: number;
  tournament_id?: number;
  winner?: string;
}

interface ApiResponse<T> {
  success?: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Mock database
const matchesDB: Record<number, Match> = {
  1: {
    id: 1,
    tournament_id: 1,
    player_1: 'John Doe',
    player_2: 'Jane Smith',
    status: 'pending'
  },
  2: {
    id: 2,
    tournament_id: 1,
    player_1: 'Tom Brown',
    player_2: 'Lisa Johnson',
    status: 'pending'
  }
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const { action, ...body } = req.body as MatchRequest;

    switch (action) {
      case 'get':
        return handleGetMatch(res, body);

      case 'complete':
        return handleCompleteMatch(res, body);

      default:
        return res.status(400).json({
          error: 'Invalid action',
          availableActions: ['get', 'complete']
        });
    }
  }

  if (req.method === 'GET') {
    const matchId = req.query.match_id
      ? Number(req.query.match_id)
      : undefined;

    if (!matchId) {
      return res.status(400).json({ error: 'Match ID is required' });
    }

    const match = matchesDB[matchId];
    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }

    return res.status(200).json({
      success: true,
      data: match
    } as ApiResponse<Match>);
  }

  res.status(405).json({ error: 'Method not allowed' });
}

function handleGetMatch(
  res: VercelResponse,
  body: MatchRequest
): VercelResponse {
  const { match_id } = body;

  if (!match_id) {
    return res.status(400).json({ error: 'Match ID is required' });
  }

  const match = matchesDB[match_id];
  if (!match) {
    return res.status(404).json({ error: 'Match not found' });
  }

  return res.status(200).json({
    success: true,
    data: match
  } as ApiResponse<Match>);
}

function handleCompleteMatch(
  res: VercelResponse,
  body: MatchRequest
): VercelResponse {
  const { match_id, winner } = body;

  if (!match_id) {
    return res.status(400).json({ error: 'Match ID is required' });
  }

  if (!winner) {
    return res.status(400).json({ error: 'Winner name is required' });
  }

  const match = matchesDB[match_id];
  if (!match) {
    return res.status(404).json({ error: 'Match not found' });
  }

  match.winner = winner;
  match.status = 'completed';

  return res.status(200).json({
    success: true,
    data: match,
    message: `Match ${match_id} completed with winner: ${winner}`
  } as ApiResponse<Match>);
}
