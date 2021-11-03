import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'

const root = process.cwd();

export async function getFiles(type){
    return fs.readdirSync(path.join(root,'data',type))
}
export async function getFileBySlug(type, slug) {
    const source = slug
        ? fs.readFileSync(path.join(root, 'data', type, `${slug}`), 'utf8')
        : fs.readFileSync(path.join(root, 'data', `${type}`), 'utf8')
    const { content, data } = matter(source)
    return {
        content,
        data
    };
}

export async function getNavbarContent(){
    const navContent = [];
    const files = await getFiles('');
    await Promise.all(files.map(async (file) => {
        const mdxFiles = await getFiles(file);
        const pagesArray = await createPagesArray(mdxFiles,file);
        navContent.push({
            title:getNameFromFileName(file),
            pages: pagesArray
        });
    }));
    return navContent;
}

async function createPagesArray(pages,sectionName){
    return await Promise.all(pages.map( pageFileName => {
        const result = createPageObject(pageFileName,sectionName)
        return result;
    }));
}

async function createPageObject(pageFileName,sectionName){
    const pageName = getNameFromFileName(pageFileName);
    const pagePath = `/${pageName.split(' ').join('-')}`
    const { data } = await getFileBySlug(sectionName,pageFileName)
    return {
        name:data.title,
        link:pagePath
    }
}

function getNameFromFileName (filename) {
    const filenameArray = filename.split('-');
    filenameArray.shift();
    return filenameArray.join(' ').split('.mdx').join('');
}