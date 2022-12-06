import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Flex } from '../Flex';
import { useField } from './FieldContext';
import { Typography } from '../Typography';

const TypographyAsterisk = styled(Typography)`
  line-height: 0;
`;

const Action = styled(Flex)`
  line-height: 0;

  svg path {
    fill: ${({ theme }) => theme.colors.neutral500};
  }
`;

export const FieldLabel = ({ children, action, required: requiredDeprecatedProp, ...props }) => {
  const { id, required: requiredField } = useField();
  const required = requiredField || requiredDeprecatedProp;

  if (requiredDeprecatedProp !== undefined) {
    console.warn(
      'Deprecation warning: Usage of "required" prop in FieldLabel component is deprecated. This is discouraged and will be removed in the next major release. Please use the Field component to share the required prop.',
    );
  }

  return (
    <Typography variant="pi" textColor="neutral800" htmlFor={id} fontWeight="bold" as="label" {...props}>
      <Flex alignItems="center">
        {children}
        {required && <TypographyAsterisk textColor="danger600">*</TypographyAsterisk>}
        {action && <Action marginLeft={1}>{action}</Action>}
      </Flex>
    </Typography>
  );
};

FieldLabel.defaultProps = {
  action: undefined,
  required: undefined,
};

FieldLabel.propTypes = {
  action: PropTypes.element,
  children: PropTypes.node.isRequired,
  /**
   * DEPRECATED: "required" should be given to Field component to share the value across components
   */
  required: PropTypes.bool,
};
