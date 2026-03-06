import { VercelRequest, VercelResponse } from '@vercel/node';

// TypeScript types
interface Tournament {
  id: number;
  name: string;
  status: 'planning' | 'ongoing' | 'completed';
  created_at: string;
  registrations_open: boolean;
  max_participants: number;
  bracket?: any;
}

interface TournamentRequest {
  action:
    | 'list'
    | 'create'
    | 'register'
    | 'get-bracket'
    | 'generate-bracket';
  name?: string;
  tournament_id?: number;
  player_id?: number;
  max_participants?: number;
}

interface ApiResponse<T> {
  success?: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Mock database
const tournamentsDB: Tournament[] = [
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
];

// Mock registrations
const registrationsDB: any[] = [];

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    // GET /api/tournaments - List all tournaments
    return res.status(200).json({
      success: true,
      data: tournamentsDB
    } as ApiResponse<Tournament[]>);
  }

  if (req.method === 'POST') {
    const { action, ...body } = req.body as TournamentRequest;

    switch (action) {
      case 'list':
        return res.status(200).json({
          success: true,
          data: tournamentsDB
        } as ApiResponse<Tournament[]>);

      case 'create':
        return handleCreateTournament(res, body);

      case 'register':
        return handleTournamentRegistration(res, body);

      case 'get-bracket':
        return handleGetBracket(res, body);

      case 'generate-bracket':
        return handleGenerateBracket(res, body);

      default:
        return res.status(400).json({
          error: 'Invalid action',
          availableActions: [
            'list',
            'create',
            'register',
            'get-bracket',
            'generate-bracket'
          ]
        });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}

function handleCreateTournament(
  res: VercelResponse,
  body: TournamentRequest
): VercelResponse {
  const { name, max_participants } = body;

  if (!name) {
    return res.status(400).json({ error: 'Tournament name is required' });
  }

  const newTournament: Tournament = {
    id: tournamentsDB.length + 1,
    name,
    status: 'planning',
    created_at: new Date().toISOString(),
    registrations_open: true,
    max_participants: max_participants || 64
  };

  tournamentsDB.push(newTournament);

  return res.status(201).json({
    success: true,
    data: newTournament,
    message: 'Tournament created successfully'
  } as ApiResponse<Tournament>);
}

function handleTournamentRegistration(
  res: VercelResponse,
  body: TournamentRequest
): VercelResponse {
  const { tournament_id, player_id } = body;

  if (!tournament_id || !player_id) {
    return res.status(400).json({
      error: 'Tournament ID and player ID are required'
    });
  }

  const tournament = tournamentsDB.find(t => t.id === tournament_id);
  if (!tournament) {
    return res.status(404).json({ error: 'Tournament not found' });
  }

  if (!tournament.registrations_open) {
    return res.status(400).json({
      error: 'Registrations are not open for this tournament'
    });
  }

  const registration = {
    id: registrationsDB.length + 1,
    tournament_id,
    player_id,
    status: 'registered',
    registered_at: new Date().toISOString()
  };

  registrationsDB.push(registration);

  return res.status(201).json({
    success: true,
    data: registration,
    message: `Player ${player_id} registered for tournament ${tournament_id}`
  });
}

function handleGetBracket(
  res: VercelResponse,
  body: TournamentRequest
): VercelResponse {
  const { tournament_id } = body;

  if (!tournament_id) {
    return res.status(400).json({ error: 'Tournament ID is required' });
  }

  const tournament = tournamentsDB.find(t => t.id === tournament_id);
  if (!tournament) {
    return res.status(404).json({ error: 'Tournament not found' });
  }

  return res.status(200).json({
    success: true,
    data: {
      tournament_id,
      bracket: {
        round_1: [
          {
            match_id: 1,
            player_1: 'John Doe',
            player_2: 'Jane Smith',
            winner: null
          }
        ]
      }
    }
  });
}

function handleGenerateBracket(
  res: VercelResponse,
  body: TournamentRequest
): VercelResponse {
  const { tournament_id } = body;

  if (!tournament_id) {
    return res.status(400).json({ error: 'Tournament ID is required' });
  }

  const tournament = tournamentsDB.find(t => t.id === tournament_id);
  if (!tournament) {
    return res.status(404).json({ error: 'Tournament not found' });
  }

  tournament.bracket = {
    generated_at: new Date().toISOString(),
    rounds: 3
  };

  return res.status(200).json({
    success: true,
    data: {
      tournament_id,
      bracket_id: Math.floor(Math.random() * 10000),
      message: `Bracket generated for tournament ${tournament_id}`
    }
  });
}
