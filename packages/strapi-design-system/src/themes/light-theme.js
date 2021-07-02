import { colorTokenObject } from './colors';
import { shadowTokenObject } from './shadows';

export const lightTheme = {
  colors: colorTokenObject.color,
  shadows: shadowTokenObject.shadow,
  zIndices: [5, 10, 15, 20], // TBD
  spaces: ['0px', '4px', '8px', '12px', '16px', '20px', '24px', '32px', '40px', '48px', '56px', '64px'],
  borderRadius: '4px',
  mediaQueries: {
    tablet: '@media (max-width: 1100px)',
    mobile: '@media (max-width: 550px)',
  },
};
