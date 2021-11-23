import Head from 'components/Head';
import Navbar from 'components/Navbar';
import StyledLink from 'components/StyledLink';
import PropTypes from 'prop-types';
import { Layout as PageLayout, ContentLayout } from '@strapi/design-system/Layout';
import { Box } from '@strapi/design-system/Box';
import { Stack } from '@strapi/design-system/Stack';
import { Main } from '@strapi/design-system/Main';

const Layout = ({ children, meta, navigationContent }) => {
  return (
    <Box background="neutral100">
      <PageLayout sideNav={<Navbar navigationContent={navigationContent} />}>
        <Head {...meta} />
        <Box padding={4}>
          <ContentLayout>
            <Main>
              <Stack as="main" size={4}>
                {children}
              </Stack>
            </Main>
            <Stack as="footer" size={7} horizontal paddingTop={10}>
              <StyledLink size={2} href="https://strapi.io" target="_blank">
                © 2021 Strapi
              </StyledLink>
              <StyledLink size={2} href="https://strapi.io/careers" target="_blank">
                Careers
              </StyledLink>
              <StyledLink size={2} href="#" target="_blank">
                Privacy
              </StyledLink>
              <StyledLink size={2} href="#" target="_blank">
                License
              </StyledLink>
              <StyledLink size={2} href="https://strapi.io" target="_blank">
                strapi.io
              </StyledLink>
            </Stack>
          </ContentLayout>
        </Box>
      </PageLayout>
    </Box>
  );
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
