import { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Autocomplete,
} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {
  HealthCheckRating as HealthCheckRatingType,
  EntryWithoutId as EntryWithoutIdType,
} from '../../types';
import { toHealthCheckRating } from '../../utils';

const NewEntryForm = (props: {
  handleSubmit: (_entry: EntryWithoutIdType) => void;
}) => {
  const [open, setOpen] = useState(true);
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [healthCheckRating, setHealthCheckRating] = useState<string>('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  useEffect(() => {
    setDescription('test description');
    setDate('2022-01-01');
    setSpecialist('test specialist');
    setHealthCheckRating('Healthy');
    setDiagnosisCodes(['Z57.1', 'Z74.3', 'M51.2']);
  }, []);

  const cancelNewEntry = () => {
    setOpen(false);
    setDescription('');
    setDate('');
    setSpecialist('');
    setHealthCheckRating('');
    setDiagnosisCodes([]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newEntry: EntryWithoutIdType = {
      date,
      description,
      specialist,
      type: 'HealthCheck',
      healthCheckRating: toHealthCheckRating(healthCheckRating),
      diagnosisCodes,
    };

    props.handleSubmit(newEntry);
    console.log('New entry submitted');

    setDescription('');
    setDate('');
    setSpecialist('');
    setHealthCheckRating('');
    setDiagnosisCodes([]);
  };

  return (
    <Accordion expanded={open}>
      <AccordionSummary
        expandIcon={<ArrowDownwardIcon />}
        aria-controls=""
        id=""
        onClick={() => setOpen(!open)}
      >
        <Typography component="span">Add New Entry</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={(e) => void handleSubmit(e)}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              size="small"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              id="date"
              type="date"
              variant="outlined"
              size="small"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <TextField
              id="specialist"
              label="Specialist"
              variant="outlined"
              size="small"
              value={specialist}
              onChange={(e) => setSpecialist(e.target.value)}
            />
            <Autocomplete
              size="small"
              disablePortal
              id="healthCheckRating"
              onChange={(_e: unknown, newValue: string | null) =>
                setHealthCheckRating(newValue || '')
              }
              value={healthCheckRating}
              options={[
                ...(Object.values(HealthCheckRatingType).filter((v) =>
                  isNaN(Number(v))
                ) as string[]),
                '',
              ]}
              renderInput={(params) => (
                <TextField {...params} label="Health Check Rating" />
              )}
            />
            <Autocomplete
              id="diagnosisCodes"
              multiple
              freeSolo
              size="small"
              disablePortal
              options={diagnosisCodes}
              value={diagnosisCodes}
              onChange={(_e, newValue) => {
                setDiagnosisCodes(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Diagnosis Codes" />
              )}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="contained"
                color="error"
                onClick={cancelNewEntry}
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit" color="primary">
                Add
              </Button>
            </Box>
          </Box>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default NewEntryForm;
