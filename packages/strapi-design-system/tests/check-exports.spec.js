const fs = require('fs-extra');
const { resolve } = require('path');

// List of files we want to ignore when running the equality check
const FILES_NAMES_TO_IGNORE = ['.DS_Store'];

// List of files we want to include in the index.js file
const FILES_TO_KEEP = ['themes'];

describe('Check components are all exported correctly (index.js)', () => {
  it('should generate the exports correctly', async () => {
    const dest = resolve(__dirname, '..', 'src', 'index.js');
    const buffer = await fs.readFile(dest);
    const content = buffer.toString();
    const exportedComponents = content
      .split(';')
      .map((c) => c.trim())
      .filter((c) => c)
      .map((c) => {
        return c.substring(c.indexOf('/') + 1, c.lastIndexOf("'"));
      })
      .sort();

    const dirs = await fs.readdir(resolve(__dirname, '..', 'src'));
    const components = dirs.filter((file) => {
      const isComponent = file.charAt(0) === file.charAt(0).toUpperCase() || file === 'v2';

      return isComponent;
    });
    const expected = [...FILES_TO_KEEP, ...components]
      .filter((fileName) => !FILES_NAMES_TO_IGNORE.includes(fileName))
      .sort();

    expect(exportedComponents).toEqual(expected);
  });
});
