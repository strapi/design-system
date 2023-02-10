import PropTypes from 'prop-types';

/**
 * @deprecated
 * This component was deprecated in 1.6.2. It will be removed in the next major release 2.0.0.
 */

export const ComboboxList = ({ options }) => {
  return options;
};

ComboboxList.propTypes = {
  options: PropTypes.array.isRequired,
};
