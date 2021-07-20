import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Avatar } from '../Avatar';
import { Text } from '../Text';
import { Row } from '../Row';
import { Box } from '../Box';
import { useMainNav } from './MainNavContext';
import { VisuallyHidden } from '../VisuallyHidden';

const NavUserBox = styled(Box)`
  text-decoration: none;
  position: absolute;
  bottom: 0;
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.neutral150};
`;

export const NavUser = ({ src, children, ...props }) => {
  const condensed = useMainNav();

  return (
    <NavUserBox paddingTop={3} paddingBottom={3} paddingLeft={5} paddingRight={5} as={NavLink} {...props}>
      <Row as="span" justifyContent={condensed ? 'center' : undefined}>
        <Avatar src={src} alt="" aria-hidden />
        {condensed ? (
          <VisuallyHidden>
            <span>{children}</span>
          </VisuallyHidden>
        ) : (
          <Box paddingLeft={2} as="span">
            <Text textColor="neutral600">{children}</Text>
          </Box>
        )}
      </Row>
    </NavUserBox>
  );
};

NavUser.propTypes = {
  children: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};
