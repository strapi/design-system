const fs = require("fs");

const copy = (from, to) => {
  fs.copyFile(from, to, (err) => {
    if (err) {
      console.log(`Error when copying ${packageJsonPath}:\n\n${err}`);
    } else {
      console.log(
        `Successfully copied ${packageJsonPath} => ${packageJsonPathDest}`
      );
    }
  });
};

const packageJsonPath = `${process.cwd()}/package.json`;
const packageJsonPathDest = `${process.cwd()}/dist/package.json`;

copy(packageJsonPath, packageJsonPathDest);
