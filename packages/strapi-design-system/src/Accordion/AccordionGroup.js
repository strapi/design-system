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
  /**
   * If defined, the component will show the error message at the bottom of the `AccordionGroup` and will hide all Accordion error messages children (in order to display only one error).
   */
  error: PropTypes.string,
  /**
   * Render a node a last child. Mainly used for an "Add new accordion" button
   */
  footer: PropTypes.node,
  /**
   * The label of the AccordionGroup
   */
  label: PropTypes.string,
  /**
   * Will render a node to the right of the label
   */
  labelAction: PropTypes.node,
};
