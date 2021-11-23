import Head from 'components/Head';
import Navbar from 'components/Navbar';
import StyledLink from 'components/StyledLink';
import PropTypes from 'prop-types';
import { Layout, ContentLayout } from '@strapi/design-system/Layout';
import { Box } from '@strapi/design-system/Box';
import { Stack } from '@strapi/design-system/Stack';

const AppLayout = ({ children, meta, navigationContent }) => {
  return (
    <Box background="neutral100">
      <Layout sideNav={<Navbar navigationContent={navigationContent} />}>
        <Head meta={meta} />
        <Box padding={4}>
          <ContentLayout>
            <Stack as="main" size={4}>
              {children}
            </Stack>
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
      </Layout>
    </Box>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
  meta: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
  }),
  navigationContent: PropTypes.arrayOf(PropTypes.object),
};

export default AppLayout;
