import React from 'react';
import { Typography } from '../Typography';
import { useCard } from './CardContext';

export const CardTitle = (props) => {
  const { id } = useCard();

  return <Typography variant="pi" id={`${id}-title`} textColor="neutral800" fontWeight="bold" as="div" {...props} />;
};

export const CardSubtitle = (props) => {
  return <Typography variant="pi" {...props} textColor="neutral600" as="div" />;
};
