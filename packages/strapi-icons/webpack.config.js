const path = require('path');
const fs = require('fs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const fileNames = Array.from(new Set(fs.readdirSync(path.resolve(__dirname, 'src')))).map((fileName) =>
  fileName.substr(0, fileName.length - 3),
);

const entry = fileNames.reduce((acc, curr) => {
  acc[curr] = path.resolve(__dirname, 'src', `${curr}.js`);

  return acc;
}, {});

// Plugin section
const analyzePlugins = [];

if (process.env.BUNDLE_ANALYZE) {
  analyzePlugins.push(new BundleAnalyzerPlugin());
}

module.exports = {
  entry: entry,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
    libraryTarget: 'umd',
    globalObject: 'this',
    library: 'strapiIcons',
    globalObject: 'this',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/(node_modules)/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
  plugins: [new CleanWebpackPlugin()].concat(analyzePlugins),
};
