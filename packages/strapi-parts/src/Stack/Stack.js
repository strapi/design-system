import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * Prevents these attributes from being spread on the DOM node
 */
const transientProps = {
  size: true,
};

const StackV = styled.div.withConfig({
  shouldForwardProp: (prop, defPropValFN) => !transientProps[prop] && defPropValFN(prop),
})`
  & > * {
    margin-top: 0;
    margin-bottom: 0;
  }

  & > * + * {
    margin-top: ${({ theme, size }) => theme.spaces[size]};
  }
`;

const StackH = styled.div.withConfig({
  shouldForwardProp: (prop, defPropValFN) => !transientProps[prop] && defPropValFN(prop),
})`
  display: flex;
  flex-direction: horizontal;
  & > * {
    margin-left: 0;
    margin-right: 0;
  }

  & > * + * {
    margin-left: ${({ theme, size }) => theme.spaces[size]};
  }
`;

export const Stack = ({ horizontal, size, ...props }) => {
  if (horizontal) {
    return <StackH size={size} {...props} />;
  }

  return <StackV size={size} {...props} />;
};

Stack.defaultProps = {
  horizontal: false,
};

Stack.propTypes = {
  horizontal: PropTypes.bool,
  size: PropTypes.number.isRequired,
};
