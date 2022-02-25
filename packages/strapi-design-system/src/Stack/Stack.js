import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '../Box';
import { Flex } from '../Flex';

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
    margin-top: ${({ theme, spacing }) => theme.spaces[spacing]};
  }
`;

const StackH = styled(Flex).withConfig({
  shouldForwardProp: (prop, defPropValFN) => !transientProps[prop] && defPropValFN(prop),
})`
  & > * {
    margin-left: 0;
    margin-right: 0;
  }

  & > * + * {
    margin-left: ${({ theme, spacing }) => theme.spaces[spacing]};
  }
`;

export const Stack = forwardRef(({ horizontal, spacing, ...props }, ref) => {
  if (horizontal) {
    return <StackH ref={ref} spacing={spacing} {...props} />;
  }

  return <StackV ref={ref} spacing={spacing} {...props} />;
});

Stack.displayName = 'Stack';

Stack.defaultProps = {
  horizontal: false,
};

Stack.propTypes = {
  /**
   * If `true`, align the `Stack` item horizontally.
   */
  horizontal: PropTypes.bool,
  /**
   * The space between stack item.
   * See [theme.spaces](https://design-system-git-main-strapijs.vercel.app/?path=/story/design-system-components-lighttheme--spaces)
   */
  spacing: PropTypes.number.isRequired,
};
