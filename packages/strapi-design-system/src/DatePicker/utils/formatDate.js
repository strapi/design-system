export const formatDate = (date, locale) => {
  const langFormatter = new Intl.DateTimeFormat(locale);

  return langFormatter.format(date);
};
