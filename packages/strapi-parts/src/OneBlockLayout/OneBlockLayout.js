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
  overflow: auto;
`;

const BlockActions = styled(Row)`
  & > * + * {
    margin-left: ${({ theme }) => theme.spaces[2]};
  }

  margin-left: ${({ pullRight }) => (pullRight ? 'auto' : undefined)};
`;

export const OneBlockLayout = ({ startActions, sideNav, endActions, header, children }) => {
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

          <Box hasRadius background="neutral0" shadow="tableShadow">
            {children}
          </Box>
        </Box>
      </OverflowingItem>
    </GridContainer>
  );
};

OneBlockLayout.defaultProps = {
  endActions: undefined,
  startActions: undefined,
  sideNav: undefined,
};

OneBlockLayout.propTypes = {
  children: PropTypes.node.isRequired,
  endActions: PropTypes.node,
  header: PropTypes.node.isRequired,
  sideNav: PropTypes.node,
  startActions: PropTypes.node,
};
