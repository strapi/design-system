import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Avatar } from '../Avatar';
import { Text } from '../Text';
import { Row } from '../Row';
import { Box } from '../Box';
import { useMainNav } from './MainNavContext';
import { VisuallyHidden } from '../VisuallyHidden';
import { Divider } from '../Divider';

const NavUserWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
`;
const NavUserBox = styled(Box)`
  display: block;
  width: 100%;
  text-decoration: none;
`;

export const NavUser = ({ src, children, ...props }) => {
  const condensed = useMainNav();

  return (
    <NavUserWrapper>
      <Divider />
      <NavUserBox paddingTop={3} paddingBottom={3} paddingLeft={5} paddingRight={5} as="a" {...props}>
        <Row as="span" justifyContent={condensed ? 'center' : undefined}>
          <Avatar src={src} alt="" aria-hidden />
          {condensed ? (
            <VisuallyHidden>
              <span>{children}</span>
            </VisuallyHidden>
          ) : (
            <Box paddingLeft={2} as="span">
              <Text as="span" textColor="neutral600">
                {children}
              </Text>
            </Box>
          )}
        </Row>
      </NavUserBox>
    </NavUserWrapper>
  );
};

NavUser.propTypes = {
  children: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};
