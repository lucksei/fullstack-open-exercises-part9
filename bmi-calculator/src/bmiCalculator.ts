const calculateBmi = (height: number, weight: number): string => {
  // 18.5 < normal BMI < 24.9 -- height in cm -- weight in kg
  const bmi: number = weight / ((height * height) / 10000);
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi < 24.9) {
    return 'Normal range';
  } else {
    return 'Overweight';
  }
};

const height: number = Number(process.argv[2]);
const weight: number = Number(process.argv[3]);
console.log(`height: ${height} [cm]`);
console.log(`weight: ${weight} [kg]`);
console.log(calculateBmi(height, weight));
