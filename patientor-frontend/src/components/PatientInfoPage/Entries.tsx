import { Box, Paper, List, Typography } from '@mui/material';

import type { Diagnosis, Entry as EntryType } from '../../types';

interface EntriesProps {
  entries: EntryType[];
  diagnoses: Diagnosis[] | undefined;
}

const Entries = (props: EntriesProps) => {
  const { entries, diagnoses } = props;

  if (!diagnoses) {
    return null;
  }

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
                <li key={code}>
                  {code}: {diagnoses.find((d) => d.code === code)?.name}
                </li>
              ))}
            </ul>
          </Paper>
        );
      })}
    </List>
  );
};

export default Entries;
