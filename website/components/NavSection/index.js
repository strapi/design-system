import { useState, useEffect } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { SubNavSection, SubNavLink } from '@strapi/design-system/SubNav';

const NavSection = ({ title, pages }) => {
  const [isSectionActive, setIsSectionActive] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const pageLinks = pages.map((page) => page.link);
    setIsSectionActive(pageLinks.includes(`/${router.query.slug}`));
  }, [router]);

  return (
    <SubNavSection label={title} collapsable className={isSectionActive ? 'active' : ''}>
      {pages.map((page, index) => {
        const isActive = `/${router.query.slug}` === page.link;
        return (
          <Link href={page.link} passHref key={index}>
            <SubNavLink active={isActive} href={page.link} as="a">
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
  pages: PropTypes.arrayOf(PropTypes.object),
};

export default NavSection;
