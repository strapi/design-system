/**
 * TODO: Look into why setting the type to `BaseCheckboxSize` makes the
 * component in `BaseCheckbox` loose all type information to do with the theme.
 */
export const getCheckboxSize = ({ size }: { size: any }) => {
  if (size === 'M') {
    return '18px';
  }

  return '20px';
};
