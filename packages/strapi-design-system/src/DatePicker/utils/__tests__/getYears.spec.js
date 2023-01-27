import { getYears } from '../getYears';

describe('getYears', () => {
  jest.useFakeTimers('modern');
  jest.setSystemTime(new Date(2020, 3, 1));

  it('should retrieve an array of years from 1820 to 2035', () => {
    const years = getYears();
    expect(years[0]).toEqual(1820);
    expect(years[years.length - 1]).toEqual(2035);
  });

  it('should retrieve an array of years between min and max date', () => {
    const minDate = new Date(2018, 1, 1);
    const maxDate = new Date(2024, 1, 1);
    const years = getYears(minDate, maxDate);

    expect(years[0]).toEqual(2018);
    expect(years[years.length - 1]).toEqual(2024);
  });
});
