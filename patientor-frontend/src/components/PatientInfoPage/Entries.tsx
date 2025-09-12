import { List, Typography } from '@mui/material';

import Entry from './Entry';
import NewEntryForm from './NewEntryForm';
import type { Entry as EntryType, EntryWithoutId } from '../../types';

interface EntriesProps {
  entries: EntryType[];
  handleSubmit: (_entry: EntryWithoutId) => void;
}

const Entries = (props: EntriesProps) => {
  const { entries } = props;

  const handleSubmit = (entry: EntryWithoutId) => {
    props.handleSubmit(entry);
  };

  return (
    <>
      <NewEntryForm handleSubmit={handleSubmit} />
      {entries.length === 0 ? (
        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
          Patient has no entries
        </Typography>
      ) : (
        <List>
          {entries.map((entry) => (
            <Entry key={entry.id} entry={entry} />
          ))}
        </List>
      )}
    </>
  );
};

export default Entries;
