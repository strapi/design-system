import * as React from 'react';

import { styled, css } from 'styled-components';

import { PolymorphicRef } from '../../types';
import { forwardRef } from '../../utilities/forwardRef';
import { BaseLink, BaseLinkProps, BaseLinkComponent } from '../BaseLink';
import { Flex } from '../Flex';
import { Typography } from '../Typography';

type SubNavLinkProps<C extends React.ElementType> = BaseLinkProps<C> & {
  active?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
  isSubSectionChild?: boolean;
  withBullet?: boolean;
};

const SubNavLink = forwardRef(
  <C extends React.ElementType = 'a'>(
    { active, children, icon = null, withBullet = false, isSubSectionChild = false, ...props }: SubNavLinkProps<C>,
    ref: PolymorphicRef<C>,
  ) => {
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

type SubNavLinkComponent<C extends React.ElementType> = (props: SubNavLinkProps<C>) => React.ReactNode;

const CustomBullet = styled.span<{ $active?: boolean }>`
  width: 0.4rem;
  height: 0.4rem;
  background-color: ${({ theme, $active }) => ($active ? theme.colors.primary600 : theme.colors.neutral600)};
  border-radius: 50%;
`;

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

    ${CustomBullet} {
      background-color: ${({ theme }) => theme.colors.primary600};
    }
  }

  &:focus-visible {
    outline-offset: -2px;
  }
`;

const IconWrapper = styled.div`
  svg {
    height: 1.6rem;
    width: 1.6rem;
  }
`;

export { SubNavLink };
export type { SubNavLinkProps, SubNavLinkComponent };
