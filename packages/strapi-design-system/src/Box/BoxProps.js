import React from 'react';
import PropTypes from 'prop-types';

export const BoxProps = (props) => <div {...props} />;

BoxProps.defaultProps = {
  background: undefined,
  borderColor: undefined,
  color: undefined,
  hiddenS: false,
  hiddenXS: false,
  padding: undefined,
  paddingTop: undefined,
  paddingRight: undefined,
  paddingBottom: undefined,
  paddingLeft: undefined,
  hasRadius: false,
  shadow: undefined,
  children: null,
  shrink: undefined,
  grow: undefined,
  basis: undefined,
  flex: undefined,
  _hover: () => undefined,
};

BoxProps.propTypes = {
  _hover: PropTypes.func,
  background: PropTypes.string,
  basis: PropTypes.oneOfType([PropTypes.string, PropTypes.string]),
  borderColor: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  color: PropTypes.string,
  flex: PropTypes.oneOfType([PropTypes.string, PropTypes.string]),
  grow: PropTypes.oneOfType([PropTypes.string, PropTypes.string]),
  hasRadius: PropTypes.bool,
  hiddenS: PropTypes.bool,
  hiddenXS: PropTypes.bool,
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  paddingBottom: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  paddingLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  paddingRight: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  paddingTop: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  shadow: PropTypes.string,
  shrink: PropTypes.oneOfType([PropTypes.string, PropTypes.string]),
};
