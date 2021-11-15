import Layout from 'components/Layout';
import { getNavbarContent } from 'lib/mdx';
import { H1 } from '@strapi/design-system/Text';
import { Box } from '@strapi/design-system/Box';

export default function Home({ navbarContent }) {
  return (
    <Layout meta={{}} navigationContent={navbarContent ? navbarContent : {}}>
      <Box padding={8} background="neutral0" shadow="filterShadow" hasRadius={true}>
        <H1 textColor="neutral800">Main Page</H1>
      </Box>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const navbarContent = await getNavbarContent();
  return { props: { navbarContent } };
};
