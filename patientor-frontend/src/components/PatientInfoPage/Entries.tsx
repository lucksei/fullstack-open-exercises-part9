import { List } from '@mui/material';

import Entry from './Entry';
import type { Entry as EntryType } from '../../types';

interface EntriesProps {
  entries: EntryType[];
}

const Entries = (props: EntriesProps) => {
  const { entries } = props;

  return (
    <List>
      {entries.map((entry) => (
        <Entry key={entry.id} entry={entry} />
      ))}
    </List>
  );
};

export default Entries;
