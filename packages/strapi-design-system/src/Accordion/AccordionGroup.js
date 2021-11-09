import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '../Box';
import { Typography } from '../Typography';
import { Flex } from '../Flex';
import { KeyboardNavigable } from '../KeyboardNavigable';

const AccordionFooter = styled(Box)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral200};
  border-right: 1px solid ${({ theme }) => theme.colors.neutral200};
  border-left: 1px solid ${({ theme }) => theme.colors.neutral200};
  border-radius: 0 0 ${({ theme }) => theme.borderRadius} ${({ theme }) => theme.borderRadius};
`;

const EnhancedGroup = styled(Box)`
  & > * {
    & > * {
      border-radius: unset;
    }
  }

  & > * {
    border-radius: unset;
    border-right: 1px solid ${({ theme }) => theme.colors.neutral200};
    border-left: 1px solid ${({ theme }) => theme.colors.neutral200};
    border-bottom: 1px solid ${({ theme }) => theme.colors.neutral200};
  }

  & > *:first-of-type {
    border-top: 1px solid ${({ theme }) => theme.colors.neutral200};
    border-radius: ${({ theme }) => theme.borderRadius} ${({ theme }) => theme.borderRadius} 0 0;
    & > * {
      border-radius: ${({ theme }) => theme.borderRadius} ${({ theme }) => theme.borderRadius} 0 0;
    }

    &:hover {
      border-top: 1px solid ${({ theme }) => theme.colors.primary600};
    }
  }

  & [data-strapi-expanded='true'] {
    border: 1px solid ${({ theme }) => theme.colors.primary600};
  }

  ${({ theme, footer }) => `
    &:not(${footer}) {
      & > *:last-of-type {
        border-radius: 0 0 ${theme.borderRadius} ${theme.borderRadius};
      }
    }
  `}
`;

const LabelAction = styled(Box)`
  svg path {
    fill: ${({ theme }) => theme.colors.neutral500};
  }
`;

export const AccordionGroup = ({ children, footer, label, labelAction, error }) => {
  const childrenArray = Children.toArray(children).map((child) => {
    return cloneElement(child, { hasErrorMessage: false });
  });

  return (
    <KeyboardNavigable attributeName="data-strapi-accordion-toggle">
      {label && (
        <Flex paddingBottom={1}>
          <Typography variant="pi" as="label" textColor="neutral800" fontWeight="bold">
            {label}
          </Typography>
          {labelAction && <LabelAction paddingLeft={1}>{labelAction}</LabelAction>}
        </Flex>
      )}
      <EnhancedGroup footer={footer}>{childrenArray}</EnhancedGroup>
      {footer && <AccordionFooter>{footer}</AccordionFooter>}
      {error && (
        <Box paddingTop={1}>
          <Typography variant="pi" textColor="danger600">
            {error}
          </Typography>
        </Box>
      )}
    </KeyboardNavigable>
  );
};

AccordionGroup.defaultProps = {
  footer: null,
  error: undefined,
  label: null,
  labelAction: undefined,
};

AccordionGroup.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
  footer: PropTypes.node,
  label: PropTypes.string,
  labelAction: PropTypes.node,
};
