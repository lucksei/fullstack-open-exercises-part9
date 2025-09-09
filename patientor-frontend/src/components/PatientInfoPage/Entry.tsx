import { useState, useEffect } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import diagnosesService from '../../services/diagnoses';

import type { Diagnosis, Entry as EntryType } from '../../types';

interface EntryProps {
  entry: EntryType;
}

const Entry = (props: EntryProps) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | undefined>(
    undefined
  );
  const { entry } = props;

  // Load Diagnoses
  useEffect(() => {
    const fetchDiagnoses = async () => {
      let diagnosesArray: Diagnosis[] = [];
      if (!entry.diagnosisCodes) {
        setDiagnoses(diagnosesArray);
        return; // Safety
      }
      for (const code of entry.diagnosisCodes) {
        const diagnosis = await diagnosesService.get(code);
        diagnosesArray = diagnosesArray.concat(diagnosis);
      }
      setDiagnoses(diagnosesArray);
    };
    void fetchDiagnoses();
  }, [entry.diagnosisCodes]);

  console.log(diagnoses);

  if (!diagnoses) {
    return null;
  }

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
          <li key={code}>
            {code}: {diagnoses.find((d) => d.code === code)?.name}
          </li>
        ))}
      </ul>
    </Paper>
  );
};

export default Entry;
