// Write a function `calculateExercises` that calculates the average
// time of `daily exercise hours`, compares it to the `target amount`
// of daily hours and returns an object that includes the following
// values:
// - the number of days
// - the number of training days
// - the original target value
// - the calculated average time
// - boolean value describing if the target level was reached
// - a rating between the numbers 1-3 that tells us how well the hours
// are met. You can decide on the metric on your own
// - a text explaining the rating, you can come up with the explanations
// The daily exercise hours are given to the function as an array than
// contains the number of exercise hours for each day in the training
// period. Eg. a week with 3 hours of training on Monday, none on Tuesday
// 2 hours on Wednesday, 4.5 hours on Thursday and so on would be
// represented by the following array:
// [3, 0, 2, 4.5, 0, 3, 1]

interface ratingDescription {
  target: number;
  description: string;
}

interface exerciseResults {
  periodLength: number; // days
  trainingDays: number; // days
  target: number; // original target value
  average: number; // calculated average time
  success: boolean; // boolean value describing if the target level was reached
  rating: number; // rating between the numbers 1-3 that tells us how well the hours are met.
  ratingDescription: string; // A text explaining the rating
}

const ratings: ratingDescription[] = [
  {
    target: 1,
    description: "you didn't even try",
  },
  {
    target: 2,
    description: 'not too bad but could do better',
  },
  {
    target: 3,
    description: 'excellent, you surpassed your goal!',
  },
];

const calculateExercises = (
  dailyExerciseHours: number[],
  target: number
): exerciseResults => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((d) => d !== 0).length;
  const average = dailyExerciseHours.reduce((a, b) => a + b) / periodLength;
  const rating = (average / target) * 3;
  const success = rating > 3 ? true : false;
  const ratingsIndex = ratings.findIndex((r) => {
    return rating < r.target;
  });
  const ratingDescription =
    ratingsIndex !== -1
      ? ratings[ratingsIndex - 1].description
      : ratings[ratings.length - 1].description;

  return {
    periodLength,
    trainingDays,
    target,
    average,
    success,
    rating,
    ratingDescription,
  };
};

export { calculateExercises };

// Runtime, i.e "npm run calculateExercises 2 3 0 2 4.5 0 3 1"
if (require.main === module) {
  const target: number = Number(process.argv[2]);
  const dailyExerciseHours: number[] = process.argv
    .slice(3)
    .map((h) => Number(h));

  console.log(`target: ${target} hours`);
  console.log(`dailyExerciseHours: [${dailyExerciseHours.join(', ')}] hours`);

  const results = calculateExercises(dailyExerciseHours, target);
  console.log(results);
}
