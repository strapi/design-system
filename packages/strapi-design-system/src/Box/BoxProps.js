import React from 'react';
import PropTypes from 'prop-types';

export const BoxProps = (props) => <div {...props} />;

export const boxDefaultProps = {
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
export const boxPropTypes = {
  /**
   * JavaScript hover handler
   */
  _hover: PropTypes.func,
  /**
   * Background color
   */
  background: PropTypes.string,
  /**
   * Flex basis
   */
  basis: PropTypes.oneOfType([PropTypes.string, PropTypes.string]),
  /**
   * Border color
   */
  borderColor: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  /**
   * Text color
   */
  color: PropTypes.string,
  /**
   * Flex
   */
  flex: PropTypes.oneOfType([PropTypes.string, PropTypes.string]),
  /**
   * Flex grow
   */
  grow: PropTypes.oneOfType([PropTypes.string, PropTypes.string]),
  /**
   * If `true`, will add a border radius to the `Box`
   */
  hasRadius: PropTypes.bool,
  /**
   * Responsive hiding. If `true`, will the `Box` for tablet size screens.
   */
  hiddenS: PropTypes.bool,
  /**
   * Responsive hiding. If `true`, will the `Box` for mobile size screens.
   */
  hiddenXS: PropTypes.bool,
  /**
   * Padding. Supports responsive values
   */
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  /**
   * Padding bottom. Supports responsive values
   */
  paddingBottom: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  /**
   * Padding left. Supports responsive values
   */
  paddingLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  /**
   * Padding right. Supports responsive values
   */
  paddingRight: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  /**
   * Padding top. Supports responsive values
   */
  paddingTop: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  /**
   * Shadow name (see `theme.shadows`)
   */
  shadow: PropTypes.string,
  /**
   * Flex shrink
   */
  shrink: PropTypes.oneOfType([PropTypes.string, PropTypes.string]),
};

BoxProps.defaultProps = boxDefaultProps;
BoxProps.propTypes = boxPropTypes;
