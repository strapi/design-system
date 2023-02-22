import { DefaultTheme } from 'styled-components';

import type { AlertVariant } from './Alert';

interface StyledProps {
  theme: DefaultTheme;
  variant: AlertVariant;
}

export const handleBackgroundColor = ({ theme, variant }: StyledProps) => {
  if (variant === 'danger') {
    return theme.colors.danger100;
  }

  if (variant === 'success') {
    return theme.colors.success100;
  }

  if (variant === 'warning') {
    return theme.colors.warning100;
  }

  return theme.colors.primary100;
};

export const handleBorderColor = ({ theme, variant }: StyledProps) => {
  if (variant === 'danger') {
    return theme.colors.danger200;
  }

  if (variant === 'success') {
    return theme.colors.success200;
  }

  if (variant === 'warning') {
    return theme.colors.warning200;
  }

  return theme.colors.primary200;
};

export const handleIconColor = ({ theme, variant }: StyledProps) => {
  if (variant === 'danger') {
    return theme.colors.danger700;
  }

  if (variant === 'success') {
    return theme.colors.success700;
  }

  if (variant === 'warning') {
    return theme.colors.warning700;
  }

  return theme.colors.primary700;
};
