export const getBackground = ({ expanded, disabled, variant }) => {
  const boxBackground = expanded
    ? 'primary100'
    : disabled
    ? 'neutral150'
    : variant === 'primary'
    ? 'neutral0'
    : 'neutral100';

  return boxBackground;
};
