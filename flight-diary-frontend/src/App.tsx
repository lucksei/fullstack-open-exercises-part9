import { useState, useEffect } from 'react';
import diariesService from './services/diaries';
import type { DiaryEntry } from './types';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[] | undefined>(undefined);

  useEffect(() => {
    const fetchDiaries = async () => {
      const diaries = await diariesService.getDiaries();
      setDiaries(diaries);
    };

    void fetchDiaries();
  }, []);
  return (
    <div>
      <h2>Diary entries</h2>
      <div>
        {diaries?.map((d) => (
          <div key={d.id}>
            <h3>{d.date}</h3>
            <div>visibility: {d.visibility}</div>
            <div>weather: {d.weather}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
