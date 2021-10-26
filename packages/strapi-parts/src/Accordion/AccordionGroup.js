import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { KeyboardNavigable } from '../KeyboardNavigable';
import styled from 'styled-components';

const EnhancedGroup = styled(Box)`
  & > * {
    border-radius: unset;
    border: 1px solid ${({ theme }) => theme.colors.neutral200};
  }

  & > *:first-of-type {
    border-radius: ${({ theme }) => theme.borderRadius} ${({ theme }) => theme.borderRadius} 0 0;
  }

  ${({ theme, footer }) => `
    &:not(${footer}) {
      & > *:last-of-type {
        border-radius: 0 0 ${theme.borderRadius} ${theme.borderRadius};
      }

      button {
        backgroud: red;
      }
    }
  `}
`;

export const AccordionGroup = ({ children, footer }) => {
  return (
    <KeyboardNavigable attributeName="data-strapi-accordion-toggle">
      <EnhancedGroup footer={footer}>{children}</EnhancedGroup>
      {footer}
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
