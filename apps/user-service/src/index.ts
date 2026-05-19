import 'dotenv/config'; // ← MUST be first: loads DATABASE_URL before Prisma initializes
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { authRouter } from './modules/auth/auth.router';
import { userRouter } from './modules/users/users.router';

const app = express();
const PORT = process.env.PORT ?? 4003;

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Health Check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'user-service', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

app.listen(PORT, () => {
  console.log(`👤 User Service running on http://localhost:${PORT}`);
});

export default app;
