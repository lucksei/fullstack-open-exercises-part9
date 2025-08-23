import { v1 as uuid } from 'uuid';
import patientsData from '../data/patients';
import { NewPatientEntry, Patient, NonSensitivePatient, Entry } from '../types';

const getPatients = (): NonSensitivePatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
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

export { getPatients, addPatient };
