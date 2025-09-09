import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { startIndexer } from './indexer/main.js';

import userRoutes from './routes/userRoutes.js';
import matchRoutes from './routes/matchRoutes.js';
import eventRoutes from './routes/eventRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Vibe API is online!' });
});

app.use('/api/users', userRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/events', eventRoutes);

const PORT = process.env.SERVER_PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  startIndexer();
});