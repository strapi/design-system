import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '../Box';

const TreeWrapper = styled.div`
  position: relative;
  padding-left: calc(${({ theme }) => theme.spaces[8]} + ${24 / 2 / 16}rem);

  &:before {
    margin-left: calc(-${({ theme }) => theme.spaces[8]} - ${4 / 2 / 16}rem);
    position: absolute;
    content: '';
    width: ${4 / 16}rem;
    background: ${({ theme }) => theme.colors.primary200};
    height: 100%;
    border-radius: ${({ theme, removeBottomRadius }) =>
      removeBottomRadius ? `${theme.borderRadius} ${theme.borderRadius} 0 0` : theme.borderRadius};
  }
`;

const SharedTree = ({ children, endAction, role, ...props }) => {
  const hasAction = Boolean(endAction);

  return (
    <TreeWrapper removeBottomRadius={hasAction} {...props}>
      <ul role={role}>{children}</ul>
      {endAction}
    </TreeWrapper>
  );
};

export const Tree = (props) => {
  return <SharedTree role="tree" {...props} />;
};

export const SubTree = (props) => {
  return <SharedTree role="group" {...props} />;
};

SharedTree.defaultProps = {
  endAction: undefined,
};

SharedTree.propTypes = {
  children: PropTypes.node.isRequired,
  endAction: PropTypes.node,
  role: PropTypes.string.isRequired,
};
