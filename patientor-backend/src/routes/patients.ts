import express from 'express';

import { getPatients } from '../services/patients';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = getPatients();
  res.json(patients);
});

export default router;
