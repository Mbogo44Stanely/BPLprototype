import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // For any unhandled API routes, return a helpful message
  return res.status(404).json({
    error: 'API endpoint not found',
    path: req.url,
    method: req.method,
    message: 'This API endpoint has not been implemented yet. Please check the documentation.'
  });
}
