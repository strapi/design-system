const fs = require('fs-extra');
const path = require('path');

const excludedFolders = ['helpers', '.DS_Store'];
const fileNames = fs.readdirSync(path.resolve(__dirname, 'src'));

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
    fs.writeFile(path.resolve(__dirname, 'dist', `${name}.js`), content);
  } catch (err) {
    console.log(err);
  }
};

entries.forEach((entry) => {
  createIndexFile(entry);
});
