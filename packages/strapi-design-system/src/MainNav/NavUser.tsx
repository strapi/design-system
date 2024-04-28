import * as React from 'react';

import { styled } from 'styled-components';

import { useMainNav } from './MainNavContext';
import { Avatar, Initials } from '../Avatar';
import { Box, BoxComponent, BoxProps } from '../Box';
import { Flex } from '../Flex';
import { Typography } from '../Typography';
import { VisuallyHidden } from '../VisuallyHidden';

const NavUserBox = styled<BoxComponent>(Box)`
  border-top: 1px solid ${({ theme }) => theme.colors.neutral150};
`;

export interface NavUserProps extends BoxProps {
  children: React.ReactNode;
  initials?: React.ReactNode;
  src?: string;
}

export const NavUser = React.forwardRef<any, NavUserProps>(({ src, children, initials, ...props }, ref) => {
  const condensed = useMainNav();

  return (
    <NavUserBox paddingTop={3} paddingBottom={3} paddingLeft={5} paddingRight={5} {...props}>
      <Flex tag="button" justifyContent={condensed ? 'center' : undefined} ref={ref}>
        {src ? <Avatar src={src} alt="" aria-hidden /> : <Initials>{initials}</Initials>}
        {condensed ? (
          <VisuallyHidden>
            <span>{children}</span>
          </VisuallyHidden>
        ) : (
          <Box width="13rem" paddingLeft={2} tag="span">
            <Typography ellipsis textColor="neutral600">
              {children}
            </Typography>
          </Box>
        )}
      </Flex>
    </NavUserBox>
  );
});
