const path = require('path');
const loaders = require('./loaders');
const minimizers = require('./minimizers');
const plugins = require('./plugins');
const htmls = require('./htmls');

module.exports = {
  entry: {
    index: './src/js/index.js',
  },
  module: {
    rules: loaders
  },
  optimization: {
    minimizer: minimizers
  },
  plugins: [
    ...plugins,
    ...htmls,
  ],
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js",
  },
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    open: true,
  },
};
