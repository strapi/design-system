import styled from 'styled-components';
import Head from 'components/Head';
import Navbar from 'components/Navbar';
import StyledLink from 'components/StyledLink';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  gap: 2rem;
  padding: 1.5rem;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Footer = styled.footer`
  display: flex;
  gap: 2rem;
  padding: 38px 0;
`;

const Layout = ({ children, meta, navigationContent }) => {
  return (
    <Wrapper>
      <Head meta={meta} />
      <header>
        <Navbar navigationContent={navigationContent} />
      </header>
      <div>
        <Main>{children}</Main>
        <Footer>
          <StyledLink href="https://strapi.io" target="_blank">
            © 2021 Strapi
          </StyledLink>
          <StyledLink href="https://strapi.io/careers" target="_blank">
            Careers
          </StyledLink>
          <StyledLink href="#" target="_blank">
            Privacy
          </StyledLink>
          <StyledLink href="#" target="_blank">
            License
          </StyledLink>
          <StyledLink href="https://strapi.io" target="_blank">
            strapi.io
          </StyledLink>
        </Footer>
      </div>
    </Wrapper>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  meta: PropTypes.object,
  navigationContent: PropTypes.arrayOf(PropTypes.object),
};

export default Layout;
