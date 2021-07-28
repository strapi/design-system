import { getYears } from '../getYears';

describe('getYears', () => {
  it('should retrieve an array of years from 1970 to 2070', () => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(2020, 3, 1));
    const years = getYears();
    expect(years[0]).toEqual(1970);
    expect(years[years.length - 1]).toEqual(2070);
  });
});
