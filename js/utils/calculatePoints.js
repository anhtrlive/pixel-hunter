const calculatePoints = (initialData) => {
  const LIFE_COST = 50;
  const POINTS_COST_TIME = 50;
  const wrongAnswers = initialData.answers.filter((el) => el[0] ===0);
  if (initialData.answers.length <= 10 && wrongAnswers.length === 4) {
    return -1;
  }
  const points = initialData.answers.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue[0] * Math.ceil(currentValue[1] / 10) * POINTS_COST_TIME;
  }, 0);
  return points + initialData.lives * LIFE_COST;
};

export {calculatePoints};
