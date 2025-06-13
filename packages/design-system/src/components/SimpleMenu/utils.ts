import { DefaultTheme } from 'styled-components';

import type { ItemVariant } from './Menu';

export const getBackgroundColorHover = (variant: ItemVariant): keyof DefaultTheme['colors'] => {
  switch (variant) {
    case 'danger':
      return 'danger100';
    default:
      return 'primary100';
  }
};

export const getTextColor = (variant: ItemVariant, disabled?: boolean): keyof DefaultTheme['colors'] => {
  switch (variant) {
    case 'danger':
      return disabled ? 'danger500' : 'danger700';
    default:
      return disabled ? 'neutral500' : 'neutral800';
  }
};

export const getIconColor = (variant: ItemVariant, disabled?: boolean): keyof DefaultTheme['colors'] => {
  switch (variant) {
    case 'danger':
      return disabled ? 'danger500' : 'danger700';
    default:
      return disabled ? 'neutral300' : 'neutral500';
  }
};
