# API Routes (Vercel Serverless Functions)

This directory contains API route handlers that run as Vercel Serverless Functions. Each file automatically becomes a REST API endpoint.

## Route Structure

- `auth/login.ts` → `POST /api/auth/login`
- `auth/register.ts` → `POST /api/auth/register`
- `players.ts` → `GET /api/players`
- `tournaments.ts` → `GET /api/tournaments`, `POST /api/tournaments`
- `tournaments/[id]/register.ts` → `POST /api/tournaments/:id/register`
- `tournaments/[id]/bracket.ts` → `GET /api/tournaments/:id/bracket`
- `tournaments/[id]/generate-bracket.ts` → `POST /api/tournaments/:id/generate-bracket`
- `profile.ts` → `GET /api/profile`, `PUT /api/profile`
- `payments/create.ts` → `POST /api/payments/create`
- `payments/[id].ts` → `GET /api/payments/:id`, `POST /api/payments/:id`
- `payments/[id]/simulate-success.ts` → `POST /api/payments/:id/simulate-success`
- `bracket-matches/[id]/complete.ts` → `POST /api/bracket-matches/:id/complete`
- `admin/audit-logs.ts` → `GET /api/admin/audit-logs`
- `[...slug].ts` → Catch-all handler for undefined routes

## Features

✅ **CORS Enabled** - All handlers include CORS headers
✅ **JSON Responses** - All handlers return proper JSON responses
✅ **Error Handling** - Proper HTTP status codes
✅ **Mock Data** - Ready for production database integration

## Current Implementation

All endpoints currently return **mock data**. This is intentional to:
1. Allow testing on Vercel without a database
2. Serve as a template for your real implementation

## To Add Real Database

1. Create a database (MongoDB, PostgreSQL, etc.)
2. Install the appropriate client library
3. In each handler, replace mock data with real queries

Example:
```typescript
// Replace this:
const mockUser = { id: 1, name: 'John' };
res.json(mockUser);

// With this:
const user = await db.collection('users').findOne({ id: userId });
res.json(user);
```

## Testing Locally

```bash
# Terminal 1: Development server
npm run dev
# Hits local Express server (server.ts) - NOT these handlers

# For local testing of serverless functions:
npm install -g vercel
vercel dev
# Now calls the actual API handlers like production would
```

## Deployment

These handlers automatically deploy to Vercel when you:
```bash
git push
```

Vercel automatically detects files in `/api` and deploys them as serverless functions.
