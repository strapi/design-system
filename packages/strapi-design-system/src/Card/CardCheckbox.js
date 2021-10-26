import React from 'react';
import { CardAction } from './CardAction';
import { BaseCheckbox } from '../BaseCheckbox';
import { useCard } from './CardContext';

export const CardCheckbox = (props) => {
  const { id } = useCard();

  return (
    <CardAction position="start">
      <BaseCheckbox aria-labelledby={`${id}-title`} {...props} />
    </CardAction>
  );
};
