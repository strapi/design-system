export const formatDate = (date: number | Date, locale?: string): string => {
  const langFormatter = new Intl.DateTimeFormat(locale);

  return langFormatter.format(date);
};
