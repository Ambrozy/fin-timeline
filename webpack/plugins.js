const path = require('path');

const _MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MiniCssExtractPlugin = new _MiniCssExtractPlugin({
  filename: "[name].css",
  chunkFilename: "[id].css"
});

const _StyleLintPlugin = require('stylelint-webpack-plugin');
const StyleLintPlugin = new _StyleLintPlugin({
  configFile: path.resolve(__dirname, 'stylelint.config.js'),
  context: path.resolve(__dirname, '../src/css'),
  files: '**/*.css',
  failOnError: false,
  quiet: false,
});

// remove unused selectors from your CSS detected from html
// const PurifyCSSPlugin = require('purifycss-webpack');

const _CopyWebpackPlugin = require('copy-webpack-plugin');
const CopyWebpackPlugin = new _CopyWebpackPlugin([ { from: 'src/assets', to: 'assets' } ]);
const CopyStatic = new _CopyWebpackPlugin([ { from: 'src/static', to: './' } ]);

module.exports = [
  MiniCssExtractPlugin,
  StyleLintPlugin,
  CopyWebpackPlugin,
  CopyStatic,
];
