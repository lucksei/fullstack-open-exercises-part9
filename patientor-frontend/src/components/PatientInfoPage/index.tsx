import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

import Entries from './Entries';
import patientsService from '../../services/patients';
import diagnosesService from '../../services/diagnoses';

import type { Patient, Diagnosis } from '../../types';

const PatientInfoPage = () => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | undefined>(
    undefined
  );

  // Load patient
  useEffect(() => {
    const fetchPatient = async () => {
      if (patientId) {
        setPatient(await patientsService.get(patientId));
      }
    };
    void fetchPatient();
  }, [patientId]);

  // Load Diagnoses
  useEffect(() => {
    const fetchDiagnoses = async () => {
      let diagnosesArray: Diagnosis[] = [];
      if (!patient?.entries) {
        return; // Safety
      }
      for (const entry of patient.entries) {
        if (!entry.diagnosisCodes) {
          return; // Safety
        }
        for (const code of entry.diagnosisCodes) {
          const diagnosis = await diagnosesService.get(code);
          diagnosesArray = diagnosesArray.concat(diagnosis);
        }
      }
      setDiagnoses(diagnosesArray);
    };
    void fetchDiagnoses();
  }, [patient?.entries]);

  if (!patient) {
    return null;
  }

  if (!diagnoses) {
    return null;
  }

  return (
    <>
      <Card sx={{ my: 2 }}>
        <CardContent>
          <Typography
            component="h3"
            variant="h5"
            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
          >
            {patient.name}
            {patient.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
          </Typography>
          <Divider sx={{ mt: 2 }} />
          <List>
            <ListItem>Birth: {patient.dateOfBirth}</ListItem>
            <ListItem>SSN: {patient.ssn}</ListItem>
            <ListItem>Occupation: {patient.occupation}</ListItem>
          </List>
          <Typography component="h4" variant="h6">
            Entries
          </Typography>
          <List>
            <Entries entries={patient.entries} diagnoses={diagnoses} />
          </List>
        </CardContent>
      </Card>
    </>
  );
};

export default PatientInfoPage;
