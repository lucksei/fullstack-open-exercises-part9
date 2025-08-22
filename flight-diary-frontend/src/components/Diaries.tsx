import type { DiaryEntry } from '../types';

const Diaries = (props: { diaries: DiaryEntry[] | undefined }) => {
  const { diaries } = props;
  if (!diaries) {
    return (
      <>
        <h2>Diary entries</h2>
        <div>Loading...</div>
      </>
    );
  }
  return (
    <>
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
    </>
  );
};

export default Diaries;
