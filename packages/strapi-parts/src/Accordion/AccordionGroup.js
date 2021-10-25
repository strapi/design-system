import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { KeyboardNavigable } from '../KeyboardNavigable';
import styled from 'styled-components';

const EnhancedGroup = styled(Box)`
  & [data-strapi-accordion-toggle='true']:first-of-type {
    border-radius: 4px 4px 0 0;
  }
`;

export const AccordionGroup = ({ children }) => {
  return (
    <KeyboardNavigable attributeName="data-strapi-accordion-toggle">
      <EnhancedGroup>{children}</EnhancedGroup>
    </KeyboardNavigable>
  );
};

AccordionGroup.propTypes = {
  children: PropTypes.node.isRequired,
};
