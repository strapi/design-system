const fs = require('fs');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// Allows to create distinct bundles in the dist folder
// for people wanting to import only specific components such as
// import Button from '@strapi/parts/Button
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
  entry,
  mode: 'production',
  // FIXME remove when DS ready
  devtool: 'eval-source-map',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'strapiDs',
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
  plugins: [new CleanWebpackPlugin()].concat(analyzePlugins),
  externals: [
    {
      react: 'react',
      'react-dom': 'react-dom',
      'react-router-dom': 'react-router-dom',
      'styled-components': 'styled-components',
    },
    /^@strapi\/icons/,
  ],
  resolve: {
    alias: {
      '@strapi/icons': path.dirname(require.resolve('../strapi-icons/dist')),
    },
  },
};
