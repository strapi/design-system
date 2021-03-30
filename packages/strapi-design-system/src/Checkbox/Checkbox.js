import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

export const Checkbox = React.forwardRef((props, ref) => {
  return <input type="checkbox" ref={ref} {...props} />;
});

Checkbox.displayName = Checkbox;

Checkbox.propTypes = {};
