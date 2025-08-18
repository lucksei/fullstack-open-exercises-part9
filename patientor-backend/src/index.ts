import express, { NextFunction, Request, Response } from 'express';
import diagnosesRouter from './routes/diagnoses';
import patientsRotuer from './routes/patients';
import z from 'zod';

const app = express();
app.use(express.json());

// Routes
app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRotuer);
app.get('/api/ping', (_req, res) => {
  console.log('someone has pinged here');
  res.send('pong');
});

// Error Middleware
app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error);
  if (error instanceof z.ZodError) {
    return res.status(400).json({ error: error.issues });
  } else {
    return res.status(400).json({ error: 'Something went wrong' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
