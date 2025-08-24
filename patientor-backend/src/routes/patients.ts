import express, { Request, Response } from 'express';

import { getPatients, getPatient, addPatient } from '../services/patients';
import {
  NewPatientEntry,
  NonSensitivePatient,
  PatientWithoutSsn,
} from '../types';
import { newPatientParser } from '../middlewares';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  const patients = getPatients();
  res.json(patients);
});

router.get('/:id', (req, res: Response<PatientWithoutSsn>) => {
  const id = req.params.id;
  const patient = getPatient(id);
  res.json(patient);
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
