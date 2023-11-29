export interface Sizes {
  input: {
    S: string;
    M: string;
  };
  accordions: {
    S: string;
    M: string;
  };
  badge: {
    S: string;
    M: string;
  };
  button: {
    S: string;
    M: string;
    L: string;
  };
}
export const sizes: Sizes = {
  input: {
    S: `3.2rem`,
    M: `4rem`,
  },
  accordions: {
    S: `4.8rem`,
    M: `8.8rem`,
  },
  badge: {
    S: `1.6rem`,
    M: `2.4rem`,
  },
  button: {
    S: `3.2rem`,
    M: `3.6rem`,
    L: `4rem`,
  },
};

export type InputSizes = keyof Sizes['input'];
