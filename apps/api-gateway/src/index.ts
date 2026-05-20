import 'dotenv/config'; // ← MUST be first
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import proxy from 'express-http-proxy';
import { authMiddleware } from './middleware/auth';

const app = express();
const PORT = process.env.PORT ?? 4000;

// ─── Service URLs ─────────────────────────────────────────────────────────────
const CATALOG_SERVICE_URL  = process.env.CATALOG_SERVICE_URL  ?? 'http://localhost:4001';
const BOOKING_SERVICE_URL  = process.env.BOOKING_SERVICE_URL  ?? 'http://localhost:4002';
const USER_SERVICE_URL     = process.env.USER_SERVICE_URL     ?? 'http://localhost:4003';

// ─── Global Middleware ────────────────────────────────────────────────────────
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN ?? '*' }));
app.use(morgan('dev'));
app.use(express.json());

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'api-gateway', timestamp: new Date().toISOString() });
});

// ─── Public Routes (no auth) ──────────────────────────────────────────────────
// Auth routes – forward to user-service
app.use('/api/auth', proxy(USER_SERVICE_URL, {
  proxyReqPathResolver: (req) => `/api/auth${req.url}`,
}));

// Temple catalog routes – public
app.use('/api/temples', proxy(CATALOG_SERVICE_URL, {
  proxyReqPathResolver: (req) => `/api/temples${req.url}`,
}));

app.use('/api/events', proxy(CATALOG_SERVICE_URL, {
  proxyReqPathResolver: (req) => `/api/events${req.url}`,
}));

app.use('/api/offerings', proxy(CATALOG_SERVICE_URL, {
  proxyReqPathResolver: (req) => `/api/offerings${req.url}`,
}));

app.use('/api/config', proxy(CATALOG_SERVICE_URL, {
  proxyReqPathResolver: (req) => `/api/config${req.url}`,
}));

// ─── Protected Routes (require JWT) ──────────────────────────────────────────
app.use('/api/bookings', authMiddleware, proxy(BOOKING_SERVICE_URL, {
  proxyReqPathResolver: (req) => `/api/bookings${req.url}`,
}));

app.use('/api/users', authMiddleware, proxy(USER_SERVICE_URL, {
  proxyReqPathResolver: (req) => `/api/users${req.url}`,
}));

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on http://localhost:${PORT}`);
});

export default app;
