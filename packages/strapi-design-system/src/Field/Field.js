import React from 'react';
import PropTypes from 'prop-types';
import { FieldContext } from './FieldContext';
import { useId } from '../helpers/useId';

export const Field = ({ children, name, error, hint, id, required, ...props }) => {
  const generatedId = useId('field', id);

  return (
    <div {...props}>
      <FieldContext.Provider value={{ name, id: generatedId, error, hint, required }}>{children}</FieldContext.Provider>
    </div>
  );
};

Field.defaultProps = {
  error: undefined,
  hint: undefined,
  id: undefined,
  name: undefined,
  required: false,
};

Field.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  hint: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  required: PropTypes.bool,
};
