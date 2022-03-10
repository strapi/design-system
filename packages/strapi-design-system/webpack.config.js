const fs = require('fs');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const distPath = path.join(__dirname, 'dist');
const isV2Build = process.env.IS_V2 === 'true';
const outputPath = isV2Build ? path.join(distPath, 'v2') : distPath;

// Allows to create distinct bundles in the dist folder
// for people wanting to import only specific components such as
// import Button from '@strapi/design-system/Button
const entryFolder = isV2Build ? path.join(__dirname, 'src', 'v2') : path.join(__dirname, 'src');
const excludedFolders = isV2Build ? ['helpers', '.DS_Store'] : ['helpers', '.DS_Store', 'v2'];
const fileNames = fs.readdirSync(path.resolve(entryFolder));
const entry = fileNames
  .filter((name) => !excludedFolders.includes(name))
  // .filter((name) => (isV2Build ? true : !name.includes(path.join(__dirname, 'src', 'v2'))))
  .reduce((acc, curr) => {
    if (curr.includes('.js')) {
      // acc[curr.replace('.js', '')] = path.resolve(__dirname, 'src');
      acc[curr.replace('.js', '')] = path.resolve(entryFolder);
    } else {
      // Folder resolution
      // acc[curr] = path.resolve(__dirname, 'src', curr);
      acc[curr] = path.resolve(entryFolder, curr);
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
