import Layout from 'components/Layout';
import { getNavbarContent } from 'lib/mdx';
import { H1 } from '@strapi/design-system/Text';

export default function Home({ navbarContent }) {
  return (
    <Layout meta={{}} navigationContent={navbarContent ? navbarContent : {}}>
      <H1 textColor="neutral800">Main Page</H1>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const navbarContent = await getNavbarContent();
  return { props: { navbarContent } };
};
