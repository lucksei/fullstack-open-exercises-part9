import { useState, useEffect } from 'react';
import diariesService from './services/diaries';
import NewDiaryForm from './components/NewDiaryForm';
import type { DiaryEntry, NewDiaryEntry } from './types';
import Diaries from './components/Diaries';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[] | undefined>(undefined);

  useEffect(() => {
    const fetchDiaries = async () => {
      const diaries = await diariesService.getDiaries();
      setDiaries(diaries);
    };

    void fetchDiaries();
  }, []);

  const handleAddNewDiary = async (newDiaryEntry: NewDiaryEntry) => {
    const addedDiary = await diariesService.addDiaryEntry(newDiaryEntry);
    setDiaries(diaries?.concat(addedDiary));
  };
  return (
    <div>
      <NewDiaryForm handleAddNewDiary={handleAddNewDiary} />
      <Diaries diaries={diaries} />
    </div>
  );
}

export default App;
