import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useMainNav } from './MainNavContext';
import { Avatar, Initials } from '../Avatar';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { Typography } from '../Typography';
import { VisuallyHidden } from '../VisuallyHidden';

const NavUserBox = styled(Box)`
  border-top: 1px solid ${({ theme }) => theme.colors.neutral150};
`;

export const NavUser = React.forwardRef(({ src, children, initials, ...props }, ref) => {
  const condensed = useMainNav();

  return (
    <NavUserBox paddingTop={3} paddingBottom={3} paddingLeft={5} paddingRight={5} {...props}>
      <Flex as="button" gap={2} justifyContent={condensed ? 'center' : undefined} ref={ref}>
        {src ? <Avatar src={src} alt="" aria-hidden /> : <Initials>{initials}</Initials>}
        {condensed ? (
          <VisuallyHidden>
            <span>{children}</span>
          </VisuallyHidden>
        ) : (
          <Box width={`${130 / 16}rem`}>
            <Typography ellipsis textColor="neutral600">
              {children}
            </Typography>
          </Box>
        )}
      </Flex>
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
