import { VercelRequest, VercelResponse } from '@vercel/node';

// TypeScript types
interface Payment {
  id: number;
  tournament_id: number;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
  completed_at?: string;
}

interface PaymentRequest {
  action: 'create' | 'get' | 'simulate-success';
  tournament_id?: number;
  payment_id?: number;
  amount?: number;
}

interface ApiResponse<T> {
  success?: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Mock database
const paymentsDB: Payment[] = [];

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const { action, ...body } = req.body as PaymentRequest;

    switch (action) {
      case 'create':
        return handleCreatePayment(res, body);

      case 'get':
        return handleGetPayment(res, body);

      case 'simulate-success':
        return handleSimulateSuccess(res, body);

      default:
        return res.status(400).json({
          error: 'Invalid action',
          availableActions: ['create', 'get', 'simulate-success']
        });
    }
  }

  if (req.method === 'GET') {
    const paymentId = req.query.payment_id
      ? Number(req.query.payment_id)
      : undefined;

    if (!paymentId) {
      return res.status(400).json({ error: 'Payment ID is required' });
    }

    const payment = paymentsDB.find(p => p.id === paymentId);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    return res.status(200).json({
      success: true,
      data: payment
    } as ApiResponse<Payment>);
  }

  res.status(405).json({ error: 'Method not allowed' });
}

function handleCreatePayment(
  res: VercelResponse,
  body: PaymentRequest
): VercelResponse {
  const { tournament_id, amount } = body;

  if (!tournament_id || !amount) {
    return res.status(400).json({
      error: 'Tournament ID and amount are required'
    });
  }

  const newPayment: Payment = {
    id: paymentsDB.length + 1,
    tournament_id,
    amount,
    currency: 'KES',
    status: 'pending',
    created_at: new Date().toISOString()
  };

  paymentsDB.push(newPayment);

  return res.status(201).json({
    success: true,
    data: newPayment,
    message: 'Payment created successfully'
  } as ApiResponse<Payment>);
}

function handleGetPayment(
  res: VercelResponse,
  body: PaymentRequest
): VercelResponse {
  const { payment_id } = body;

  if (!payment_id) {
    return res.status(400).json({ error: 'Payment ID is required' });
  }

  const payment = paymentsDB.find(p => p.id === payment_id);
  if (!payment) {
    return res.status(404).json({ error: 'Payment not found' });
  }

  return res.status(200).json({
    success: true,
    data: payment
  } as ApiResponse<Payment>);
}

function handleSimulateSuccess(
  res: VercelResponse,
  body: PaymentRequest
): VercelResponse {
  const { payment_id } = body;

  if (!payment_id) {
    return res.status(400).json({ error: 'Payment ID is required' });
  }

  const payment = paymentsDB.find(p => p.id === payment_id);
  if (!payment) {
    return res.status(404).json({ error: 'Payment not found' });
  }

  payment.status = 'completed';
  payment.completed_at = new Date().toISOString();

  return res.status(200).json({
    success: true,
    data: payment,
    message: 'Payment marked as completed'
  } as ApiResponse<Payment>);
}
