import { Sizes, sizes } from './sizes';

export interface CommonTheme {
  sizes: Sizes;
  zIndices: [5, 10, 15, 20];
  spaces: ['0px', '4px', '8px', '12px', '16px', '20px', '24px', '32px', '40px', '48px', '56px', '64px'];
  borderRadius: '4px';
  mediaQueries: {
    tablet: string;
    mobile: string;
  };
  fontSizes: [string, string, string, string, string, string];
  lineHeights: [1.14, 1.22, 1.25, 1.33, 1.43, 1.45, 1.5];
  fontWeights: {
    regular: 400;
    semiBold: 500;
    bold: 600;
  };
}

export const commonTheme: CommonTheme = {
  sizes,
  zIndices: [5, 10, 15, 20], // TBD
  spaces: ['0px', '4px', '8px', '12px', '16px', '20px', '24px', '32px', '40px', '48px', '56px', '64px'],
  borderRadius: '4px',
  mediaQueries: {
    tablet: `@media (max-width: ${1100 / 16}rem)`,
    mobile: `@media (max-width: ${550 / 16}rem)`,
  },
  fontSizes: [`${11 / 16}rem`, `${12 / 16}rem`, `${14 / 16}rem`, '1rem', `${18 / 16}rem`, `${32 / 16}rem`],
  lineHeights: [1.14, 1.22, 1.25, 1.33, 1.43, 1.45, 1.5],
  fontWeights: {
    regular: 400,
    semiBold: 500,
    bold: 600,
  },
};
