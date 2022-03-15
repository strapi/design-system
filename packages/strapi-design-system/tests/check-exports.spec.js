const fs = require('fs-extra');
const path = require('path');
const filesToKeep = require('./filesToKeep');

describe('Check components are all exported correctly (index.js)', () => {
  it('should generate the exports correctly', async () => {
    const dest = path.resolve(__dirname, '..', 'src', 'index.js');
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

    const dirs = await fs.readdir(path.resolve(__dirname, '..', 'src'));
    const components = dirs.filter((file) => {
      const isComponent = file.charAt(0) === file.charAt(0).toUpperCase() || file === 'v2';

      return isComponent;
    });
    const expected = [...filesToKeep, ...components].sort();

    expect(exportedComponents).toEqual(expected);
  });
});
