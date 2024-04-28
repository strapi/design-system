import * as React from 'react';

import { styled, css } from 'styled-components';

import { BaseLink, BaseLinkProps, BaseLinkComponent } from '../BaseLink';
import { Flex } from '../Flex';
import { Typography } from '../Typography';

interface SubNavLinkProps extends BaseLinkProps {
  active?: boolean;
  children: React.ReactNode;
  icon?: React.ReactElement;
  isSubSectionChild?: boolean;
  withBullet?: boolean;
}

const SubNavLink = React.forwardRef<HTMLAnchorElement, SubNavLinkProps>(
  ({ active, children, icon = null, withBullet = false, isSubSectionChild = false, ...props }, ref) => {
    return (
      <SubNavLinkWrapper
        background="neutral100"
        paddingLeft={isSubSectionChild ? 9 : 7}
        paddingBottom={2}
        paddingTop={2}
        ref={ref}
        {...props}
      >
        <Flex>
          {icon ? <IconWrapper>{icon}</IconWrapper> : <CustomBullet $active={active} />}
          <Typography paddingLeft={2}>{children}</Typography>
        </Flex>
        {withBullet && (
          <Flex paddingRight={4}>
            <CustomBullet $active />
          </Flex>
        )}
      </SubNavLinkWrapper>
    );
  },
);

const SubNavLinkWrapper = styled<BaseLinkComponent>(BaseLink)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.neutral800};
  svg > * {
    fill: ${({ theme }) => theme.colors.neutral600};
  }

  &.active {
    ${({ theme }) => {
      return css`
        background-color: ${theme.colors.primary100};
        border-right: 2px solid ${theme.colors.primary600};
        color: ${theme.colors.primary700};
        font-weight: 500;
      `;
    }}
  }

  &:focus-visible {
    outline-offset: -2px;
  }
`;

const CustomBullet = styled.span<{ $active?: boolean }>`
  width: 0.4rem;
  height: 0.4rem;
  background-color: ${({ theme, $active }) => ($active ? theme.colors.primary600 : theme.colors.neutral600)};
  border-radius: 50%;
`;

const IconWrapper = styled.div`
  svg {
    height: 1.6rem;
    width: 1.6rem;
  }
`;

export { SubNavLink };
export type { SubNavLinkProps };
