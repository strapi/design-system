import Link from 'next/link';
import PropTypes from 'prop-types';
import { SubNavSection, SubNavLink } from '@strapi/design-system/SubNav';
import React from 'react';

const CustomLink = React.forwardRef((props, ref) => {
  return (
    <SubNavLink as={Link} {...props} innerRef={ref}>
      {props.children}
    </SubNavLink>
  );
});

CustomLink.displayName = 'CustomLink';

CustomLink.propTypes = {
  children: PropTypes.node.isRequired,
};

const NavSection = ({ title, pages }) => {
  return (
    <SubNavSection label={title} collapsable>
      {pages.map((page) => {
        return (
          <CustomLink href={page.link} key={page.link}>
            {page.name}
          </CustomLink>
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
