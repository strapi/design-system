import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { CardContext } from './CardContext';
import { genId } from '../helpers/genId';

export const Card = ({ id, ...props }) => {
  const idRef = useRef(id || genId());

  return (
    <CardContext.Provider value={{ id: idRef.current }}>
      <Box
        tabIndex={0}
        hasRadius
        background="neutral0"
        shadow="tableShadow"
        as="article"
        aria-labelledby={`card-title-${idRef.current}`}
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
