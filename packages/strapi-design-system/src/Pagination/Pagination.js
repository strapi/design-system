import React, { Children } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Flex } from '../Flex';
import { PaginationContext } from './PaginationContext';

const PaginationWrapper = styled.nav``;
const PaginationList = styled(Flex)`
  & > * + * {
    margin-left: ${({ theme }) => theme.spaces[1]};
  }
`;

export const Pagination = ({ children, label, activePage, pageCount }) => {
  return (
    <PaginationContext.Provider value={{ activePage, pageCount }}>
      <PaginationWrapper aria-label={label}>
        <PaginationList as="ul">
          {Children.map(children, (child, index) => {
            // eslint-disable-next-line react/no-array-index-key
            return <li key={index}>{child}</li>;
          })}
        </PaginationList>
      </PaginationWrapper>
    </PaginationContext.Provider>
  );
};

Pagination.defaultProps = {
  label: 'pagination',
};

Pagination.propTypes = {
  activePage: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  label: PropTypes.string,
  pageCount: PropTypes.number.isRequired,
};
