import * as React from 'react';

import { Information, CheckCircle, WarningCircle, Cross } from '@strapi/icons';
import { styled } from 'styled-components';

import { Box, BoxComponent, BoxProps } from '../../primitives/Box';
import { Flex, FlexComponent } from '../../primitives/Flex';
import { Typography } from '../../primitives/Typography';
import { focus } from '../../styles/buttons';
import { AccessibleIcon } from '../../utilities/AccessibleIcon';

import { handleBackgroundColor, handleBorderColor, handleIconColor } from './utils';

const CloseButton = styled<BoxComponent<'button'>>(Box)`
  ${focus};
`;

const AlertIconWrapper = styled<FlexComponent>(Flex)<{ $variant: AlertVariant }>`
  svg {
    height: 100%;
    width: 100%;

    path {
      fill: ${handleIconColor};
    }
  }
`;

interface AlertIconProps extends React.SVGProps<SVGSVGElement> {
  variant: AlertVariant;
}

const AlertIcon = ({ variant, ...props }: AlertIconProps) => {
  if (variant === 'success') {
    return <CheckCircle {...props} />;
  }

  if (variant === 'danger' || variant === 'warning') {
    return <WarningCircle {...props} />;
  }

  return <Information {...props} />;
};

const ActionBox = styled<BoxComponent>(Box)<{ $variant: AlertVariant }>`
  & a > span {
    color: ${handleIconColor};
  }

  svg path {
    fill: ${handleIconColor};
  }
`;

export type AlertVariant = 'success' | 'danger' | 'default' | 'warning';

export interface AlertProps extends BoxProps {
  /**
   * Render a React element below the body of an `Alert` (Mainly used to render a Link).
   */
  action?: React.ReactNode;
  /**
   * The body of the `Alert` (Will be rendered under the `Alert` title).
   */
  children: React.ReactNode;
  /**
   * Accessible label for the close icon button.
   */
  closeLabel: string;
  /**
   * The callback invoked when click on the close icon button.
   */
  onClose?: () => void;
  /**
   * The title of the `Alert`.
   */
  title?: string;
  /**
   * Changes the element, as which a component will render (similar to styled-components).
   */
  titleAs?: React.ElementType;
  /**
   * `Alert` color variant.
   */
  variant?: AlertVariant;
}

export const Alert = ({
  title,
  children,
  variant = 'default',
  onClose,
  closeLabel,
  titleAs = 'p',
  action,
  ...props
}: AlertProps) => {
  return (
    <Flex
      alignItems="flex-start"
      background={handleBackgroundColor(variant)}
      borderColor={handleBorderColor(variant)}
      shadow="filterShadow"
      gap={3}
      hasRadius
      padding={5}
      paddingRight={6}
      {...props}
    >
      <AlertIconWrapper height="2rem" shrink={0} $variant={variant} width="2rem">
        <AlertIcon aria-hidden variant={variant} />
      </AlertIconWrapper>

      <Flex
        alignItems="start"
        gap={action ? 2 : 1}
        wrap="wrap"
        role={variant === 'danger' ? 'alert' : 'status'}
        width="100%"
      >
        {title && (
          <Typography fontWeight="bold" textColor="neutral800" tag={titleAs}>
            {title}
          </Typography>
        )}

        <Typography tag="p" textColor="neutral800">
          {children}
        </Typography>

        {action && <ActionBox $variant={variant}>{action}</ActionBox>}
      </Flex>

      <CloseButton
        tag="button"
        background="transparent"
        borderColor={undefined}
        height="1.6rem"
        width="1.6rem"
        marginTop={1}
        onClick={onClose}
        color="neutral700"
      >
        <AccessibleIcon label={closeLabel}>
          <Cross />
        </AccessibleIcon>
      </CloseButton>
    </Flex>
  );
};
