import { BaseCheckboxSize } from './BaseCheckbox';

export const getCheckboxSize = ({ $size }: { $size: BaseCheckboxSize }) => {
  if ($size === 'M') {
    return '18px';
  }

  return '20px';
};
