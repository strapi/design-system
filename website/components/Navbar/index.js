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

const Navbar = ({ navigationContent }) => {
  return (
    <SubNav ariaLabel="Main Navbar">
      <Box padding={5}>
        <Link href="/">
          <Image src="/logo.svg" width={161} height={25} alt="Strapi Design System" />
        </Link>
      </Box>
      <Box background="neutral200" marginLeft={6} width="1.5rem" height="1px" />
      <SubNavSections>
        {navigationContent?.map((section, index) => {
          return <NavSection title={section.title} pages={section.pages} key={index} />;
        })}
      </SubNavSections>
      <Box paddingLeft={4} paddingBottom={4} position="absolute" bottom={0}>
        <StyledLink href="https://github.com/strapi/design-system" target="_blank" padding={2} size={2}>
          <Icon as={Github} height={16} width={16} marginRight={2} color="neutral500" />
          Contribute on Github
        </StyledLink>
        <StyledLink href="https://forum.strapi.io" target="_blank" padding={2} size={2}>
          <Icon as={Discourse} height={16} width={16} marginRight={2} color="neutral500" />
          DS Forum
        </StyledLink>
      </Box>
    </SubNav>
  );
};

Navbar.propTypes = {
  navigationContent: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      pages: PropTypes.arrayOf(
        PropTypes.shape({
          link: PropTypes.string,
          name: PropTypes.string,
        }),
      ),
    }),
  ),
};

export default Navbar;
