import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '../Avatar';
import { Text } from '../Text';
import { Row } from '../Row';
import { Box } from '../Box';
import styled from 'styled-components';

const NavUserBox = styled(Box)`
  text-decoration: none;
`;

export const NavUser = ({ src, children, ...props }) => {
  return (
    <NavUserBox paddingTop={3} paddingBottom={3} paddingLeft={2} paddingRight={2} as="a" {...props}>
      <Row as="span">
        <Avatar src={src} alt="" aria-hidden />
        <Box paddingLeft={2} as="span">
          <Text as="span" textColor="neutral600">
            {children}
          </Text>
        </Box>
      </Row>
    </NavUserBox>
  );
};

NavUser.propTypes = {
  children: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};
