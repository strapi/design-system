import NavSection from 'components/NavSection';
import StyledLink from 'components/StyledLink';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { SubNav, SubNavSections } from '@strapi/design-system/SubNav';
import { Box } from '@strapi/design-system/Box';
import { Icon } from '@strapi/design-system/Icon';
import Discourse from '@strapi/icons/Discourse';
import Github from '@strapi/icons/Github';
import Image from 'next/image';
import styled from 'styled-components';
import { useTheme } from '@strapi/design-system/ThemeProvider';

const HorizontalLine = styled.div`
  background: ${(props) => props.theme.colors.neutral200};
  width: 1.5rem;
  height: 1px;
  margin: 0 0 0 1.5rem;
`;

const Navbar = ({ navigationContent }) => {
  const theme = useTheme();
  return (
    <SubNav ariaLabel="main nav">
      <Box padding={5}>
        <Link href="/" passHref>
          <Image src="/logo.svg" width={161} height={25} />
        </Link>
      </Box>
      <HorizontalLine theme={theme} />
      <SubNavSections>
        {navigationContent?.map((section, index) => {
          return <NavSection title={section.title} pages={section.pages} key={index} />;
        })}
        <Box paddingLeft={4}>
          <StyledLink theme={theme} href="https://github.com/strapi/design-system" target="_blank" padding={8}>
            <Icon as={Github} height={16} width={16} marginRight={2} />
            Contribute on Github
          </StyledLink>
          <StyledLink theme={theme} href="#" target="_blank" padding={8}>
            <Icon as={Discourse} height={16} width={16} marginRight={2} />
            DS! Forum
          </StyledLink>
        </Box>
      </SubNavSections>
    </SubNav>
  );
};

Navbar.propTypes = {
  navigationContent: PropTypes.array,
};

export default Navbar;
