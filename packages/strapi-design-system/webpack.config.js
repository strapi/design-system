const fs = require('fs');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// Allows to create distinct bundles in the dist folder
// for people wanting to import only specific components such as
// import Button from '@strapi/design-system/Button
const excludedFolders = ['helpers'];
const fileNames = fs.readdirSync(path.resolve(__dirname, 'src'));
const entry = fileNames
  .filter((name) => !excludedFolders.includes(name))
  .reduce((acc, curr) => {
    if (curr.includes('.js')) {
      acc[curr.replace('.js', '')] = path.resolve(__dirname, 'src');
    } else {
      // Folder resolution
      acc[curr] = path.resolve(__dirname, 'src', curr);
    }

    return acc;
  }, {});

// Plugin section
const analyzePlugins = [];

if (process.env.BUNDLE_ANALYZE) {
  analyzePlugins.push(new BundleAnalyzerPlugin());
}

module.exports = {
  entry: entry,
  mode: 'production',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
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
    ],
  },
  plugins: [new CleanWebpackPlugin()].concat(analyzePlugins),
  externals: {
    react: 'react',
    reactDOM: 'react-dom',
    'styled-components': {
      commonjs: 'styled-components',
      commonjs2: 'styled-components',
      amd: 'styled-components',
    },
  },
};
