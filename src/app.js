import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { userRoutes } from './routes/userRoutes.js';
import { institutionRoutes } from './routes/institutionRoutes.js';
import { authRoutes } from './routes/authRoutes.js';
import { openFinanceRoutes } from './routes/openFinanceRoutes.js';

const app = express();

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../public')));

app.use('/users', userRoutes);
app.use('/institutions', institutionRoutes);
app.use('/openfinance', openFinanceRoutes);
app.use('/auth', authRoutes);

export default app;
