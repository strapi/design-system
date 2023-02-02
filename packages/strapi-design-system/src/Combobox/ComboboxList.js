import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { maintainScrollVisibility } from './utils';

/**
 * @deprecated
 * This component was deprecated in 1.6.3. It will be removed in the next major release 2.0.0.
 */

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
