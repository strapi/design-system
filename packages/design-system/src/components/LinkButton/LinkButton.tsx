import * as React from 'react';

import { styled } from 'styled-components';

import { focus } from '../../styles/buttons';
import { PolymorphicRef } from '../../types';
import { forwardRef } from '../../utilities/forwardRef';
import { BaseLink, BaseLinkComponent, BaseLinkProps } from '../BaseLink';
import { VARIANTS, ButtonSize, ButtonVariant } from '../Button/constants';
import { getDisabledStyle, getHoverStyle, getActiveStyle, getVariantStyle } from '../Button/utils';
import { Flex } from '../Flex';
import { Typography } from '../Typography';

type LinkButtonProps<C extends React.ElementType = 'a'> = BaseLinkProps<C> & {
  disabled?: boolean;
  endIcon?: React.ReactNode;
  size?: ButtonSize;
  startIcon?: React.ReactNode;
  variant?: ButtonVariant;
};

const LinkButton = forwardRef(
  <C extends React.ElementType = 'a'>(
    { variant = 'default', startIcon, endIcon, disabled = false, children, size = 'S', ...props }: LinkButtonProps<C>,
    ref: PolymorphicRef<C>,
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
        display="inline-flex"
        paddingBottom={paddingX}
        paddingLeft={paddingY}
        paddingRight={paddingY}
        paddingTop={paddingX}
        pointerEvents={disabled ? 'none' : undefined}
        {...props}
      >
        {startIcon && <Flex aria-hidden>{startIcon}</Flex>}

        <Typography variant={size === 'S' ? 'pi' : undefined} fontWeight="bold">
          {children}
        </Typography>

        {endIcon && <Flex aria-hidden>{endIcon}</Flex>}
      </LinkWrapper>
    );
  },
);

type LinkButtonComponent<C extends React.ElementType = 'a'> = (props: LinkButtonProps<C>) => React.ReactNode;

const LinkWrapper = styled<BaseLinkComponent>(BaseLink)<{ $variant: (typeof VARIANTS)[number] }>`
  gap: ${({ theme }) => theme.spaces[2]};

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

export { LinkButton };
export type { LinkButtonProps, LinkButtonComponent };
