import { VercelRequest, VercelResponse } from '@vercel/node';

// TypeScript types
interface AuditLog {
  id: number;
  user_id: number;
  full_name: string;
  entity_type: string;
  action: string;
  details: Record<string, any>;
  timestamp: string;
}

interface AdminRequest {
  action: 'get-logs' | 'get-users' | 'approve-role' | 'revoke-role';
  log_id?: number;
  user_id?: number;
  role_id?: number;
  admin_id?: number;
}

interface ApiResponse<T> {
  success?: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Mock database
const auditLogsDB: AuditLog[] = [
  {
    id: 1,
    user_id: 1,
    full_name: 'Admin User',
    entity_type: 'User',
    action: 'USER_REGISTERED',
    details: { role: 'player' },
    timestamp: new Date().toISOString()
  },
  {
    id: 2,
    user_id: 1,
    full_name: 'Admin User',
    entity_type: 'Tournament',
    action: 'TOURNAMENT_CREATED',
    details: { tournament: 'National Championship 2024' },
    timestamp: new Date().toISOString()
  }
];

const usersDB: any[] = [
  {
    id: 1,
    full_name: 'Super Admin',
    email: 'admin@badminton.ke',
    status: 'active',
    role: 'admin'
  },
  {
    id: 2,
    full_name: 'John Doe',
    email: 'john@badminton.ke',
    status: 'pending',
    role: 'player'
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
    // GET /api/admin - Return audit logs
    return res.status(200).json({
      success: true,
      data: auditLogsDB
    } as ApiResponse<AuditLog[]>);
  }

  if (req.method === 'POST') {
    const { action, ...body } = req.body as AdminRequest;

    switch (action) {
      case 'get-logs':
        return handleGetLogs(res);

      case 'get-users':
        return handleGetUsers(res);

      case 'approve-role':
        return handleApproveRole(res, body);

      case 'revoke-role':
        return handleRevokeRole(res, body);

      default:
        return res.status(400).json({
          error: 'Invalid action',
          availableActions: ['get-logs', 'get-users', 'approve-role', 'revoke-role']
        });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}

function handleGetLogs(res: VercelResponse): VercelResponse {
  return res.status(200).json({
    success: true,
    data: auditLogsDB
  } as ApiResponse<AuditLog[]>);
}

function handleGetUsers(res: VercelResponse): VercelResponse {
  return res.status(200).json({
    success: true,
    data: usersDB
  });
}

function handleApproveRole(
  res: VercelResponse,
  body: AdminRequest
): VercelResponse {
  const { user_id, role_id, admin_id } = body;

  if (!user_id || !role_id || !admin_id) {
    return res.status(400).json({
      error: 'User ID, role ID, and admin ID are required'
    });
  }

  const user = usersDB.find(u => u.id === user_id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  user.status = 'active';

  // Log the action
  auditLogsDB.push({
    id: auditLogsDB.length + 1,
    user_id: admin_id,
    full_name: 'Admin User',
    entity_type: 'UserRole',
    action: 'ROLE_APPROVED',
    details: { user_id, role_id },
    timestamp: new Date().toISOString()
  });

  return res.status(200).json({
    success: true,
    data: user,
    message: `Role approved for user ${user_id}`
  });
}

function handleRevokeRole(
  res: VercelResponse,
  body: AdminRequest
): VercelResponse {
  const { user_id, admin_id } = body;

  if (!user_id || !admin_id) {
    return res.status(400).json({
      error: 'User ID and admin ID are required'
    });
  }

  const user = usersDB.find(u => u.id === user_id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  user.status = 'suspended';

  // Log the action
  auditLogsDB.push({
    id: auditLogsDB.length + 1,
    user_id: admin_id,
    full_name: 'Admin User',
    entity_type: 'UserRole',
    action: 'ROLE_REVOKED',
    details: { user_id },
    timestamp: new Date().toISOString()
  });

  return res.status(200).json({
    success: true,
    data: user,
    message: `Role revoked for user ${user_id}`
  });
}
