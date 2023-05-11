import { ThemeSizes } from 'styled-components';

export const sizes: ThemeSizes = {
  input: {
    S: `${32 / 16}rem`,
    M: `${40 / 16}rem`,
  },
  accordions: {
    S: `${48 / 16}rem`,
    M: `${88 / 16}rem`,
  },
  badge: {
    S: `${16 / 16}rem`,
    M: `${24 / 16}rem`,
  },
  button: {
    S: `${32 / 16}rem`,
    M: `${36 / 16}rem`,
    L: `${40 / 16}rem`,
  },
};

export type InputSizes = keyof ThemeSizes['input'];
