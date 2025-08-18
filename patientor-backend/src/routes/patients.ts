import express, { NextFunction, Request, Response } from 'express';

import { getPatients, addPatient } from '../services/patients';
import { newPatientSchema } from '../utils';
import { NewPatientEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = getPatients();
  res.json(patients);
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.post(
  '/',
  newPatientParser,
  (
    req: Request<unknown, unknown, NewPatientEntry>,
    res: Response<NewPatientEntry>
  ) => {
    const newPatient = addPatient(req.body);
    return res.json(newPatient);
  }
);

export default router;
