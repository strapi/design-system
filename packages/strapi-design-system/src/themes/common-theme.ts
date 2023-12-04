import { Sizes, sizes } from './sizes';

export interface CommonTheme {
  sizes: Sizes;
  zIndices: [5, 10, 15, 20];
  spaces: [
    '0rem',
    '0.4rem',
    '0.8rem',
    '1.2rem',
    '1.6rem',
    '2rem',
    '2.4rem',
    '3.2rem',
    '4rem',
    '4.8rem',
    '5.6rem',
    '6.4rem',
  ];
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
  spaces: [
    '0rem',
    '0.4rem',
    '0.8rem',
    '1.2rem',
    '1.6rem',
    '2rem',
    '2.4rem',
    '3.2rem',
    '4rem',
    '4.8rem',
    '5.6rem',
    '6.4rem',
  ],
  borderRadius: '4px',
  mediaQueries: {
    tablet: `@media (max-width: 110rem)`,
    mobile: `@media (max-width: 55rem)`,
  },
  fontSizes: [`1.1rem`, `1.2rem`, `1.4rem`, '1.6rem', `1.8rem`, `3.2rem`],
  lineHeights: [1.14, 1.22, 1.25, 1.33, 1.43, 1.45, 1.5],
  fontWeights: {
    regular: 400,
    semiBold: 500,
    bold: 600,
  },
};
