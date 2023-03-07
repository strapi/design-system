import { useMemo } from 'react';

import { CardContext } from './CardContext';
import { Box, BoxProps } from '../Box';
import { useId } from '../hooks/useId';

export interface CardProps extends BoxProps {
  id?: string;
}

export const Card = ({ id, ...props }: CardProps) => {
  const generatedId = useId(id);

  const context = useMemo(() => ({ id: generatedId }), [generatedId]);

  return (
    <CardContext.Provider value={context}>
      <Box
        id={id}
        tabIndex={0}
        hasRadius
        background="neutral0"
        borderStyle="solid"
        borderWidth="1px"
        borderColor="neutral150"
        shadow="tableShadow"
        as="article"
        aria-labelledby={`${generatedId}-title`}
        {...props}
      />
    </CardContext.Provider>
  );
};
