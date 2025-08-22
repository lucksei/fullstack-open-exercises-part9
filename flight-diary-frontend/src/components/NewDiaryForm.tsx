import React, { useState } from 'react';
import type { NewDiaryEntry } from '../types';
import toNewDiaryEntry from '../utils';

const NewDiaryForm = (props: {
  handleAddNewDiary: (newDiaryEntry: NewDiaryEntry) => void;
}) => {
  const { handleAddNewDiary } = props;
  const [date, setDate] = useState<string>('');
  const [visibility, setVisibility] = useState<string>('');
  const [weather, setWeather] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newDiaryEntry: NewDiaryEntry = toNewDiaryEntry({
      date,
      visibility,
      weather,
      comment,
    });
    handleAddNewDiary(newDiaryEntry);
  };
  return (
    <>
      <h2>Add new entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">date</label>
          <input
            type="text"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="visibility">visibility</label>
          <input
            type="text"
            id="visibility"
            name="visibility"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="weather">weather</label>
          <input
            type="text"
            id="weather"
            name="weather"
            value={weather}
            onChange={(e) => setWeather(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="comment">comment</label>
          <input
            type="text"
            id="comment"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </>
  );
};

export default NewDiaryForm;
