import { useState, useEffect } from 'react';
import diariesService from './services/diaries';
import NewDiaryForm from './components/NewDiaryForm';
import type { DiaryEntry, NewDiaryEntry } from './types';
import Diaries from './components/Diaries';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[] | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiaries = async () => {
      const diaries = await diariesService.getDiaries();
      setDiaries(diaries);
    };

    void fetchDiaries();
  }, []);

  const handleAddNewDiary = async (newDiaryEntry: NewDiaryEntry) => {
    try {
      const addedDiary = await diariesService.addDiaryEntry(newDiaryEntry);
      setDiaries(diaries?.concat(addedDiary));
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) handleErrorMessage(error.message);
    }
  };

  const handleErrorMessage = (m: string) => {
    setErrorMessage(m);
    setTimeout(() => setErrorMessage(null), 5000);
  };

  return (
    <div>
      <NewDiaryForm
        handleAddNewDiary={handleAddNewDiary}
        errorMessage={errorMessage}
        handleErrorMessage={handleErrorMessage}
      />
      <Diaries diaries={diaries} />
    </div>
  );
}

export default App;
