import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { Row } from '../Row';
import styled from 'styled-components';

const GridContainer = styled(Box)`
  display: grid;
  grid-template-columns: ${({ hasSideNav }) => (hasSideNav ? `auto 1fr` : '1fr')};
`;

const OverflowingItem = styled(Box)`
  overflow-x: hidden;
`;
const BlockActions = styled(Row)`
  & > * + * {
    margin-left: ${({ theme }) => theme.spaces[2]};
  }

  margin-left: ${({ pullRight }) => (pullRight ? 'auto' : undefined)};
`;

const GridLayoutWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: ${({ theme }) => theme.spaces[4]};
`;

export const GridLayout = ({ startActions, sideNav, endActions, header, children }) => {
  return (
    <GridContainer hasSideNav={Boolean(sideNav)}>
      {sideNav}
      <OverflowingItem paddingBottom={10}>
        {header}
        <Box paddingLeft={10} paddingRight={10}>
          {startActions || endActions ? (
            <Box paddingBottom={4}>
              <Row justifyContent="space-between">
                {startActions && <BlockActions>{startActions}</BlockActions>}
                {endActions && <BlockActions pullRight>{endActions}</BlockActions>}
              </Row>
            </Box>
          ) : null}

          <GridLayoutWrapper>{children}</GridLayoutWrapper>
        </Box>
      </OverflowingItem>
    </GridContainer>
  );
};

GridLayout.defaultProps = {
  endActions: undefined,
  startActions: undefined,
  sideNav: undefined,
};

GridLayout.propTypes = {
  children: PropTypes.node.isRequired,
  endActions: PropTypes.node,
  header: PropTypes.node.isRequired,
  sideNav: PropTypes.node,
  startActions: PropTypes.node,
};
