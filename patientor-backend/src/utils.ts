import { Gender, NewPatientEntry } from './types';

// Type guard for string
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

// Type guard for date
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// Type guard for gender
const isGender = (param: string): param is Gender => {
  return Object.values(Gender).includes(param as Gender);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (
    !object ||
    typeof object !== 'object' ||
    !('name' in object) ||
    !('dateOfBirth' in object) ||
    !('ssn' in object) ||
    !('gender' in object) ||
    !('occupation' in object)
  ) {
    throw new Error('Incorrect or missing data');
  }
  const newPatient: NewPatientEntry = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
  };
  return newPatient;
};

export { toNewPatientEntry };
