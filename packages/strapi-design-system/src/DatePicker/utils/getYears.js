/**
 * Hack method to retrieve the array of years
 */
export const getYears = () => {
  const currentYear = new Date().getFullYear();

  return Array(101)
    .fill(null)
    .map((_, index) => currentYear - 50 + index);
};
