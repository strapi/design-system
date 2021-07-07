import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { Row } from '../Row';

export const HeaderLayout = ({ navigationAction, primaryAction, secondaryAction, subtitle, title, sticky }) => {
  if (sticky) {
    return (
      <Box paddingLeft={6} paddingRight={6} paddingTop={3} paddingBottom={3}>
        <Row justifyContent="space-between">
          <Row>
            <Box paddingRight={3}>{navigationAction}</Box>
            <Box>
              {title}
              {subtitle}
            </Box>
          </Row>
          <Row>
            {secondaryAction}
            {primaryAction ? <Box paddingLeft={2}>{primaryAction}</Box> : undefined}
          </Row>
        </Row>
      </Box>
    );
  }

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
      {subtitle}
    </Box>
  );
};

HeaderLayout.defaultProps = {
  navigationAction: undefined,
  primaryAction: undefined,
  secondaryAction: undefined,
  subtitle: undefined,
  sticky: false,
};

HeaderLayout.propTypes = {
  navigationAction: PropTypes.node,
  primaryAction: PropTypes.node,
  secondaryAction: PropTypes.node,
  sticky: PropTypes.bool,
  subtitle: PropTypes.node,
  title: PropTypes.node.isRequired,
};
