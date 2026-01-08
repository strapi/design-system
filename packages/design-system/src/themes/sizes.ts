import type { ResponsiveProperty } from '../helpers/handleResponsiveValues';

export interface Sizes {
  accordions: {
    S: string;
    M: string;
  };
  button: {
    S: ResponsiveProperty<string>;
    M: ResponsiveProperty<string>;
    L: ResponsiveProperty<string>;
  };
}
export const sizes: Sizes = {
  accordions: {
    S: `4.8rem`,
    M: `8.8rem`,
  },
  button: {
    S: {
      initial: `4rem`,
      medium: `3.2rem`,
    },
    M: {
      initial: `4.4rem`,
      medium: `3.6rem`,
    },
    L: {
      initial: `4.8rem`,
      medium: `4rem`,
    },
  },
};
