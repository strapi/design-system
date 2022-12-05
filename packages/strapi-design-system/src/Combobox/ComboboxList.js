import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { maintainScrollVisibility } from './utils';

export const ComboboxList = ({ options, activeOptionRef }) => {
  useEffect(() => {
    if (activeOptionRef.current) {
      maintainScrollVisibility(activeOptionRef.current);
    }
  }, [activeOptionRef]);

  return options;
};

ComboboxList.defaultProps = {
  activeOptionRef: undefined,
};

ComboboxList.propTypes = {
  options: PropTypes.array.isRequired,
};
