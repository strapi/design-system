/**
 * Hack method to retrieve the localized day of weeks
 */
export const getDayOfWeek = () => {
  const format = new Intl.DateTimeFormat(undefined, { weekday: 'long' }).format;

  const thu = new Date(1970, 0, 1);
  const fri = new Date(1970, 0, 2);
  const sat = new Date(1970, 0, 3);
  const sun = new Date(1970, 0, 4);
  const mon = new Date(1970, 0, 5);
  const tue = new Date(1970, 0, 6);
  const wed = new Date(1970, 0, 7);

  return {
    sun: format(sun),
    mon: format(mon),
    tue: format(tue),
    wed: format(wed),
    thu: format(thu),
    fri: format(fri),
    sat: format(sat),
  };
};
