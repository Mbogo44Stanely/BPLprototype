# Frontend API Migration Guide

## Overview

This guide helps you update your React components to use the new consolidated API endpoints instead of the old individual routes.

## Changes Summary

| Old Endpoint | New Endpoint | New Action |
|---|---|---|
| `POST /api/auth/login` | `POST /api/auth` | `login` |
| `POST /api/auth/register` | `POST /api/auth` | `register` |
| `GET /api/players` | `GET /api/players` | - |
| `POST /api/tournaments/:id/register` | `POST /api/tournaments` | `register` |
| `GET /api/tournaments/:id/bracket` | `POST /api/tournaments` | `get-bracket` |
| `POST /api/tournaments/:id/generate-bracket` | `POST /api/tournaments` | `generate-bracket` |
| `GET /api/profile` | `GET /api/profile?user_id=X` | - |
| `PUT /api/profile` | `PUT /api/profile` | `update` |
| `POST /api/payments/create` | `POST /api/payments` | `create` |
| `GET /api/payments/:id` | `POST /api/payments` | `get` |
| `POST /api/payments/:id/simulate-success` | `POST /api/payments` | `simulate-success` |
| `POST /api/bracket-matches/:id/complete` | `POST /api/matches` | `complete` |
| `GET /api/admin/audit-logs` | `GET /api/admin` | - |

## Migration Examples

### Authentication (Auth.tsx)

**Before:**
```typescript
const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
const res = await fetch(endpoint, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
```

**After:**
```typescript
const payload = {
  action: isLogin ? 'login' : 'register',
  email,
  password,
  ...((!isLogin) && { full_name: fullName, role, phone })
};

const res = await fetch('/api/auth', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
});
```

### Tournament Registration (TournamentRegistration.tsx)

**Before:**
```typescript
const res = await fetch(`/api/tournaments/${selectedTournament.id}/register`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ player_id: userId })
});
```

**After:**
```typescript
const res = await fetch('/api/tournaments', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'register',
    tournament_id: selectedTournament.id,
    player_id: userId
  })
});
```

### Bracket Operations (BracketSimulator.tsx)

**Before:**
```typescript
// Get bracket
const resp = await fetch(`/api/tournaments/${tournamentId}/bracket`);

// Generate bracket
const resp = await fetch(`/api/tournaments/${tournamentId}/generate-bracket`, {
  method: 'POST'
});

// Complete match
const resp = await fetch(`/api/bracket-matches/${match.id}/complete`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ winner })
});
```

**After:**
```typescript
// Get bracket
const resp = await fetch('/api/tournaments', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'get-bracket',
    tournament_id: tournamentId
  })
});

// Generate bracket
const resp = await fetch('/api/tournaments', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'generate-bracket',
    tournament_id: tournamentId
  })
});

// Complete match
const resp = await fetch('/api/matches', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'complete',
    match_id: match.id,
    winner
  })
});
```

### Payment Operations (TournamentRegistration.tsx)

**Before:**
```typescript
const res = await fetch('/api/payments/create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ tournament_id, amount })
});

const res = await fetch(`/api/payments/${paymentId}/simulate-success`, {
  method: 'POST'
});

const res = await fetch(`/api/payments/${paymentId}`);
```

**After:**
```typescript
const res = await fetch('/api/payments', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'create',
    tournament_id,
    amount
  })
});

const res = await fetch('/api/payments', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'simulate-success',
    payment_id: paymentId
  })
});

const res = await fetch('/api/payments', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'get',
    payment_id: paymentId
  })
});
```

### Profile Operations

**Before:**
```typescript
const res = await fetch('/api/profile');

const res = await fetch('/api/profile', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ full_name, phone, profile_data })
});
```

**After:**
```typescript
// Method 1: Simple GET
const res = await fetch('/api/profile?user_id=1');

// Method 2: POST with action
const res = await fetch('/api/profile', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'get',
    user_id: 1
  })
});

// Update
const res = await fetch('/api/profile', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'update',
    user_id: 1,
    full_name,
    phone,
    profile_data
  })
});
```

### Admin Operations

**Before:**
```typescript
const res = await fetch('/api/admin/audit-logs');
```

**After:**
```typescript
// Simple GET
const res = await fetch('/api/admin');

// Or with action
const res = await fetch('/api/admin', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'get-logs'
  })
});
```

## Files to Update

1. **src/components/Auth.tsx** - Login/register
2. **src/components/TournamentRegistration.tsx** - Tournament ops
3. **src/components/BracketSimulator.tsx** - Bracket operations
4. **src/components/BracketView.tsx** - Bracket viewing
5. **src/components/PaymentSimulator.tsx** - Payment ops
6. **src/components/ClubMatches.tsx** - Match operations
7. **src/components/SystemReports.tsx** - Admin operations
8. Any other components making API calls

## Search & Replace Pattern

Use your IDE's find & replace to speed up migration:

### Pattern 1: Auth endpoints
```
Find: /api/auth/(login|register)
Replace: /api/auth
```

Add `action` field based on context.

### Pattern 2: Tournament endpoints
```
Find: /api/tournaments/\$\{([^}]+)\}/(register|bracket|generate-bracket)
Replace: /api/tournaments
```

### Pattern 3: Payment endpoints
```
Find: /api/payments/([^/]+)
Replace: /api/payments
```

## Testing Checklist

- [ ] Login works
- [ ] Register works
- [ ] Player listing works
- [ ] Tournament creation works
- [ ] Tournament registration works
- [ ] Bracket generation works
- [ ] Bracket viewing works
- [ ] Match completion works
- [ ] Payment creation works
- [ ] Payment status retrieval works
- [ ] Payment simulation works
- [ ] Profile retrieval works
- [ ] Profile updates work
- [ ] Admin operations work

## Common Issues

### Issue: Route not found
**Solution:** Verify the action name matches exactly. Check API_CONSOLIDATION.md for correct action names.

### Issue: Missing required fields
**Solution:** Include the `action` field in POST request body.

### Issue: Old endpoint returning 404
**Solution:** That endpoint no longer exists. Use consolidated endpoint with proper action.

### Issue: Response format changed
**Solution:** New responses have `success`, `data`, `error`, `message` fields. Update response handling.

## Helper Function

Create a utility function to reduce boilerplate:

```typescript
// api/client.ts
export interface ApiRequest {
  action?: string;
  [key: string]: any;
}

export async function apiCall(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'POST',
  data?: ApiRequest
) {
  const response = await fetch(`/api${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  } else {
    throw new Error(`Non-JSON response: ${await response.text()}`);
  }
}

// Usage in components:
// Before
const res = await fetch('/api/tournaments/:id/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ player_id })
});

// After
const res = await apiCall('/tournaments', 'POST', {
  action: 'register',
  tournament_id: id,
  player_id
});
```

## Next Steps

1. Update all components with new API calls
2. Test each feature thoroughly
3. Deploy and verify in production
4. Monitor error logs for any issues
5. Update API documentation
6. Plan for database integration

---

For detailed endpoint documentation, see [API_CONSOLIDATION.md](API_CONSOLIDATION.md)
