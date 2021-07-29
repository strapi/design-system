import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { Row } from '../Row';
import styled from 'styled-components';

const FlexBox = styled(Box)`
  flex: 1;
`;

const BlockActions = styled(Row)`
  & > * + * {
    margin-left: ${({ theme }) => theme.spaces[2]};
  }

  margin-left: ${({ pullRight }) => (pullRight ? 'auto' : undefined)};
`;

export const OneBlockLayout = ({ startActions, sideNav, endActions, header, children }) => {
  return (
    <Row alignItems="flex-start">
      {sideNav}
      <FlexBox>
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
      </FlexBox>
    </Row>
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
