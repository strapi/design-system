export const handleBackgroundColor = ({ theme, variant }) => {
  if (variant === 'danger') {
    return theme.colors.danger100;
  }

  if (variant === 'success') {
    return theme.colors.success100;
  }

  return theme.colors.primary100;
};

export const handleBorderColor = ({ theme, variant }) => {
  if (variant === 'danger') {
    return theme.colors.danger200;
  }

  if (variant === 'success') {
    return theme.colors.success200;
  }

  return theme.colors.primary200;
};

export const handleIconColor = ({ theme, variant }) => {
  if (variant === 'danger') {
    return theme.colors.danger700;
  }

  if (variant === 'success') {
    return theme.colors.success700;
  }

  return theme.colors.primary700;
};
