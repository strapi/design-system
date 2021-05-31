import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { genId } from '../helpers/genId';
import { FieldContext } from './FieldContext';

export const Field = ({ children, name, error, hint, id }) => {
  const idRef = useRef(id || genId());

  return (
    <div>
      <FieldContext.Provider value={{ name, id: idRef.current, error, hint }}>{children}</FieldContext.Provider>
    </div>
  );
};

Field.defaultProps = {
  error: undefined,
  hint: undefined,
  id: undefined,
};

Field.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
  hint: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
};
