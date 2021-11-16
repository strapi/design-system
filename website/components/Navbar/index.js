import styled from 'styled-components';
import Image from 'next/image';
import NavSection from 'components/NavSection';
import StyledLink from 'components/StyledLink';
import Link from 'next/link';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  position: fixed;
  overflow-y: scroll;
  height: 100%;
  top: 0;
  bottom: 0;
`;

const TopPart = styled.div`
  padding: 1.5rem;
`;

const BottomPart = styled.div`
  padding-top: 6rem;
  align-self: flex-end;
`;

const Navigation = styled.div`
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const HorizontalLine = styled.div`
  background: var(--Neutral200);
  width: 1.5rem;
  height: 1px;
  margin: 0 0 0 1.5rem;
`;
const Icon = styled.span`
  padding: 0px 10px;
`;

const Navbar = ({ navigationContent }) => {
  return (
    <Wrapper>
      <TopPart>
        <Link href="/" passHref>
          <Image src="/logo.svg" width={161} height={25} />
        </Link>
      </TopPart>
      <HorizontalLine />
      <Navigation>
        {navigationContent?.map((section, index) => (
          <NavSection title={section.title} pages={section.pages} key={index} />
        ))}
      </Navigation>
      <BottomPart>
        <StyledLink href="https://github.com/strapi/design-system" target="_blank" padding={8}>
          <Icon>
            <Image src="/github.svg" height={16} width={16} />
          </Icon>
          Contribute on Github
        </StyledLink>
        <StyledLink href="#" target="_blank" padding={8}>
          <Icon>
            <Image src="/discourse.svg" height={16} width={16} />
          </Icon>
          DS! Forum
        </StyledLink>
      </BottomPart>
    </Wrapper>
  );
};

Navbar.propTypes = {
  navigationContent: PropTypes.array,
};

export default Navbar;
