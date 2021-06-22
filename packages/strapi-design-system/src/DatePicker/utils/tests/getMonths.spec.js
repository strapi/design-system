import { getMonths } from '../getMonths';

describe('getMonths', () => {
  it('should retrieve an array of years from 1970 to 2070', () => {
    const months = getMonths();
    expect(months).toEqual([
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]);
  });
});
