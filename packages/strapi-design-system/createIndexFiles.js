const fs = require('fs-extra');
const path = require('path');
const excludedFolders = require('../../tools/excludedFolders');

const isV2Build = process.env.IS_V2 === 'true';
let entryFolder = isV2Build ? path.resolve(__dirname, 'src', 'v2') : path.resolve(__dirname, 'src');
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
    const outputPath = isV2Build
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
