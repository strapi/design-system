import { lightTheme } from '../../themes';
import { handleResponsiveValues } from '../handleResponsiveValues';

describe('handleResponsiveValues', () => {
  it('should handle simple string values', () => {
    const values = { padding: '1rem', margin: '4px' };
    expect(handleResponsiveValues(values, lightTheme)).toMatchInlineSnapshot(`
      "padding-block-start: 1rem;
      padding-inline-end: 1rem;
      padding-block-end: 1rem;
      padding-inline-start: 1rem;
      margin-block-start: 4px;
      margin-inline-end: 4px;
      margin-block-end: 4px;
      margin-inline-start: 4px;"
    `);
  });

  it('should handle simple space values from theme', () => {
    const values = { padding: 2, margin: 4 };
    expect(handleResponsiveValues(values, lightTheme)).toMatchInlineSnapshot(`
      "padding-block-start: 8px;
      padding-inline-end: 8px;
      padding-block-end: 8px;
      padding-inline-start: 8px;
      margin-block-start: 16px;
      margin-inline-end: 16px;
      margin-block-end: 16px;
      margin-inline-start: 16px;"
    `);
  });

  it('should handle responsive values with different breakpoints', () => {
    const values = {
      padding: {
        initial: 1,
        small: 2,
        medium: 3,
        large: 4,
      },
      margin: {
        initial: 2,
        small: 4,
        medium: 6,
        large: 8,
      },
    };
    const result = handleResponsiveValues(values, lightTheme);
    expect(result).toMatchInlineSnapshot(`
      "padding-block-start: 4px;
      padding-inline-end: 4px;
      padding-block-end: 4px;
      padding-inline-start: 4px;
      margin-block-start: 8px;
      margin-inline-end: 8px;
      margin-block-end: 8px;
      margin-inline-start: 8px;
      @media(min-width: 520px){ padding-block-start: 8px;
      padding-inline-end: 8px;
      padding-block-end: 8px;
      padding-inline-start: 8px;
      margin-block-start: 16px;
      margin-inline-end: 16px;
      margin-block-end: 16px;
      margin-inline-start: 16px; }
      @media(min-width: 768px){ padding-block-start: 12px;
      padding-inline-end: 12px;
      padding-block-end: 12px;
      padding-inline-start: 12px;
      margin-block-start: 24px;
      margin-inline-end: 24px;
      margin-block-end: 24px;
      margin-inline-start: 24px; }
      @media(min-width: 1280px){ padding-block-start: 16px;
      padding-inline-end: 16px;
      padding-block-end: 16px;
      padding-inline-start: 16px;
      margin-block-start: 40px;
      margin-inline-end: 40px;
      margin-block-end: 40px;
      margin-inline-start: 40px; }"
    `);
  });

  it('should handle responsive values with mixed prop type', () => {
    const values = {
      padding: {
        initial: 1,
        small: 2,
        medium: '1rem',
        large: 4,
      },
      // CSS specificity wont work here, so padding-right has to be after padding
      paddingRight: {
        initial: 2,
        small: 4,
        medium: 6,
        large: '8px',
      },
      margin: 2,
      marginTop: {
        initial: 1,
        small: '2rem',
      },
    };
    expect(handleResponsiveValues(values, lightTheme)).toMatchInlineSnapshot(`
      "padding-block-start: 4px;
      padding-inline-end: 8px;
      padding-block-end: 4px;
      padding-inline-start: 4px;
      margin-block-start: 4px;
      margin-inline-end: 8px;
      margin-block-end: 8px;
      margin-inline-start: 8px;
      @media(min-width: 520px){ padding-block-start: 8px;
      padding-inline-end: 16px;
      padding-block-end: 8px;
      padding-inline-start: 8px;
      margin-block-start: 2rem; }
      @media(min-width: 768px){ padding-block-start: 1rem;
      padding-inline-end: 24px;
      padding-block-end: 1rem;
      padding-inline-start: 1rem; }
      @media(min-width: 1280px){ padding-block-start: 16px;
      padding-inline-end: 8px;
      padding-block-end: 16px;
      padding-inline-start: 16px; }"
    `);
  });

  it('should handle responsive values with breakpoint array values', () => {
    const values = {
      padding: { initial: ['4rem'], medium: ['2rem', '4rem', '8rem'], large: 6 },
      margin: { initial: 2, medium: [2, '4px'], large: [6, '4px', 8] },
      marginTop: { initial: 4, medium: '1rem', large: '22px' },
    };
    expect(handleResponsiveValues(values, lightTheme)).toMatchInlineSnapshot(`
      "padding-block-start: 4rem;
      padding-inline-end: 4rem;
      padding-block-end: 4rem;
      padding-inline-start: 4rem;
      margin-block-start: 16px;
      margin-inline-end: 8px;
      margin-block-end: 8px;
      margin-inline-start: 8px;
      @media(min-width: 768px){ padding-block-start: 2rem;
      padding-inline-end: 4rem;
      padding-block-end: 8rem;
      padding-inline-start: 4rem;
      margin-block-start: 1rem;
      margin-inline-end: 4px;
      margin-block-end: 8px;
      margin-inline-start: 4px; }
      @media(min-width: 1280px){ padding-block-start: 24px;
      padding-inline-end: 24px;
      padding-block-end: 24px;
      padding-inline-start: 24px;
      margin-block-start: 22px;
      margin-inline-end: 4px;
      margin-block-end: 40px;
      margin-inline-start: 4px; }"
    `);
  });

  it('should handle simple value array and map to logical props wherever required', () => {
    const values = {
      padding: ['2rem', '4rem', '8rem'],
      margin: [2, '4px'],
      paddingTop: { initial: '4rem', medium: 4, large: 6 },
      marginTop: 1,
    };
    expect(handleResponsiveValues(values, lightTheme)).toMatchInlineSnapshot(`
      "padding-block-start: 4rem;
      padding-inline-end: 4rem;
      padding-block-end: 8rem;
      padding-inline-start: 4rem;
      margin-block-start: 4px;
      margin-inline-end: 4px;
      margin-block-end: 8px;
      margin-inline-start: 4px;
      @media(min-width: 768px){ padding-block-start: 16px; }
      @media(min-width: 1280px){ padding-block-start: 24px; }"
    `);
  });
});
