import Layout from 'components/Layout';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { getFileBySlug, getFiles, getNavbarContent } from 'lib/mdx';

const PostPage = ({ mdxSource, frontMatter, navbarContent }) => {
  return (
    <Layout meta={frontMatter} navigationContent={navbarContent}>
      <MDXRemote {...mdxSource} />
    </Layout>
  );
};

export const getStaticProps = async ({ params }) => {
  const { content, data } = await getFileBySlug(params.slug);
  const mdxSource = await serialize(content, { scope: data });
  const navbarContent = await getNavbarContent();
  return {
    props: {
      mdxSource: mdxSource,
      frontMatter: data,
      navbarContent,
    },
  };
};

export const getStaticPaths = async () => {
  const files = await getFiles();
  // Remove file extensions for page paths
  const paths = files
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug, root: '' } }));
  return {
    paths,
    fallback: false,
  };
};

export default PostPage;
