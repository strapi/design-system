import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '../../Box';
import { Typography } from '../../Typography';
import { Flex } from '../../Flex';
import { useMainNav } from './MainNavContext';
import { VisuallyHidden } from '../../VisuallyHidden';
import { BaseLink } from '../../BaseLink';

const BrandIconWrapper = styled.div`
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

export const NavBrand = React.forwardRef(({ workplace, title, icon, ...props }, ref) => {
  const condensed = useMainNav();

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
});

NavBrand.displayName = 'NavBrand';

NavBrand.defaultProps = {
  to: '/',
};

NavBrand.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string,
  workplace: PropTypes.string.isRequired,
};
