import React from 'react';
import { Text } from '../Text';
import { useCard } from './CardContext';

export const CardTitle = (props) => {
  const { id } = useCard();
  return <Text id={`${id}-title`} textColor="neutral800" small highlighted as="div" {...props} />;
};

export const CardSubtitle = (props) => {
  return <Text {...props} textColor="neutral600" as="div" small />;
};
