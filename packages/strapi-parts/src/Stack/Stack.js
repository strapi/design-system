import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '../Box';
import { Row } from '../Row';

/**
 * Prevents these attributes from being spread on the DOM node
 */
const transientProps = {
  size: true,
};

const StackV = styled(Box).withConfig({
  shouldForwardProp: (prop, defPropValFN) => !transientProps[prop] && defPropValFN(prop),
})`
  display: flex;
  flex-direction: column;

  & > * {
    margin-top: 0;
    margin-bottom: 0;
  }

  & > * + * {
    margin-top: ${({ theme, size }) => theme.spaces[size]};
  }
`;

const StackH = styled(Row).withConfig({
  shouldForwardProp: (prop, defPropValFN) => !transientProps[prop] && defPropValFN(prop),
})`
  & > * {
    margin-left: 0;
    margin-right: 0;
  }

  & > * + * {
    margin-left: ${({ theme, size }) => theme.spaces[size]};
  }
`;

export const Stack = forwardRef(({ horizontal, size, ...props }, ref) => {
  if (horizontal) {
    return <StackH ref={ref} size={size} {...props} />;
  }

  return <StackV ref={ref} size={size} {...props} />;
});

Stack.displayName = 'Stack';

Stack.defaultProps = {
  horizontal: false,
};

Stack.propTypes = {
  horizontal: PropTypes.bool,
  size: PropTypes.number.isRequired,
};
