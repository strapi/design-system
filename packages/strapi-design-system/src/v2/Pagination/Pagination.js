import * as React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import { PaginationContext } from './PaginationContext';
import { Flex } from '../../Flex';

const PaginationWrapper = styled.nav``;
const PaginationList = styled(Flex)`
  & > * + * {
    margin-left: ${({ theme }) => theme.spaces[1]};
  }
`;

export const Pagination = ({ children, label, activePage, pageCount }) => {
  const context = React.useMemo(() => ({ activePage, pageCount }), [activePage, pageCount]);

  return (
    <PaginationContext.Provider value={context}>
      <PaginationWrapper aria-label={label}>
        <PaginationList as="ul">
          {React.Children.map(children, (child, index) => {
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
