import Head from 'components/Head';
import Navbar from 'components/Navbar';
import StyledLink from 'components/StyledLink';
import PropTypes from 'prop-types';
import { Layout, ContentLayout } from '@strapi/design-system/Layout';
import { Box } from '@strapi/design-system/Box';
import { Stack } from '@strapi/design-system/Stack';

const AppLayout = ({ children, meta, navigationContent, aside }) => {
  return (
    <Layout sideNav={<Navbar navigationContent={navigationContent} />}>
      <Head meta={meta} />
      <Box padding={4}>
        <ContentLayout>
          <Stack as="main" size={4}>
            {children}
          </Stack>
          <Stack as="footer" size={4} horizontal paddingTop={10}>
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
          </Stack>
        </ContentLayout>
        {aside}
      </Box>
    </Layout>
  );
};

AppLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  meta: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
  }),
  navigationContent: PropTypes.arrayOf(PropTypes.object),
  aside: PropTypes.object,
};

export default AppLayout;
