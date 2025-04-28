import express from 'express';
import cors from 'cors';
import authorRoutes from './routes/authorRoutes';
import bookRoutes from './routes/bookRoutes';

import configEnv from './config/config';

const app = express();
const PORT = configEnv.DB_PORT || 5432;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/authors', authorRoutes);
app.use('/books', bookRoutes);

// Health check route
app.get('/', (_req, res) => {
  res.send('Bookstore API is running');
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
