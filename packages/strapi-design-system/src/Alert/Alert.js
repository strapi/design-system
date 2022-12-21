import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Information from '@strapi/icons/Information';
import CheckCircle from '@strapi/icons/CheckCircle';
import ExclamationMarkCircle from '@strapi/icons/ExclamationMarkCircle';
import Cross from '@strapi/icons/Cross';
import { Box } from '../Box';
import { Typography } from '../Typography';
import { Flex } from '../Flex';
import { handleBackgroundColor, handleBorderColor, handleIconColor } from './utils';
import { buttonFocusStyle } from '../themes/utils';

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

const AlertIcon = ({ variant, ...props }) => {
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

export const Alert = ({ title, children, variant, onClose, closeLabel, titleAs, action, ...props }) => {
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

Alert.defaultProps = {
  action: undefined,
  variant: 'default',
  titleAs: 'p',
};

Alert.propTypes = {
  /**
   * Render a React element below the body of an `Alert` (Mainly used to render a Link).
   */
  action: PropTypes.element,
  /**
   * The body of the `Alert` (Will be rendered under the `Alert` title).
   */
  children: PropTypes.node.isRequired,
  /**
   * Accessible label for the close icon button.
   */
  closeLabel: PropTypes.string.isRequired,
  /**
   * The callback invoked when click on the close icon button.
   */
  onClose: PropTypes.func.isRequired,
  /**
   * The title of the `Alert`.
   */
  title: PropTypes.string.isRequired,
  /**
   * Changes the element, as which a component will render (similar to styled-components).
   */
  titleAs: PropTypes.string,
  /**
   * `Alert` color variant.
   */
  variant: PropTypes.oneOf(['danger', 'success', 'default', 'warning']),
};

AlertIcon.propTypes = {
  variant: Alert.propTypes.variant.isRequired,
};
