// Return a Date if the passed param is a date valid format

export const parseDate = (date: string): Date | undefined => {
  const timestamp = Date.parse(date);

  if (!Number.isNaN(timestamp)) {
    return new Date(timestamp);
  }

  /**
   * This should be undefined because our
   * components do not expect to deal with null values.
   */
  return undefined;
};
