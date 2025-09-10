import { List, Typography } from '@mui/material';

import Entry from './Entry';
import type { Entry as EntryType } from '../../types';

interface EntriesProps {
  entries: EntryType[];
}

const Entries = (props: EntriesProps) => {
  const { entries } = props;

  if (entries.length === 0) {
    return (
      <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
        Patient has no entries
      </Typography>
    );
  }

  return (
    <List>
      {entries.map((entry) => (
        <Entry key={entry.id} entry={entry} />
      ))}
    </List>
  );
};

export default Entries;
