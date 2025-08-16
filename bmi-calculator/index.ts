import express, { Request, Response, NextFunction } from 'express';
import qs from 'qs';

import { calculateBmi } from './src/bmiCalculator';

const app = express();

// Query parser
app.set('query parser', (str: string) => qs.parse(str));

// Routes
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res, next) => {
  const weight: number = Number(req.query.weight);
  const height: number = Number(req.query.height);
  if (!weight || !height) {
    next(new Error('malformatted parameters'));
  }

  const bmi = calculateBmi(height, weight);

  res.json({ bmi, weight, height });
});

// Custom error middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  const message = err.message;
  res.status(statusCode).json({
    error: message,
  });
});

// run app and port
const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
