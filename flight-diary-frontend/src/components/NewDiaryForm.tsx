import React, { useState } from 'react';
import { Visibility, Weather, type NewDiaryEntry } from '../types';
import toNewDiaryEntry from '../utils';
import ErrorMessage from './ErrorMessage';

const NewDiaryForm = (props: {
  handleAddNewDiary: (newDiaryEntry: NewDiaryEntry) => void;
  handleErrorMessage: (errorMessage: string) => void;
  errorMessage: string | null;
}) => {
  const { handleAddNewDiary, handleErrorMessage, errorMessage } = props;
  const [date, setDate] = useState<string>('');
  const [visibility, setVisibility] = useState<string>('');
  const [weather, setWeather] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const newDiaryEntry: NewDiaryEntry = toNewDiaryEntry({
        date,
        visibility,
        weather,
        comment,
      });
      handleAddNewDiary(newDiaryEntry);
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Error) {
        handleErrorMessage(error.message);
      }
    }
  };

  return (
    <>
      <h2>Add new entry</h2>
      <ErrorMessage errorMessage={errorMessage} />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          visibility:
          {Object.values(Visibility).map((v: Visibility) => (
            <>
              <input
                type="radio"
                id={`visibility-${v}`}
                name="visibility"
                checked={v === visibility}
                value={v}
                onChange={(e) => setVisibility(e.target.value)}
              />
              <label htmlFor={`visibility-${v}`}>{v}</label>
            </>
          ))}
        </div>
        <div>
          Weather:
          {Object.values(Weather).map((v: Weather) => (
            <>
              <input
                type="radio"
                id={`weather-${v}`}
                name="weather"
                checked={v === weather}
                value={v}
                onChange={(e) => setWeather(e.target.value)}
              />
              <label htmlFor={`weather-${v}`}>{v}</label>
            </>
          ))}
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
