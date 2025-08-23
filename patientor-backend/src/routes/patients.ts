import express, { Request, Response } from 'express';

import { getPatients, addPatient } from '../services/patients';
import { NewPatientEntry } from '../types';
import { newPatientParser } from '../middlewares';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = getPatients();
  res.json(patients);
});

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
