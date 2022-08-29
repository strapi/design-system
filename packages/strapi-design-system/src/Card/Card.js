import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { CardContext } from './CardContext';
import { useId } from '../helpers/useId';

export const Card = ({ id, ...props }) => {
  const generatedId = useId('card', id);

  return (
    <CardContext.Provider value={{ id: generatedId }}>
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

Card.defaultProps = {
  id: undefined,
};

Card.propTypes = {
  id: PropTypes.string,
};
