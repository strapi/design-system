import * as React from 'react';

import { Information, CheckCircle, ExclamationMarkCircle, Cross } from '@strapi/icons';
import styled from 'styled-components';

import { handleBackgroundColor, handleBorderColor, handleIconColor } from './utils';
import { Box, BoxProps } from '../Box';
import { Flex } from '../Flex';
import { buttonFocusStyle } from '../themes/utils';
import { Typography } from '../Typography';

const AlertBody = styled(Box)`
  flex: 1;
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
`;

const AlertWrapper = styled(Box)`
  border: 1px solid ${handleBorderColor};
  background: ${handleBackgroundColor};
  box-shadow: ${({ theme }) => theme.shadows.filterShadow};
`;

const CloseButton = styled.button`
  border: none;
  background: transparent;
  font-size: ${12 / 16}rem;
  svg path {
    fill: ${({ theme }) => theme.colors.neutral700};
  }
  margin-top: ${({ theme }) => theme.spaces[1]};
  ${buttonFocusStyle};
`;

const AlertIconWrapper = styled(Box)`
  font-size: ${20 / 16}rem;
  svg path {
    fill: ${handleIconColor};
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
    return <ExclamationMarkCircle {...props} />;
  }

  return <Information {...props} />;
};

const ActionBox = styled(Box)`
  // Checked with the designers, validated
  padding-top: 1px;

  & a > span {
    color: ${handleIconColor};

    svg path {
      fill: ${handleIconColor};
    }
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
  onClose: () => void;
  /**
   * The title of the `Alert`.
   */
  title: string;
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
    <AlertWrapper hasRadius paddingLeft={5} paddingRight={6} paddingTop={5} variant={variant} {...props}>
      <Flex alignItems="flex-start">
        <AlertIconWrapper paddingRight={3} variant={variant}>
          <AlertIcon variant={variant} aria-hidden />
        </AlertIconWrapper>
        <AlertBody role={variant === 'danger' ? 'alert' : 'status'}>
          <Box paddingBottom={2} paddingRight={1}>
            <Typography fontWeight="bold" textColor="neutral800" as={titleAs}>
              {title}
            </Typography>
          </Box>

          <Box paddingBottom={action ? 2 : 5} paddingRight={2}>
            <Typography as="p" textColor="neutral800">
              {children}
            </Typography>
          </Box>

          {action && (
            <ActionBox paddingBottom={5} variant={variant}>
              {action}
            </ActionBox>
          )}
        </AlertBody>

        <CloseButton onClick={onClose} aria-label={closeLabel}>
          <Cross aria-hidden />
        </CloseButton>
      </Flex>
    </AlertWrapper>
  );
};
