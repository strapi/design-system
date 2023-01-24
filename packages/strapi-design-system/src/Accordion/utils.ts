import { DefaultTheme } from 'styled-components';

import { AccordionVariant } from './Accordion';

export const getBackground = ({
  expanded,
  disabled,
  variant,
}: {
  expanded: boolean;
  disabled: boolean;
  variant: AccordionVariant;
}): keyof DefaultTheme['colors'] => {
  let boxBackground: keyof DefaultTheme['colors'] = 'neutral100';

  if (expanded) {
    boxBackground = 'primary100';
  } else if (disabled) {
    boxBackground = 'neutral150';
  } else if (variant === 'primary') {
    boxBackground = 'neutral0';
  }

  return boxBackground;
};
