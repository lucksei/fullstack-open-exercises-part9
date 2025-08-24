import { v1 as uuid } from 'uuid';
import patientsData from '../data/patients';
import {
  NewPatientEntry,
  Patient,
  NonSensitivePatient,
  Entry,
  PatientWithoutSsn,
} from '../types';

const getPatients = (): NonSensitivePatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): PatientWithoutSsn | undefined => {
  const patient = patientsData.find((p) => p.id === id);
  if (!patient) return undefined;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ssn: _ssn, ...patientWithoutSsn } = patient;
  return patientWithoutSsn;
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const id = uuid();
  const entries: Entry[] = [];
  const newPatient = {
    id,
    entries,
    ...entry,
  };

  patientsData.push(newPatient);
  return newPatient;
};

export { getPatients, getPatient, addPatient };
