import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Avatar, Initials } from '../Avatar';
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

export const NavUser = React.forwardRef(({ src, children, initials, ...props }, ref) => {
  const condensed = useMainNav();

  return (
    <NavUserBox paddingTop={3} paddingBottom={3} paddingLeft={5} paddingRight={5} {...props}>
      <Row as="button" justifyContent={condensed ? 'center' : undefined} ref={ref}>
        {src ? <Avatar src={src} alt="" aria-hidden /> : <Initials>{initials}</Initials>}
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
});

NavUser.displayName = 'NavUser';

NavUser.defaultProps = {
  src: undefined,
  initials: undefined,
};

NavUser.propTypes = {
  children: PropTypes.node.isRequired,
  initials: PropTypes.node,
  src: PropTypes.string,
};
