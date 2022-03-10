const fs = require('fs-extra');
const path = require('path');

const excludedFolders = process.env.IS_V2 === 'false' ? ['helpers', '.DS_Store'] : ['helpers', '.DS_Store', 'v2'];
const entryFolder =
  process.env.IS_V2 === 'true' ? path.resolve(__dirname, 'src', 'v2') : path.resolve(__dirname, 'src');
const fileNames = fs.readdirSync(entryFolder);

const entries = fileNames.filter((name) => !excludedFolders.includes(name));

const createIndexFile = async (fileName) => {
  const name = fileName.replace('.js', '');
  const content = `
  'use strict';
  
  if (process.env.NODE_ENV === "production") {
    module.exports = require("./${name}.production.js");
  } else {
    module.exports = require("./${name}.development.js");
  }
  `;

  try {
    const outputPath = process.env.IS_V2
      ? path.resolve(__dirname, 'dist', 'v2', `${name}.js`)
      : path.resolve(__dirname, 'dist', `${name}.js`);
    fs.writeFile(outputPath, content);
  } catch (err) {
    console.log(err);
  }
};

entries.forEach((entry) => {
  createIndexFile(entry);
});
