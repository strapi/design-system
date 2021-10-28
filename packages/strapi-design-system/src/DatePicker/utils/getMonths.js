/**
 * Hack method to retrieve the localized month
 */
export const getMonths = () => {
  const format = new Intl.DateTimeFormat(undefined, { month: 'long' }).format;

  return Array(12)
    .fill(null)
    .map((_, index) => format(new Date(1970, index, 1)));
};
