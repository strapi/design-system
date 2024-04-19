import * as React from 'react';

import { Information, CheckCircle, WarningCircle, Cross } from '@strapi/icons';
import styled from 'styled-components';

import { handleBackgroundColor, handleBorderColor, handleIconColor } from './utils';
import { Box, BoxProps } from '../Box';
import { Flex } from '../Flex';
import { buttonFocusStyle } from '../themes/utils';
import { Typography } from '../Typography';
import { AccessibleIcon } from '../utilities/AccessibleIcon';

const CloseButton = styled(Box)`
  ${buttonFocusStyle};
`;

const AlertIconWrapper = styled(Flex)`
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

const ActionBox = styled(Box)`
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
  titleAs?: string | React.ComponentType<any>;
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
      boxShadow="filterShadow"
      gap={3}
      hasRadius
      padding={5}
      paddingRight={6}
      variant={variant}
      {...props}
    >
      <AlertIconWrapper height="2rem" shrink={0} variant={variant} width="2rem">
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
          <Typography fontWeight="bold" textColor="neutral800" as={titleAs}>
            {title}
          </Typography>
        )}

        <Typography as="p" textColor="neutral800">
          {children}
        </Typography>

        {action && <ActionBox variant={variant}>{action}</ActionBox>}
      </Flex>

      <CloseButton
        as="button"
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
