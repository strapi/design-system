import { BaseCheckbox, BaseCheckboxProps } from '../BaseCheckbox';

import { CardAction } from './CardAction';
import { useCard } from './CardContext';

export type CardCheckboxProps = BaseCheckboxProps;

export const CardCheckbox = (props: CardCheckboxProps) => {
  const { id } = useCard();

  return (
    <CardAction position="start">
      <BaseCheckbox aria-labelledby={`${id}-title`} {...props} />
    </CardAction>
  );
};
