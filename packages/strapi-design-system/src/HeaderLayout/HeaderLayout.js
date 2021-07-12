import React from 'react';
import PropTypes from 'prop-types';
import { H1, Subtitle, P, H2 } from '../Text';
import { Box } from '../Box';
import { Row } from '../Row';

export const HeaderLayout = ({
  navigationAction,
  primaryAction,
  secondaryAction,
  subtitle,
  title,
  sticky,
  ...props
}) => {
  if (sticky) {
    return (
      <Box paddingLeft={6} paddingRight={6} paddingTop={3} paddingBottom={3}>
        <Row justifyContent="space-between">
          <Row>
            <Box paddingRight={3}>{navigationAction}</Box>
            <Box>
              <H2 as="h1" {...props}>
                {title}
              </H2>
              <P small={true} textColor="neutral600">
                {subtitle}
              </P>
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
          <H1 {...props}>{title}</H1>
          {secondaryAction ? <Box paddingLeft={4}>{secondaryAction}</Box> : null}
        </Row>
        {primaryAction}
      </Row>
      <Subtitle textColor="neutral600" as="p">
        {subtitle}
      </Subtitle>
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
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
};
