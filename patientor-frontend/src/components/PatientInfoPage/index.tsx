import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import patientsService from '../../services/patients';
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

import type { Patient } from '../../types';

interface Props {}

const PatientInfoPage = (_props: Props) => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  useEffect(() => {
    const fetchPatient = async () => {
      if (patientId) {
        setPatient(await patientsService.get(patientId));
      }
    };
    void fetchPatient();
  }, [patientId]);

  console.log(patient);

  if (!patient) {
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
            {/* <ListItem>Gender: {patient.gender}</ListItem> */}
            <ListItem>Birth: {patient.dateOfBirth}</ListItem>
            <ListItem>SSN: {patient.ssn}</ListItem>
            <ListItem>Occupation: {patient.occupation}</ListItem>
          </List>
        </CardContent>
      </Card>
    </>
  );
};

export default PatientInfoPage;
