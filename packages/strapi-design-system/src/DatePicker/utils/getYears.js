/**
 * Hack method to retrieve the array of years
 */

const DEFAULT_PAST_RANGE = 200;
const DEFAULT_FUTURE_RANGE = 15;

export const getYears = (minDate, maxDate) => {
  const currentYear = new Date().getFullYear();
  const startYear = minDate?.getFullYear() ?? parseInt(currentYear, 10) - DEFAULT_PAST_RANGE;
  const endYear = maxDate?.getFullYear() ?? parseInt(currentYear, 10) + DEFAULT_FUTURE_RANGE;
  const years = [];

  for (let i = startYear; i <= endYear; i++) {
    years.push(i);
  }

  return years;
};
