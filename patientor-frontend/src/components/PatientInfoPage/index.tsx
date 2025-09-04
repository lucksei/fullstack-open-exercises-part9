import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import patientsService from '../../services/patients';
import {
  Box,
  Paper,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

import type { Patient, Entry as EntryType } from '../../types';

interface Props {}

interface EntriesProps {
  entries: EntryType[];
}

const Entries = (props: EntriesProps) => {
  const { entries } = props;
  return (
    <List>
      {entries.map((entry) => {
        return (
          <Paper
            key={entry.id}
            variant="outlined"
            sx={{
              display: 'flex',
              flexDirection: 'column ',
              alignContent: 'start',
              justifyContent: 'start',
              p: 2,
            }}
          >
            <Box sx={{ display: 'flex' }}>
              <Typography variant="body2">
                {entry.date}: <i>{entry.description}</i>
              </Typography>
            </Box>
            <ul>
              {entry.diagnosisCodes?.map((code) => (
                <li>{code}</li>
              ))}
            </ul>
          </Paper>
        );
      })}
    </List>
  );
};

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
            <ListItem>Birth: {patient.dateOfBirth}</ListItem>
            <ListItem>SSN: {patient.ssn}</ListItem>
            <ListItem>Occupation: {patient.occupation}</ListItem>
          </List>
          <Typography component="h4" variant="h6">
            Entries
          </Typography>
          <List>
            <Entries entries={patient.entries} />
          </List>
        </CardContent>
      </Card>
    </>
  );
};

export default PatientInfoPage;
