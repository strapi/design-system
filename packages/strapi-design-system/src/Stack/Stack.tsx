import { forwardRef } from 'react';

import styled, { DefaultTheme } from 'styled-components';

import { Flex, FlexProps } from '../Flex';
import { extractStyleFromTheme } from '../helpers/theme';

/**
 * Prevents these attributes from being spread on the DOM node
 */
const transientProps: Partial<Record<keyof StackProps, boolean>> = {
  size: true,
  spacing: true,
};

const StackV = styled(Flex).withConfig<Omit<StackProps, 'size' | 'horizontal'>>({
  shouldForwardProp: (prop, defPropValFN) => !transientProps[prop as keyof StackProps] && defPropValFN(prop),
})`
  & > * {
    margin-top: 0;
    margin-bottom: 0;
  }

  & > * + * {
    margin-top: ${({ theme, spacing }) => extractStyleFromTheme(theme.spaces, spacing, undefined)};
  }
`;

const StackH = styled(Flex).withConfig<Omit<StackProps, 'size' | 'horizontal'>>({
  shouldForwardProp: (prop, defPropValFN) => !transientProps[prop as keyof StackProps] && defPropValFN(prop),
})`
  & > * {
    margin-left: 0;
    margin-right: 0;
  }

  & > * + * {
    margin-left: ${({ theme, spacing }) => extractStyleFromTheme(theme.spaces, spacing, undefined)};
  }
`;

export interface StackProps extends FlexProps {
  /**
   * If `true`, align the `Stack` item horizontally.
   */
  horizontal?: boolean;
  /**
   * @preserve
   * @deprecated use `spacing` instead
   * The space between stack item.
   */
  size?: keyof DefaultTheme['spaces'];
  /**
   * The space between stack item.
   * See [theme.spaces](https://design-system-git-main-strapijs.vercel.app/?path=/story/design-system-components-theme--spaces)
   */
  spacing?: keyof DefaultTheme['spaces'];
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(({ horizontal = false, spacing, size, ...props }, ref) => {
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
