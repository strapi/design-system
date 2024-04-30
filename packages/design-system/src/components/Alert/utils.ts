import { DefaultTheme } from 'styled-components';

import type { AlertVariant } from './Alert';

interface StyledProps {
  theme: DefaultTheme;
  $variant: AlertVariant;
}

export const handleBackgroundColor = (variant: AlertVariant): keyof DefaultTheme['colors'] => {
  switch (variant) {
    case 'danger':
      return 'danger100';
    case 'success':
      return 'success100';
    case 'warning':
      return 'warning100';
    default:
      return 'primary100';
  }
};

// border-color is always 1 shade darker than background-color
export const handleBorderColor = (variant: AlertVariant): keyof DefaultTheme['colors'] => {
  return handleBackgroundColor(variant).replace('100', '200') as keyof DefaultTheme['colors'];
};

export const handleIconColor = ({ theme, $variant }: StyledProps) => {
  if ($variant === 'danger') {
    return theme.colors.danger700;
  }

  if ($variant === 'success') {
    return theme.colors.success700;
  }

  if ($variant === 'warning') {
    return theme.colors.warning700;
  }

  return theme.colors.primary700;
};
