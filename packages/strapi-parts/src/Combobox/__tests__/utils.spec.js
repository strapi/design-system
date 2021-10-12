import { filterOptions } from '../utils';

describe('Combobox | utils', () => {
  describe('filterOptions', () => {
    it('should filter the options correctly', () => {
      const options = [{ props: { children: 'Hamburger' } }, { props: { children: 'Bagel' } }];
      const actual = filterOptions(options, 'ham');
      const expected = [{ props: { children: 'Hamburger' } }];
      expect(actual).toEqual(expected);
    });

    it('should not filter the options if the search is empty or null', () => {
      const options = [{ props: { children: 'Hamburger' } }, { props: { children: 'Bagel' } }];
      const expected = [{ props: { children: 'Hamburger' } }, { props: { children: 'Bagel' } }];

      expect(filterOptions(options, '')).toEqual(expected);
      expect(filterOptions(options, null)).toEqual(expected);
    });

    it('should also filter the options if the search is a number', () => {
      const options = [{ props: { children: 421 } }, { props: { children: 1285 } }];
      const expected = [{ props: { children: 1285 } }];

      expect(filterOptions(options, 12)).toEqual(expected);
    });
  });
});
