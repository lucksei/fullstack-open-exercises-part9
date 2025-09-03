import { Gender, HealthCheckRating } from './types';
import { z } from 'zod';

const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
});

const newBaseEntrySchema = z.object({
  date: z.string(),
  specialist: z.string(),
  description: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const newHealthCheckEntrySchema = newBaseEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

const newOccupationalHealthcareEntrySchema = newBaseEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string(),
      endDate: z.string(),
    })
    .optional(),
});

const newHospitalEntrySchema = newBaseEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: z
    .object({
      date: z.string(),
      criteria: z.string(),
    })
    .optional(),
});

const newEntrySchema = z.union([
  newOccupationalHealthcareEntrySchema,
  newHospitalEntrySchema,
  newHealthCheckEntrySchema,
]);

export {
  newPatientSchema,
  newEntrySchema,
  // newHealthCheckEntrySchema,
  // newOccupationalHealthcareEntrySchema,
  // newHospitalEntrySchema,
};
