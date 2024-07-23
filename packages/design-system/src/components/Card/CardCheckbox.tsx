import * as React from 'react';

import { Checkbox, CheckboxProps } from '../Checkbox';

import { CardAction } from './CardAction';
import { useCard } from './CardContext';

interface CardCheckboxProps extends CheckboxProps {}

const CardCheckbox = React.forwardRef<HTMLButtonElement, CardCheckboxProps>((props, forwardedRef) => {
  const { id } = useCard();

  return (
    <CardAction position="start">
      <Checkbox aria-labelledby={`${id}-title`} {...props} ref={forwardedRef} />
    </CardAction>
  );
});

export { CardCheckbox };
export type { CardCheckboxProps };
