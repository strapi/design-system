import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

const SectionTitle = styled.h3`
  font-weight: 700;
  font-size: 11px;
  color: ${(props) => (props.isActive ? 'var(--Primary600)' : 'var(--Neutral600)')};
  padding: 0.5rem 1.5rem;
  width: 100%;
  text-transform: uppercase;
  display: flex;
  align-content: center;
  gap: 4px;
`;

const LinksList = styled.ul`
  padding: 0;
  li {
    color: var(--Neutral800);
    padding: 0.5rem 0 0.5rem 2rem;
    font-size: 14px;
    list-style-position: inside;
    cursor: pointer;
    :hover {
      background-color: var(--Primary100);
      color: var(--Primary700);
    }
  }
  .active {
    background-color: var(--Primary100);
    color: var(--Primary700);
  }
`;

const NavSection = ({ title, pages }) => {
  const [isSectionActive, setIsSectionActive] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const pageLinks = pages.map((page) => page.link);
    setIsSectionActive(pageLinks.includes(`/${router.query.slug}`));
  }, [router]);

  return (
    <div>
      <SectionTitle isActive={isSectionActive}>
        {title}
        <Image src={isSectionActive ? '/dropdown-icon-active.svg' : '/dropdown-icon.svg'} width={7} height={4} />
      </SectionTitle>
      <LinksList>
        {pages?.map((page, index) => {
          const isActive = `/${router.query.slug}` === page.link;
          return (
            <Link href={page.link} key={index} passHref>
              <li className={isActive ? 'active' : ''}>{page.name}</li>
            </Link>
          );
        })}
      </LinksList>
    </div>
  );
};

NavSection.protoTypes = {
  title: PropTypes.string.isRequired,
  pages: PropTypes.array,
};

export default NavSection;
