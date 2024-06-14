import * as React from 'react';

import { useId } from '../../hooks/useId';
import { Box, BoxProps } from '../Box';

import { CardContext } from './CardContext';

export interface CardProps extends BoxProps {
  id?: string;
}

export const Card = ({ id, ...props }: CardProps) => {
  const generatedId = useId(id);

  const context = React.useMemo(() => ({ id: generatedId }), [generatedId]);

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
        tag="article"
        aria-labelledby={`${generatedId}-title`}
        {...props}
      />
    </CardContext.Provider>
  );
};
