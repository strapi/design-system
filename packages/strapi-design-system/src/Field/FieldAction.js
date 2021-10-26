import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const FieldActionWrapper = styled.button`
  border: none;
  background: transparent;
  // TODO: Make sure to use the theme when it's ready
  font-size: 1.6rem;
  width: auto;
  padding: 0;
  display: flex;
  align-items: center;
`;

export const FieldAction = ({ label, children, ...props }) => (
  <FieldActionWrapper aria-label={label} type="button" {...props}>
    {children}
  </FieldActionWrapper>
);

FieldAction.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
};
