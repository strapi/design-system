const fs = require('fs-extra');
const path = require('path');

const generateExports = async () => {
  const dest = path.resolve(__dirname, '..', 'src', 'index.js');
  const dirs = await fs.readdir(path.resolve(__dirname, '..', 'src'));
  const components = dirs.filter((file) => {
    const isComponent = file.charAt(0) === file.charAt(0).toUpperCase();

    // We need to keep the themes
    return isComponent || file === 'themes';
  });

  const content = `${components.map((component) => `export * from './${component}';`).join('\n')} `;

  await fs.ensureFile(dest);
  await fs.writeFile(dest, content);
};

generateExports().catch((err) => console.error(err));
