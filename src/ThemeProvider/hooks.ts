import { useTheme as useStyledTheme } from 'styled-components';
import { Theme } from './types';

export const useTheme = (): Theme => {
  return useStyledTheme() as Theme;
};
