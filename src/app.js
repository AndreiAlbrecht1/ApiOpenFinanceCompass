import express from 'express';
import { userRoutes } from './routes/userRoutes.js';
import { institutionRoutes } from './routes/institutionRoutes.js';
import { authRoutes } from './routes/authRoutes.js';
import { openFinanceRoutes } from './routes/openFinanceRoutes.js';

const app = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/institutions', institutionRoutes);
app.use('/openfinance', openFinanceRoutes);
app.use('/auth', authRoutes);

export default app;
