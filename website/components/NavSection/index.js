import Link from 'next/link';
import PropTypes from 'prop-types';
import { SubNavSection, SubNavLink } from '@strapi/design-system/SubNav';

const NavSection = ({ title, pages }) => {
  return (
    <SubNavSection label={title} collapsable>
      {pages.map((page, index) => {
        return (
          <Link href={page.link} passHref key={index}>
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
    }),
  ),
};

export default NavSection;
