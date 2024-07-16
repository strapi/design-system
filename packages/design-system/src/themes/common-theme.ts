import { EASINGS, TIMINGS, TRANSITIONS } from '../styles/motion';

import { Sizes, sizes } from './sizes';

type Breakpoint = `@media(min-width: ${number}px)`;

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
  breakpoints: {
    initial: Breakpoint;
    small: Breakpoint;
    medium: Breakpoint;
    large: Breakpoint;
  };
  borderRadius: '4px';
  fontSizes: [string, string, string, string, string, string];
  lineHeights: [1.14, 1.22, 1.25, 1.33, 1.43, 1.45, 1.5];
  fontWeights: {
    regular: 400;
    semiBold: 500;
    bold: 600;
  };
  motion: {
    easings: typeof EASINGS;
    timings: typeof TIMINGS;
  };
  transitions: typeof TRANSITIONS;
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
  breakpoints: {
    initial: '@media(min-width: 0px)',
    small: '@media(min-width: 520px)',
    medium: '@media(min-width: 768px)',
    large: '@media(min-width: 1280px)',
  },
  fontSizes: [`1.1rem`, `1.2rem`, `1.4rem`, '1.6rem', `1.8rem`, `3.2rem`],
  lineHeights: [1.14, 1.22, 1.25, 1.33, 1.43, 1.45, 1.5],
  fontWeights: {
    regular: 400,
    semiBold: 500,
    bold: 600,
  },
  transitions: TRANSITIONS,
  motion: {
    easings: EASINGS,
    timings: TIMINGS,
  },
};
