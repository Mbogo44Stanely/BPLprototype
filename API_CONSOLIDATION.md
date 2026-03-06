# 🎯 Consolidated API Routes - Action-Based Architecture

## Overview

Reduced from **14+ individual serverless functions** to just **7 consolidated endpoints** + 1 catch-all handler.

### Benefits
✅ **Fewer serverless functions** = Lower Vercel costs  
✅ **Centralized logic** = Easier maintenance  
✅ **Consistent patterns** = Better code organization  
✅ **Type-safe** = Full TypeScript support  
✅ **Scalable** = Easy to add new actions  

---

## 📋 Consolidated Routes

### 1. **POST /api/auth** - Authentication
Handles user login and registration with action-based routing.

**Actions:**
- `login` - Authenticate user
- `register` - Create new user account

**Example Requests:**
```bash
# Login
curl -X POST https://yourapp.vercel.app/api/auth \
  -H "Content-Type: application/json" \
  -d '{
    "action": "login",
    "email": "admin@badminton.ke",
    "password": "admin123"
  }'

# Register
curl -X POST https://yourapp.vercel.app/api/auth \
  -H "Content-Type: application/json" \
  -d '{
    "action": "register",
    "full_name": "Jane Smith",
    "email": "jane@badminton.ke",
    "password": "secure123",
    "role": "player",
    "phone": "+254712345678"
  }'
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "email": "admin@badminton.ke",
    "fullName": "Super Admin",
    "role": "admin"
  }
}
```

---

### 2. **GET/POST /api/players** - Player Management
Get list of players or create new player (GET returns list, POST handles actions).

**Actions (POST):**
- `list` - Get all players
- `create` - Add new player

**Example Requests:**
```bash
# Get all players (simple GET)
curl https://yourapp.vercel.app/api/players

# Or via POST with action
curl -X POST https://yourapp.vercel.app/api/players \
  -H "Content-Type: application/json" \
  -d '{"action": "list"}'

# Create player
curl -X POST https://yourapp.vercel.app/api/players \
  -H "Content-Type: application/json" \
  -d '{
    "action": "create",
    "full_name": "John Doe",
    "email": "john@badminton.ke",
    "club_id": 1
  }'
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "user_id": 2,
      "full_name": "John Doe",
      "email": "john@example.com",
      "club_id": 1,
      "ranking_points": 1250,
      "status": "active"
    }
  ]
}
```

---

### 3. **GET/POST /api/tournaments** - Tournament Management
Manage tournaments, registrations, and brackets.

**Actions (POST):**
- `list` - Get all tournaments
- `create` - Create new tournament
- `register` - Register player for tournament
- `get-bracket` - Get tournament bracket
- `generate-bracket` - Generate/update bracket

**Example Requests:**
```bash
# List tournaments
curl https://yourapp.vercel.app/api/tournaments

# Create tournament
curl -X POST https://yourapp.vercel.app/api/tournaments \
  -H "Content-Type: application/json" \
  -d '{
    "action": "create",
    "name": "Regional Championship 2024",
    "max_participants": 64
  }'

# Register player
curl -X POST https://yourapp.vercel.app/api/tournaments \
  -H "Content-Type: application/json" \
  -d '{
    "action": "register",
    "tournament_id": 1,
    "player_id": 5
  }'

# Get bracket
curl -X POST https://yourapp.vercel.app/api/tournaments \
  -H "Content-Type: application/json" \
  -d '{
    "action": "get-bracket",
    "tournament_id": 1
  }'

# Generate bracket
curl -X POST https://yourapp.vercel.app/api/tournaments \
  -H "Content-Type: application/json" \
  -d '{
    "action": "generate-bracket",
    "tournament_id": 1
  }'
```

---

### 4. **GET/PUT/POST /api/profile** - User Profiles
Manage user profiles and personal information.

**Actions (PUT/POST):**
- `get` - Retrieve user profile
- `update` - Update profile information

**Example Requests:**
```bash
# Get profile (GET method)
curl "https://yourapp.vercel.app/api/profile?user_id=1"

# Or via POST
curl -X POST https://yourapp.vercel.app/api/profile \
  -H "Content-Type: application/json" \
  -d '{
    "action": "get",
    "user_id": 1
  }'

# Update profile
curl -X PUT https://yourapp.vercel.app/api/profile \
  -H "Content-Type: application/json" \
  -d '{
    "action": "update",
    "user_id": 1,
    "full_name": "John Updated",
    "phone": "+254712345678",
    "profile_data": {
      "club": "Elite Badminton Club",
      "bio": "Professional player"
    }
  }'
```

---

### 5. **GET/POST /api/payments** - Payment Management
Handle payment creation, retrieval, and simulation.

**Actions (POST):**
- `create` - Create new payment
- `get` - Retrieve payment details
- `simulate-success` - Mark payment as completed

**Example Requests:**
```bash
# Create payment
curl -X POST https://yourapp.vercel.app/api/payments \
  -H "Content-Type: application/json" \
  -d '{
    "action": "create",
    "tournament_id": 1,
    "amount": 2500
  }'

# Get payment
curl -X POST https://yourapp.vercel.app/api/payments \
  -H "Content-Type: application/json" \
  -d '{
    "action": "get",
    "payment_id": 3
  }'

# Simulate payment success
curl -X POST https://yourapp.vercel.app/api/payments \
  -H "Content-Type: application/json" \
  -d '{
    "action": "simulate-success",
    "payment_id": 3
  }'
```

---

### 6. **GET/POST /api/matches** - Match Management
Track and complete bracket matches.

**Actions (POST):**
- `get` - Retrieve match details
- `complete` - Mark match as completed

**Example Requests:**
```bash
# Get match
curl -X POST https://yourapp.vercel.app/api/matches \
  -H "Content-Type: application/json" \
  -d '{
    "action": "get",
    "match_id": 1
  }'

# Complete match
curl -X POST https://yourapp.vercel.app/api/matches \
  -H "Content-Type: application/json" \
  -d '{
    "action": "complete",
    "match_id": 1,
    "winner": "John Doe"
  }'
```

---

### 7. **GET/POST /api/admin** - Administrative Functions
Manage system-level operations like audit logs and user roles.

**Actions (POST):**
- `get-logs` - Retrieve audit logs
- `get-users` - Get all users
- `approve-role` - Approve user role application
- `revoke-role` - Revoke user role

**Example Requests:**
```bash
# Get audit logs
curl https://yourapp.vercel.app/api/admin

# Approve user role
curl -X POST https://yourapp.vercel.app/api/admin \
  -H "Content-Type: application/json" \
  -d '{
    "action": "approve-role",
    "user_id": 2,
    "role_id": 3,
    "admin_id": 1
  }'

# Revoke user role
curl -X POST https://yourapp.vercel.app/api/admin \
  -H "Content-Type: application/json" \
  -d '{
    "action": "revoke-role",
    "user_id": 2,
    "admin_id": 1
  }'
```

---

### 8. **GET/POST /api/[...slug]** - Catch-All Handler
Returns 404 for undefined routes with helpful error message.

---

## 🔄 Request/Response Pattern

All consolidated endpoints follow this pattern:

**POST Request:**
```typescript
{
  action: string;              // Required: specifies which operation to perform
  [key: string]: any;          // Additional parameters based on action
}
```

**Response:**
```typescript
{
  success?: boolean;           // Operation result
  data?: T;                   // Response data (varies by endpoint)
  error?: string;             // Error message if failed
  message?: string;           // Additional info
}
```

---

## 📝 TypeScript Types

Each endpoint has full TypeScript support:

```typescript
// Example: PlayerRequest type
interface PlayerRequest {
  action: 'list' | 'create';
  full_name?: string;
  email?: string;
  club_id?: number;
  ranking_points?: number;
}

// Example: ApiResponse type
interface ApiResponse<T> {
  success?: boolean;
  data?: T;
  error?: string;
  message?: string;
}
```

---

## 🚀 Benefits of This Approach

| Aspect | Old (14 files) | New (7 files) |
|--------|---|---|
| **Functions** | 14+ | 7 + catch-all |
| **Maintenance** | Higher | Lower |
| **Cost** | Higher | Lower |
| **Consistency** | Lower | Higher |
| **Scalability** | Harder | Easier |
| **Code Duplication** | More | Less |

---

## 🔧 Adding New Actions

To add a new action to an endpoint:

1. Add action to the action union type:
```typescript
interface TournamentRequest {
  action: 'list' | 'create' | 'register' | 'new-action'; // Add here
  // ... other fields
}
```

2. Create handler function:
```typescript
function handleNewAction(
  res: VercelResponse,
  body: TournamentRequest
): VercelResponse {
  // Implementation
  return res.status(200).json({ /* response */ });
}
```

3. Add case to switch statement:
```typescript
switch (action) {
  case 'new-action':
    return handleNewAction(res, body);
  // ... other cases
}
```

---

## 📊 Status Codes

All endpoints use standard HTTP status codes:

- **200** - OK (GET successful)
- **201** - Created (POST successful)
- **400** - Bad Request (validation error)
- **404** - Not Found (resource not found)
- **409** - Conflict (e.g., email already registered)
- **405** - Method Not Allowed
- **500** - Server Error

---

## 🔒 Authentication

Currently using basic auth (username/password). For production:

1. Use JWT tokens
2. Add role-based access control (RBAC)
3. Validate permissions per action
4. Use HTTPS only
5. Implement rate limiting

---

## 🗄️ Database Integration

All endpoints currently use in-memory storage. To connect a real database:

1. Install database client (MongoDB, PostgreSQL, etc.)
2. Replace mock database objects with real queries
3. Add error handling for DB operations
4. Implement connection pooling

Example transition:
```typescript
// Before (mock):
const playersDB: Player[] = [...];

// After (real DB):
import { db } from './database';
const playersDB = await db.collection('players').find();
```

---

## 📈 Monitoring & Logging

For production, add:

1. Request logging
2. Error tracking
3. Performance monitoring
4. Audit trail
5. User activity logs

---

## 🧪 Testing

Each endpoint can be tested with curl, Postman, or code:

```typescript
// Example test
const response = await fetch('https://yourapp.vercel.app/api/auth', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'login',
    email: 'admin@badminton.ke',
    password: 'admin123'
  })
});

const data = await response.json();
console.log(data.success); // true
```

---

## 📚 File Structure

```
api/
├── auth.ts           # Authentication (login, register)
├── players.ts        # Player management
├── tournaments.ts    # Tournament & bracket management
├── profile.ts        # User profiles
├── payments.ts       # Payment handling
├── matches.ts        # Match management
├── admin.ts          # Admin operations
├── [... slug].ts     # Catch-all handler
└── README.md         # This documentation
```

---

## ✅ Migration Checklist

- [x] Consolidate auth endpoints into /api/auth
- [x] Consolidate player endpoints into /api/players
- [x] Consolidate tournament endpoints into /api/tournaments
- [x] Consolidate profile endpoints into /api/profile
- [x] Consolidate payment endpoints into /api/payments
- [x] Move bracket operations into tournaments
- [x] Move match operations into /api/matches
- [x] Move admin operations into /api/admin
- [ ] Update frontend API calls to use new endpoints
- [ ] Test all endpoints
- [ ] Deploy to Vercel
- [ ] Monitor production performance

---

**Next Steps:** Update your React components to call the new consolidated endpoints with the `action` parameter.
