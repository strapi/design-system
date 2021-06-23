import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TreeItemContent } from './TreeItemContent';

const SubTreeWrapper = styled.ul`
  margin-top: ${({ theme }) => theme.spaces[2]};
  margin-left: ${({ theme }) => theme.spaces[8]};

  li:before {
    top: 0;
    /* border-radius: ${({ theme }) => theme.borderRadius}; */
    content: '';
    position: absolute;
    height: 100%;
    width: ${({ theme }) => theme.spaces[1]};
    background: ${({ theme }) => theme.colors.primary200};
  }

  li:last-of-type {
    &:before {
      height: 50%;
    }
  }

  ${TreeItemContent} {
    margin-left: ${({ theme }) => theme.spaces[8]};
  }
`;

export const SubTree = ({ children, ...props }) => {
  return (
    <SubTreeWrapper role="group" {...props}>
      {children}
    </SubTreeWrapper>
  );
};

SubTree.propTypes = {
  children: PropTypes.node.isRequired,
};
