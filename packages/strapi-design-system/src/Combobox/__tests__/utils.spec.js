import { filterOptions } from '../utils';

describe('Combobox | utils', () => {
  describe('filterOptions', () => {
    const options = [{ props: { children: 'Hamburger' } }, { props: { children: 'Bagel' } }];

    it('should filter the options correctly', () => {
      const actual = filterOptions(options, 'ham');
      const expected = [options[0]];

      expect(actual).toEqual(expected);
    });

    it('empty array, without any param', () => {
      const expected = [];
      const result = filterOptions();

      expect(result).toEqual(expected);
    });

    it('all items, without filter param', () => {
      const expected = options;
      const result = filterOptions(options);

      expect(result).toEqual(expected);
    });

    it('all items, with empty filter param', () => {
      const expected = options;
      const result = filterOptions(options, '');

      expect(result).toEqual(expected);
    });

    it('all items, with null as filter param', () => {
      const expected = options;
      const result = filterOptions(options, null);

      expect(result).toEqual(expected);
    });

    it('no items, with 0 as filter param', () => {
      const expected = [];
      const result = filterOptions(options, 0);

      expect(result).toEqual(expected);
    });

    it('should filter the options if the search is a number', () => {
      const optionsNumeric = [{ props: { children: 421 } }, { props: { children: 1285 } }];
      const expected = [optionsNumeric[1]];

      expect(filterOptions(optionsNumeric, 12)).toEqual(expected);
    });

    describe('should filter the options correctly, with partial term', () => {
      const optionsPartial = [
        { props: { children: 'some-gh-user/project-super-cms' } },
        { props: { children: 'other-gh-user/project-awesome-cms' } },
        { props: { children: 'one-more-gh-user/cool-cms' } },
        { props: { children: 'strapi/strapi' } },
        { props: { children: 'strapi/design-system' } },
      ];

      it('3 of 5 items', () => {
        const result = filterOptions(optionsPartial, 'cms');
        const expected = [optionsPartial[0], optionsPartial[1], optionsPartial[2]];

        expect(result).toEqual(expected);
      });

      it('2 of 5 items', () => {
        const result = filterOptions(optionsPartial, 'project');
        const expected = [optionsPartial[0], optionsPartial[1]];

        expect(result).toEqual(expected);
      });

      it('2 last of 5 items', () => {
        const result = filterOptions(optionsPartial, 'strapi');
        const expected = [optionsPartial[3], optionsPartial[4]];

        expect(result).toEqual(expected);
      });

      it('1 item', () => {
        const result = filterOptions(optionsPartial, 'awesome');
        const expected = [optionsPartial[1]];

        expect(result).toEqual(expected);
      });
    });
  });
});
