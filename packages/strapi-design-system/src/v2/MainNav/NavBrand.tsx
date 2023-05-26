import React from 'react';

import styled from 'styled-components';

import { useMainNav } from './MainNavContext';
import { BaseLink, BaseLinkProps } from '../../BaseLink';
import { Box } from '../../Box';
import { Flex } from '../../Flex';
import { Typography } from '../../Typography';
import { VisuallyHidden } from '../../VisuallyHidden';

const BrandIconWrapper = styled.div<{ condensed?: boolean }>`
  border-radius: ${({ theme }) => theme.borderRadius};

  svg,
  img {
    height: ${({ condensed }) => (condensed ? `${40 / 16}rem` : `${32 / 16}rem`)};
    width: ${({ condensed }) => (condensed ? `${40 / 16}rem` : `${32 / 16}rem`)};
  }
`;

const NavLinkWrapper = styled(BaseLink)`
  text-decoration: unset;
  color: inherit;
`;

export interface NavBrandProps extends BaseLinkProps {
  icon: React.ReactNode;
  title: string;
  to?: string;
  workplace: string;
}

export const NavBrand = React.forwardRef<HTMLAnchorElement, NavBrandProps>(
  ({ workplace, title, icon, ...props }, ref) => {
    const condensed = useMainNav();
    /**
     * TODO: this shouldn't be here, because we're assuming you're
     * passing a ReactRouter Link which isn't necessarily the case.
     */
    props.to = props?.to ?? '/';

    if (condensed) {
      return (
        <BaseLink ref={ref} {...props}>
          <Box paddingLeft={3} paddingRight={3} paddingTop={4} paddingBottom={4}>
            <BrandIconWrapper condensed>
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
              <Typography fontWeight="bold" textColor="neutral800" as="span">
                {title}
                <VisuallyHidden as="span">{workplace}</VisuallyHidden>
              </Typography>
              <Typography variant="pi" as="p" textColor="neutral600" aria-hidden>
                {workplace}
              </Typography>
            </Box>
          </Flex>
        </Box>
      </NavLinkWrapper>
    );
  },
);
