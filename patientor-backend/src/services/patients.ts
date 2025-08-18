import { v1 as uuid } from 'uuid';
import patientsData from '../data/patients';
import { NewPatientEntry, Patient, PatientWithoutSsn } from '../types';

const getPatients = (): PatientWithoutSsn[] => {
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
  const newPatient = {
    id,
    ...entry,
  };

  patientsData.push(newPatient);
  return newPatient;
};

export { getPatients, addPatient };
