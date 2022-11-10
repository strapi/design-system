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

export const FieldLabel = ({ children, required, action, ...props }) => {
  const { id } = useField();

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
  required: false,
  action: undefined,
};
FieldLabel.propTypes = {
  action: PropTypes.element,
  children: PropTypes.node.isRequired,
  required: PropTypes.bool,
};
