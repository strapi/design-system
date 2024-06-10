import { lightTheme } from '../../themes';
import { handleResponsiveValues } from '../handleResponsiveValues';

describe('handleResponsiveValues', () => {
  it('should handle simple string values', () => {
    const values = { padding: '1rem', margin: '4px' };
    expect(handleResponsiveValues(values, lightTheme)).toMatchSnapshot();
  });

  it('should handle simple space values from theme', () => {
    const values = { padding: 2, margin: 4 };
    expect(handleResponsiveValues(values, lightTheme)).toMatchSnapshot();
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
    expect(result).toMatchSnapshot();
  });

  it('should handle responsive values with mixed prop type', () => {
    const values = {
      paddingRight: {
        initial: 2,
        small: 4,
        medium: 6,
        large: '8px',
      },
      padding: {
        initial: 1,
        small: 2,
        medium: '1rem',
        large: 4,
      },
      margin: 2,
      marginTop: {
        initial: 1,
        small: '2rem',
      },
    };
    expect(handleResponsiveValues(values, lightTheme)).toMatchSnapshot();
  });

  it('should handle responsive values with breakpoint array values', () => {
    const values = {
      padding: { initial: ['4rem'], medium: ['2rem', '4rem', '8rem'], large: 6 },
      margin: { initial: 2, medium: [2, '4px'], large: [6, '4px', 8] },
      marginTop: { initial: 4, medium: '1rem', large: '22px' },
    };
    expect(handleResponsiveValues(values, lightTheme)).toMatchSnapshot();
  });

  it('should handle simple value array and map to logical props wherever required', () => {
    const values = {
      padding: ['2rem', '4rem', '8rem'],
      margin: [2, '4px'],
      paddingTop: { initial: '4rem', medium: 4, large: 6 },
      marginTop: 1,
    };
    expect(handleResponsiveValues(values, lightTheme)).toMatchSnapshot();
  });
});
