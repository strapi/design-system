import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '../Box';

const IconWrapper = styled(Box)`
  path {
    fill: ${({ color, theme }) => theme.colors[color]};
  }
  ${({ theme, colors }) => colors(theme)}
`;

export const Icon = React.forwardRef((props, ref) => {
  return <IconWrapper ref={ref} {...props} />;
});

Icon.displayName = 'Icon';

Icon.defaultProps = {
  color: 'neutral600',
  colors: () => undefined,
};

Icon.propTypes = {
  color: PropTypes.string,
  colors: PropTypes.func,
};
