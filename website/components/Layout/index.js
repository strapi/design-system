import Head from 'components/Head';
import Navbar from 'components/Navbar';
import StyledLink from 'components/StyledLink';
import PropTypes from 'prop-types';
import { Layout as PageLayout, ContentLayout } from '@strapi/design-system/Layout';
import { Box } from '@strapi/design-system/Box';
import { Flex } from '@strapi/design-system/Flex';
import { Main } from '@strapi/design-system/Main';

const Layout = ({ children, meta, navigationContent }) => {
  return (
    <Box background="neutral100">
      <PageLayout sideNav={<Navbar navigationContent={navigationContent} />}>
        <Head {...meta} />
        <Box padding={4}>
          <ContentLayout>
            <Main>
              <Flex direction="column" alignItems="stretch" as="article" gap={4}>
                {children}
              </Flex>
              <Flex as="footer" gap={7} paddingTop={10}>
                <StyledLink size={2} href="https://strapi.io" target="_blank">
                  {`© ${new Date().getFullYear()} Strapi`}
                </StyledLink>
                <StyledLink size={2} href="https://strapi.io/careers" target="_blank">
                  Careers
                </StyledLink>
                <StyledLink size={2} href="https://strapi.io/privacy" target="_blank">
                  Privacy
                </StyledLink>
                <StyledLink size={2} href="https://strapi.io/pricing-self-hosted" target="_blank">
                  License
                </StyledLink>
                <StyledLink size={2} href="https://strapi.io" target="_blank">
                  strapi.io
                </StyledLink>
              </Flex>
            </Main>
          </ContentLayout>
        </Box>
      </PageLayout>
    </Box>
  );
};

Layout.defaultProps = {
  navBarContent: {},
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  meta: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
  }),
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

export default Layout;
