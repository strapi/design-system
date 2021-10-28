export const getBackground = ({ expanded, disabled, variant }) => {
  let boxBackground;

  if (expanded) {
    boxBackground = 'primary100';
  } else if (disabled) {
    boxBackground = 'neutral150';
  } else if (variant === 'primary') {
    boxBackground = 'neutral0';
  } else {
    boxBackground = 'neutral100';
  }

  return boxBackground;
};
