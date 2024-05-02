import * as React from 'react';

import { styled } from 'styled-components';

import { PolymorphicRef } from '../../types';
import { forwardRef } from '../../utilities/forwardRef';
import { VisuallyHidden } from '../../utilities/VisuallyHidden';
import { BaseLink, BaseLinkProps } from '../BaseLink';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { Typography } from '../Typography';

import { useMainNav } from './MainNavContext';

const BrandIconWrapper = styled.div<{ $condensed?: boolean }>`
  border-radius: ${({ theme }) => theme.borderRadius};

  svg,
  img {
    height: ${({ $condensed }) => ($condensed ? `4rem` : `3.2rem`)};
    width: ${({ $condensed }) => ($condensed ? `4rem` : `3.2rem`)};
  }
`;

const NavLinkWrapper = styled(BaseLink)`
  text-decoration: unset;
  color: inherit;
`;

export type NavBrandProps<C extends React.ElementType = 'a'> = BaseLinkProps<C> & {
  icon: React.ReactNode;
  title: string;
  to?: string;
  workplace: string;
};

export const NavBrand = forwardRef(
  <C extends React.ElementType = 'a'>(
    { workplace, title, icon, ...props }: NavBrandProps<C>,
    ref: PolymorphicRef<C>,
  ) => {
    const condensed = useMainNav();
    /**
     * TODO: this shouldn't be here, because we're assuming you're
     * passing a ReactRouter Link which isn't necessarily the case.
     */
    // @ts-expect-error – this component is being removed in a future PR.
    props.to = props?.to ?? '/';

    if (condensed) {
      return (
        <BaseLink ref={ref} {...props}>
          <Box paddingLeft={3} paddingRight={3} paddingTop={4} paddingBottom={4}>
            <BrandIconWrapper $condensed>
              {icon}
              <VisuallyHidden>
                <span>{title}</span>
                <span>{workplace}</span>
              </VisuallyHidden>
            </BrandIconWrapper>
          </Box>
        </BaseLink>
      );
    }

    return (
      <NavLinkWrapper ref={ref} {...props}>
        <Box paddingLeft={3} paddingRight={3} paddingTop={4} paddingBottom={4}>
          <Flex>
            <BrandIconWrapper aria-hidden tabIndex={-1}>
              {icon}
            </BrandIconWrapper>

            <Box paddingLeft={2}>
              <Typography fontWeight="bold" textColor="neutral800" tag="span">
                {title}
                <VisuallyHidden>{workplace}</VisuallyHidden>
              </Typography>
              <Typography variant="pi" tag="p" textColor="neutral600" aria-hidden>
                {workplace}
              </Typography>
            </Box>
          </Flex>
        </Box>
      </NavLinkWrapper>
    );
  },
);
