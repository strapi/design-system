import { EASINGS } from '../styles/easings';

import { Sizes, sizes } from './sizes';

export interface CommonTheme {
  sizes: Sizes;
  zIndices: {
    navigation: 100;
    overlay: 300;
    modal: 310;
    dialog: 320;
    popover: 500;
    notification: 700;
    tooltip: 1000;
  };
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
  easings: typeof EASINGS;
}

export const commonTheme: CommonTheme = {
  sizes,
  zIndices: {
    navigation: 100,
    overlay: 300,
    modal: 310,
    dialog: 320,
    popover: 500,
    notification: 700,
    tooltip: 1000,
  },
  spaces: ['0px', '4px', '8px', '12px', '16px', '20px', '24px', '32px', '40px', '48px', '56px', '64px'],
  borderRadius: '4px',
  mediaQueries: {
    tablet: `@media (max-width: 1100px)`,
    mobile: `@media (max-width: 550px)`,
  },
  fontSizes: [`1.1rem`, `1.2rem`, `1.4rem`, '1.6rem', `1.8rem`, `3.2rem`],
  lineHeights: [1.14, 1.22, 1.25, 1.33, 1.43, 1.45, 1.5],
  fontWeights: {
    regular: 400,
    semiBold: 500,
    bold: 600,
  },
  easings: EASINGS,
};
