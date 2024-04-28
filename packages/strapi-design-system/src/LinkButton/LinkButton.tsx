import * as React from 'react';

import { styled } from 'styled-components';

import { BaseLink, BaseLinkProps } from '../BaseLink';
import { VARIANTS, BUTTON_SIZES } from '../Button/constants';
import { getDisabledStyle, getHoverStyle, getActiveStyle, getVariantStyle } from '../Button/utils';
import { Flex, FlexComponent } from '../Flex';
import { focus } from '../styles/buttons';
import { Typography } from '../Typography';

interface SharedLinkProps extends BaseLinkProps {
  disabled?: boolean;
  endIcon?: React.ReactNode;
  size?: (typeof BUTTON_SIZES)[number];
  startIcon?: React.ReactNode;
  variant?: (typeof VARIANTS)[number];
}

export type LinkButtonProps = SharedLinkProps;

const LinkWrapper = styled<FlexComponent<'a' | typeof BaseLink>>(Flex)<{ $variant: (typeof VARIANTS)[number] }>`
  ${focus}

  &[aria-disabled='true'] {
    pointer-events: none;
  }

  text-decoration: none;

  &[aria-disabled='true'] {
    ${getDisabledStyle}
    &:active {
      ${getDisabledStyle}
    }
  }

  &:hover {
    ${getHoverStyle}
  }

  &:active {
    ${getActiveStyle}
  }

  ${getVariantStyle}
`;

export const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    { variant = 'default', startIcon, endIcon, disabled = false, children, size = 'S', tag = BaseLink, ...props },
    ref,
  ) => {
    const paddingX = size === 'S' ? 2 : '10px';
    const paddingY = 4;

    return (
      <LinkWrapper
        ref={ref}
        aria-disabled={disabled}
        $variant={variant}
        background="buttonPrimary600"
        borderColor="buttonPrimary600"
        hasRadius
        gap={2}
        inline
        paddingBottom={paddingX}
        paddingLeft={paddingY}
        paddingRight={paddingY}
        paddingTop={paddingX}
        pointerEvents={disabled ? 'none' : undefined}
        {...props}
        tag={tag || BaseLink}
      >
        {startIcon && <Flex aria-hidden>{startIcon}</Flex>}

        <Typography variant={size === 'S' ? 'pi' : undefined} fontWeight="bold" textColor="buttonNeutral0">
          {children}
        </Typography>

        {endIcon && <Flex aria-hidden>{endIcon}</Flex>}
      </LinkWrapper>
    );
  },
);

LinkButton.displayName = 'LinkButton';
