import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import pages from 'data/structure';

const root = process.cwd();

export async function getFiles() {
  return fs.readdirSync(path.join(root, 'data', 'pages'));
}
export async function getFileBySlug(slug) {
  const source = fs.readFileSync(path.join(root, 'data', 'pages', `${slug}.mdx`), 'utf8');
  const { content, data } = matter(source);

  return {
    content,
    data,
  };
}

export async function getNavbarContent() {
  const navContent = [];
  await Promise.all(
    pages.map(async (pageSection) => {
      const pagesArray = await createPagesArray(pageSection.pages);
      navContent.push({
        title: pageSection.title,
        pages: pagesArray,
      });
    }),
  );

  return navContent;
}

async function createPagesArray(pages) {
  return await Promise.all(
    pages.map((pageFileName) => {
      const result = createPageObject(pageFileName);

      return result;
    }),
  );
}

async function createPageObject(pageName) {
  const pagePath = `/${pageName}`;
  const { data } = await getFileBySlug(pageName);

  return {
    name: data.title,
    link: pagePath,
  };
}
