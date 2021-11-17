import Layout from 'components/Layout';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { getFileBySlug, getFiles, getNavbarContent } from 'lib/mdx';
import { H1, H2, Text, Subtitle } from '@strapi/design-system/Text';
import { Box } from '@strapi/design-system/Box';
import BottomNavigation from 'components/BottomNavigation';

const components = {
  h1: (props) => <H1 style={{ paddingBottom: 24 }} textColor="neutral800" {...props} />,
  h2: (props) => <H2 style={{ paddingBottom: 16 }} textColor="neutral800" {...props} />,
  h4: (props) => <Subtitle textColor="neutral700" {...props} />,
  p: (props) => <Text textColor="neutral700" {...props} />,
  strong: (props) => <Text textColor="primary600" bold={true} {...props} />,
};

const PostPage = ({ mdxSource, frontMatter, navbarContent, next, previous }) => {
  return (
    <Layout meta={frontMatter} navigationContent={navbarContent}>
      <Box padding={8} background="neutral0" shadow="filterShadow" hasRadius={true}>
        <MDXRemote {...mdxSource} components={components} />
        <BottomNavigation next={next} previous={previous} />
      </Box>
    </Layout>
  );
};

export const getStaticProps = async ({ params }) => {
  const { content, data } = await getFileBySlug(params.slug);
  const mdxSource = await serialize(content, { scope: data });
  const navbarContent = await getNavbarContent();
  const currentPageLink = `/${params.slug}`;
  const pages = [];
  const next = {};
  const previous = {};
  navbarContent.forEach((section) => {
    pages.push(...section.pages);
  });
  pages.forEach((page, index) => {
    if (page.link === currentPageLink) {
      const nextPage = pages[index + 1];
      const previousPage = pages[index - 1];
      if (nextPage) {
        next.title = nextPage.name;
        next.path = nextPage.link;
      }
      if (previousPage) {
        previous.title = previousPage.name;
        previous.path = previousPage.link;
      }
    }
  });
  return {
    props: {
      mdxSource: mdxSource,
      frontMatter: data,
      navbarContent,
      next,
      previous,
    },
  };
};

export const getStaticPaths = async () => {
  const files = await getFiles();
  // Remove file extensions for page paths
  const paths = files
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));
  return {
    paths,
    fallback: false,
  };
};

export default PostPage;
