const fs = require('fs');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const packageJSON = require('./package.json');
const excludedFolders = require('../../tools/excludedFolders');

const isV2Build = process.env.IS_V2 === 'true';

const distPath = path.join(__dirname, 'dist');
let outputPath = distPath;
let entryFolder = path.join(__dirname, 'src');

if (isV2Build) {
  outputPath = path.join(distPath, 'v2');
  entryFolder = path.join(__dirname, 'src', 'v2');
}

const fileNames = fs.readdirSync(path.resolve(entryFolder));
const entry = fileNames
  .filter((name) => !excludedFolders.includes(name))
  .reduce((acc, curr) => {
    if (curr.includes('.js')) {
      acc[curr.replace('.js', '')] = path.resolve(entryFolder);
    } else {
      acc[curr] = path.resolve(entryFolder, curr);
    }

    return acc;
  }, {});

// Plugin section
const analyzePlugins = [];

if (process.env.BUNDLE_ANALYZE) {
  analyzePlugins.push(new BundleAnalyzerPlugin());
}

const externalNodeModules = [];
[...Object.keys(packageJSON.peerDependencies)].forEach((module) => {
  externalNodeModules.push(new RegExp(`^${module}(/.+)?$`));
});

module.exports = {
  entry,
  mode: process.env.NODE_ENV,
  devtool: process.env.NODE_ENV === 'development' ? 'eval-source-map' : false,
  output: {
    filename: `[name].${process.env.NODE_ENV}.js`,
    path: outputPath,
    libraryTarget: 'umd',
    globalObject: 'this',
    library: 'strapiDs',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/(node_modules)/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(png|jpg|svg)$/i,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },
    ],
  },
  plugins: [].concat(analyzePlugins),
  externals: externalNodeModules,
  resolve: {
    alias: {
      '@strapi/icons': path.dirname(require.resolve('../strapi-icons/dist')),
    },
  },
};
