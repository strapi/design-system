import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SubTreeWrapper = styled.div`
  position: relative;
  margin-left: ${32 / 16}rem;
  margin-top: ${({ theme }) => theme.spaces[2]};

  &:before {
    margin-left: -${32 / 16}rem;
    border-radius: ${({ theme }) => theme.borderRadius};
    content: '';
    position: absolute;
    height: 100%;
    width: ${({ theme }) => theme.spaces[1]};
    background: ${({ theme }) => theme.colors.primary200};
  }
`;

export const SubTree = ({ children, endAction, ...props }) => {
  return (
    <SubTreeWrapper>
      <ul role="group" {...props}>
        {children}
      </ul>
      {endAction}
    </SubTreeWrapper>
  );
};

SubTree.defaultProps = {
  endAction: undefined,
};

SubTree.propTypes = {
  children: PropTypes.node.isRequired,
  endAction: PropTypes.node,
};
