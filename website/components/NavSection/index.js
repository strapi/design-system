import Link from 'next/link';
import PropTypes from 'prop-types';
import { SubNavSection, SubNavLink } from '@strapi/design-system/SubNav';

const NavSection = ({ title, pages }) => {
  return (
    <SubNavSection label={title} collapsable>
      {pages.map((page) => {
        return (
          <Link href={page.link} passHref key={page.link}>
            <SubNavLink href={page.link} as="a">
              {page.name}
            </SubNavLink>
          </Link>
        );
      })}
    </SubNavSection>
  );
};

NavSection.propTypes = {
  title: PropTypes.string.isRequired,
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string,
      name: PropTypes.string,
    }).isRequired,
  ),
};

export default NavSection;
