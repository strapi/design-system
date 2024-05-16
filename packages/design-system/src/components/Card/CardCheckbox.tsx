import { Checkbox, CheckboxProps } from '../Checkbox';

import { CardAction } from './CardAction';
import { useCard } from './CardContext';

interface CardCheckboxProps extends CheckboxProps {}

const CardCheckbox = (props: CardCheckboxProps) => {
  const { id } = useCard();

  return (
    <CardAction position="start">
      <Checkbox aria-labelledby={`${id}-title`} {...props} />
    </CardAction>
  );
};

export { CardCheckbox };
export type { CardCheckboxProps };
