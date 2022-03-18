const fs = require("fs");
const { join } = require('path')

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


const packageJsonPath = join(process.cwd(), 'package.json');
let packageJsonPathDest

if (process.env.IS_V2 === 'true') {
  packageJsonPathDest = join(process.cwd(), 'dist', 'v2', 'package.json');
} else {
   packageJsonPathDest = join(process.cwd(), 'dist', 'package.json');
}


copy(packageJsonPath, packageJsonPathDest);
