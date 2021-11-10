import Layout from 'components/Layout'
import {getNavbarContent} from 'lib/mdx';

export default function Home({mdxSource, navbarContent}) {
  return (
    <Layout meta={{}} navigationContent={navbarContent ? navbarContent : {}}>
      <h1>Main Page</h1>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const navbarContent = await getNavbarContent();
  return { props: { navbarContent } }
}