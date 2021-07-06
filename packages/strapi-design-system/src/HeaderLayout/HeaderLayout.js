import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { Row } from '../Row';
import { Stack } from '../Stack';

export const HeaderLayout = ({ navigationAction, primaryAction, secondaryAction, subtitle, title, sticky }) => {
  return (
    <Box paddingLeft={10} paddingRight={10} paddingBottom={10} paddingTop={navigationAction ? 6 : 10}>
      {navigationAction ? <Box paddingBottom={3}>{navigationAction}</Box> : null}
      <Row justifyContent="space-between">
        <Row>
          {title}
          {secondaryAction ? <Box paddingLeft={4}>{secondaryAction}</Box> : null}
        </Row>
        {primaryAction}
      </Row>
      <Box paddingTop={1}>{subtitle}</Box>
    </Box>
  );
};

HeaderLayout.defaultProps = {
  navigationAction: undefined,
  primaryAction: undefined,
  secondaryAction: undefined,
  subtitle: undefined,
  sticky: undefined,
};

HeaderLayout.propTypes = {
  navigationAction: PropTypes.node,
  primaryAction: PropTypes.node,
  secondaryAction: PropTypes.node,
  sticky: PropTypes.bool,
  subtitle: PropTypes.node,
  title: PropTypes.node.isRequired,
};
