import React from 'react';

import styled from 'styled-components';

import { useMainNav } from './MainNavContext';
import { Avatar, Initials } from '../Avatar';
import { Box, BoxProps } from '../Box';
import { Flex } from '../Flex';
import { Typography } from '../Typography';
import { VisuallyHidden } from '../VisuallyHidden';

export interface NavUserProps extends BoxProps {
  initials: string;
  src?: string;
}

const NavUserBox = styled(Box)`
  border-top: 1px solid ${({ theme }) => theme.colors.neutral150};
`;

export const NavUser = React.forwardRef<HTMLButtonElement, NavUserProps>(
  ({ src, children, initials, ...props }, ref) => {
    const condensed = useMainNav();

    return (
      <NavUserBox paddingTop={3} paddingBottom={3} paddingLeft={5} paddingRight={5} {...props}>
        <Flex as="button" justifyContent={condensed ? 'center' : undefined} ref={ref}>
          {src ? <Avatar src={src} alt="" aria-hidden /> : <Initials>{initials}</Initials>}
          {condensed ? (
            <VisuallyHidden>
              <span>{children}</span>
            </VisuallyHidden>
          ) : (
            <Box width={`${130 / 16}rem`} paddingLeft={2} as="span">
              <Typography ellipsis textColor="neutral600">
                {children}
              </Typography>
            </Box>
          )}
        </Flex>
      </NavUserBox>
    );
  },
);
