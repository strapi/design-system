import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Flex } from '../Flex';

/**
 * Prevents these attributes from being spread on the DOM node
 */
const transientProps = {
  size: true,
};

const StackV = styled(Flex).withConfig({
  shouldForwardProp: (prop, defPropValFN) => !transientProps[prop] && defPropValFN(prop),
})`
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

export const Stack = forwardRef(({ horizontal, spacing, size, ...props }, ref) => {
  if (size) {
    console.warn(
      'Deprecation warning: Usage of "size" prop in Stack component is deprecated. This is discouraged and will be removed in the next major release. Please use "spacing" instead',
    );
  }

  if (horizontal) {
    return <StackH ref={ref} spacing={spacing || size} {...props} />;
  }

  return <StackV direction="column" alignItems="stretch" ref={ref} spacing={spacing || size} {...props} />;
});

Stack.displayName = 'Stack';

Stack.defaultProps = {
  horizontal: false,
  size: undefined,
  spacing: undefined,
};

Stack.propTypes = {
  /**
   * If `true`, align the `Stack` item horizontally.
   */
  horizontal: PropTypes.bool,
  /**
   * DEPRECATED: The space between stack item.
   */
  size: PropTypes.number,
  /**
   * The space between stack item.
   * See [theme.spaces](https://design-system-git-main-strapijs.vercel.app/?path=/story/design-system-components-theme--spaces)
   */
  spacing: PropTypes.number,
};
