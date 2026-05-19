import 'dotenv/config'; // ← MUST be first: loads DATABASE_URL before Prisma initializes
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { templeRouter } from './modules/temples/temples.router';


const app = express();
const PORT = process.env.PORT ?? 4001;

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Health Check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'catalog-service', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/temples', templeRouter);


app.listen(PORT, () => {
  console.log(`📚 Catalog Service running on http://localhost:${PORT}`);
});

export default app;
