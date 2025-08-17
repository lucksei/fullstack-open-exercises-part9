import express, { Request, Response, NextFunction } from 'express';
import qs from 'qs';

import { calculateBmi } from './src/bmiCalculator';
import { calculateExercises } from './src/exerciseCalculator';

const app = express();

// Custom error interface
interface HttpError extends Error {
  status?: number;
}

// Query parser
app.set('query parser', (str: string) => qs.parse(str));

// Body
app.use(express.json());

// Routes
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res, next) => {
  const weight: number = Number(req.query.weight);
  const height: number = Number(req.query.height);
  if (!weight || !height) {
    const error: HttpError = new Error('malformatted parameters');
    error.status = 400;
    next(error);
  }

  const bmi = calculateBmi(height, weight);

  res.json({ bmi, weight, height });
});

app.post('/exercises', (req, res, next) => {
  interface exerciseReqBody {
    hours: number[];
    target: number;
  }

  const body = req.body as exerciseReqBody;

  if (body.hours === undefined || body.target === undefined) {
    const error: HttpError = new Error('parameters are missing');
    error.status = 400;
    next(error);
  }

  if (
    body.hours.some((h) => typeof h !== 'number') ||
    typeof body.target !== 'number'
  ) {
    const error: HttpError = new Error('malformatted parameters');
    error.status = 400;
    next(error);
  }

  const result = calculateExercises(body.hours, body.target);
  res.json(result);
});

// Custom error middleware
app.use((err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  const statusCode: number = err.status || 500;
  const message: string = String(err.message);
  res.status(statusCode).json({
    error: message,
  });
});

// run app and port
const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
