export const formatDate = (date) => {
  const langFormatter = new Intl.DateTimeFormat();

  return langFormatter.format(date);
};
