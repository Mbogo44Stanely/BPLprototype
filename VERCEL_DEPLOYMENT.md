# Vercel Deployment Guide

## Quick Deployment Steps

1. **Push your code to GitHub** (Vercel integrates with GitHub)
   ```bash
   git add .
   git commit -m "Setup Vercel Functions API routes"
   git push origin main
   ```

2. **Import Project to Vercel**
   - Go to https://vercel.com/dashboard
   - Click "Add New..." → "Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Project** (Optional Environment Variables)
   - In Vercel Dashboard → Project Settings → Environment Variables
   - Add: `GEMINI_API_KEY` and any other needed variables from your `.env` file

4. **Deploy**
   - Vercel will automatically build and deploy
   - Your app will be live at: `https://your-app-name.vercel.app`

## What You're Getting

### Automatic Features Enabled
✅ **API Routes** - All `/api/*` endpoints are now Vercel Serverless Functions
✅ **Static Frontend** - Your React/Vite app is served as static files  
✅ **CORS Enabled** - All API handlers include CORS headers
✅ **Auto-deployment** - Any push to GitHub triggers automatic deployment

### API Endpoints
All these routes now work on Vercel:
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/players` - Get players list
- `GET /api/tournaments` - Get tournaments
- `POST /api/tournaments/[id]/register` - Register for tournament
- `GET /api/tournaments/[id]/bracket` - Get tournament bracket
- `POST /api/tournaments/[id]/generate-bracket` - Generate bracket
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile
- `POST /api/payments/create` - Create payment
- `GET/POST /api/payments/[id]` - Get/update payment
- `POST /api/payments/[id]/simulate-success` - Simulate payment
- `POST /api/bracket-matches/[id]/complete` - Complete bracket match

Plus a catch-all handler for any undefined routes.

## Important Notes

### Database Persistence
⚠️ The current implementation uses in-memory storage. For production:
- Switch to a cloud database like:
  - MongoDB (Atlas)
  - PostgreSQL (Supabase/Railway)
  - Firebase Realtime Database
  
The `better-sqlite3` file-based database won't work reliably on Vercel serverless functions because each invocation is stateless.

### Working Locally
```bash
npm run dev
# Opens http://localhost:3000
# API calls in development go to your local Express server (server.ts)
```

## Troubleshooting

### Still Getting "NOT_FOUND" Errors
1. ✅ Make sure API files are in `/api` folder
2. ✅ Check browser console for exact URL being called
3. ✅ Verify correct HTTP method (GET/POST)
4. ✅ Hard refresh browser cache (Ctrl+Shift+R)
5. ✅ Check Vercel deployment logs for build errors

### CORS Errors
- All API handlers now include CORS headers
- If still having issues, add this to your vite.config.ts server config:
  ```typescript
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
  ```

### Environment Variables Not Working
- Copy `.env` contents to Vercel Project Settings → Environment Variables
- Restart deployment after adding variables
- Use `process.env.VAR_NAME` in API handlers

## Next Steps

1. **Implement Real Database**
   - Create a database connection in your API handlers
   - Replace mock data responses with real database queries

2. **Add Error Handling**
   - Create consistent error response format
   - Add try-catch blocks in all handlers

3. **Secure Endpoints**
   - Add authentication checks
   - Implement JWT tokens or session validation

4. **Monitor Performance**
   - Use Vercel Analytics
   - Check function execution times in Vercel Dashboard

## Support
For issues with deployment, visit:
- Vercel Docs: https://vercel.com/docs
- GitHub Integration: https://vercel.com/docs/git
