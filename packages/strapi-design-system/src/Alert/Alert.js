import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AlertInfoIcon from '@strapi/icons/AlertInfoIcon';
import AlertSucessIcon from '@strapi/icons/AlertSucessIcon';
import AlertWarningIcon from '@strapi/icons/AlertWarningIcon';
import CloseAlertIcon from '@strapi/icons/CloseAlertIcon';
import { Box } from '../Box';
import { Text, P } from '../Text';
import { Row } from '../Row';
import { handleBackgroundColor, handleBorderColor, handleIconColor } from './utils';

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
`;

const AlertIconWrapper = styled(Box)`
  font-size: ${20 / 16}rem;
  svg path {
    fill: ${handleIconColor};
  }
`;

const AlertIcon = ({ variant, ...props }) => {
  if (variant === 'success') {
    return <AlertSucessIcon {...props} />;
  }

  if (variant === 'danger') {
    return <AlertWarningIcon {...props} />;
  }

  return <AlertInfoIcon {...props} />;
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
      <Row alignItems="flex-start">
        <AlertIconWrapper paddingRight={3} variant={variant}>
          <AlertIcon variant={variant} aria-hidden={true} />
        </AlertIconWrapper>
        <AlertBody role={variant === 'danger' ? 'alert' : 'status'}>
          <Box paddingBottom={2} paddingRight={1}>
            <Text highlighted={true} textColor="neutral800" as={titleAs}>
              {title}
            </Text>
          </Box>

          <Box paddingBottom={action ? 2 : 5} paddingRight={2}>
            <P textColor="neutral800">{children}</P>
          </Box>

          {action && (
            <ActionBox paddingBottom={5} variant={variant}>
              {action}
            </ActionBox>
          )}
        </AlertBody>

        <CloseButton onClick={onClose} aria-label={closeLabel}>
          <CloseAlertIcon aria-hidden={true} />
        </CloseButton>
      </Row>
    </AlertWrapper>
  );
};

Alert.defaultProps = {
  action: undefined,
  variant: 'default',
  titleAs: 'p',
};

Alert.propTypes = {
  action: PropTypes.element,
  children: PropTypes.string.isRequired,
  closeLabel: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  titleAs: PropTypes.string,
  variant: PropTypes.oneOf(['danger', 'success', 'default']),
};

AlertIcon.propTypes = {
  variant: Alert.propTypes.variant,
};
