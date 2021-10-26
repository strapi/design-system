import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '../Box';
import { KeyboardNavigable } from '../KeyboardNavigable';

const AccordionFooter = styled(Box)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral200};
  border-right: 1px solid ${({ theme }) => theme.colors.neutral200};
  border-left: 1px solid ${({ theme }) => theme.colors.neutral200};
  border-radius: 0 0 ${({ theme }) => theme.borderRadius} ${({ theme }) => theme.borderRadius};
  overflow: hidden;
`;

const EnhancedGroup = styled(Box)`
  & > * {
    border-radius: unset;
    border-right: 1px solid ${({ theme }) => theme.colors.neutral200};
    border-left: 1px solid ${({ theme }) => theme.colors.neutral200};
    border-bottom: 1px solid ${({ theme }) => theme.colors.neutral200};
  }

  & > *:first-of-type {
    border-top: 1px solid ${({ theme }) => theme.colors.neutral200};
    border-radius: ${({ theme }) => theme.borderRadius} ${({ theme }) => theme.borderRadius} 0 0;

    &:hover {
      border-top: 1px solid ${({ theme }) => theme.colors.primary600};
    }
  }

  & [data-strapi-expanded='true'] {
    border-right: 1px solid ${({ theme }) => theme.colors.primary600};
    border-left: 1px solid ${({ theme }) => theme.colors.primary600};
    border-bottom: 1px solid ${({ theme }) => theme.colors.primary600};
    border-top: 1px solid ${({ theme }) => theme.colors.primary100};
  }

  & [data-strapi-expanded='true']:first-of-type {
    border-top: 1px solid ${({ theme }) => theme.colors.primary600};
  }

  ${({ theme, footer }) => `
    &:not(${footer}) {
      & > *:last-of-type {
        border-radius: 0 0 ${theme.borderRadius} ${theme.borderRadius};
      }
    }
  `}
`;

export const AccordionGroup = ({ children, footer }) => {
  return (
    <KeyboardNavigable attributeName="data-strapi-accordion-toggle">
      <EnhancedGroup footer={footer}>{children}</EnhancedGroup>
      {footer && <AccordionFooter>{footer}</AccordionFooter>}
    </KeyboardNavigable>
  );
};

AccordionGroup.defaultProps = {
  footer: null,
};

AccordionGroup.propTypes = {
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
};
