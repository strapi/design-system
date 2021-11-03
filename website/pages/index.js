import Layout from 'components/Layout'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import matter from 'gray-matter'
import {getNavbarContent} from 'lib/mdx';

export default function Home({mdxSource, navbarContent}) {
  return (
    <Layout meta={{}} navigationContent={navbarContent}>
      <MDXRemote {...mdxSource} />
    </Layout>
  )
}

export const getStaticProps = async () => {
  const navbarContent = await getNavbarContent();
  const source = `
  ## title
  `;
  const { content, data } = matter(source)
  const mdxSource = await serialize(content, {scope:data})
  return { props: { mdxSource, navbarContent } }
}