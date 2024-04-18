import * as React from 'react';

import styled from 'styled-components';

import { BaseLink, BaseLinkProps } from '../BaseLink';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { Typography } from '../Typography';

const SubNavLinkTypography = styled(Typography)``;

const SubNavLinkWrapper = styled(Box)`
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
      return `
      background-color: ${theme.colors.primary100};
      border-right: 2px solid ${theme.colors.primary600};
      svg > * {
        fill: ${theme.colors.primary700};
      }
      ${SubNavLinkTypography} {
        color: ${theme.colors.primary700};
        font-weight: 500;
      }
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

export interface SubNavLinkProps extends BaseLinkProps {
  active?: boolean;
  as?: React.ElementType;
  children: React.ReactNode;
  icon?: React.ReactElement;
  isSubSectionChild?: boolean;
  withBullet?: boolean;
}

export const SubNavLink = React.forwardRef<unknown, SubNavLinkProps>(
  ({ active, children, icon = null, withBullet = false, as = BaseLink, isSubSectionChild = false, ...props }, ref) => {
    return (
      <SubNavLinkWrapper
        as={as}
        icon={icon}
        background="neutral100"
        paddingLeft={isSubSectionChild ? 9 : 7}
        paddingBottom={2}
        paddingTop={2}
        ref={ref}
        {...props}
      >
        <Flex>
          {icon ? <IconWrapper>{icon}</IconWrapper> : <CustomBullet $active={active} />}
          <Box paddingLeft={2}>
            <Typography as="span">{children}</Typography>
          </Box>
        </Flex>
        {withBullet && (
          <Box as={Flex} paddingRight={4}>
            <CustomBullet $active />
          </Box>
        )}
      </SubNavLinkWrapper>
    );
  },
);
