/**
 * Hack method to retrieve the array of years
 */

const DEFAULT_PAST_RANGE = 200;
const DEFAULT_FUTURE_RANGE = 15;

export const getYears = (minDate?: Date, maxDate?: Date) => {
  const currentYear = new Date().getFullYear();
  const startYear = minDate?.getFullYear() ?? currentYear - DEFAULT_PAST_RANGE;
  const endYear = maxDate?.getFullYear() ?? currentYear + DEFAULT_FUTURE_RANGE;
  const years: number[] = [];

  for (let i = startYear; i <= endYear; i++) {
    years.push(i);
  }

  return years;
};
