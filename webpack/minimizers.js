const _UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const UglifyJsPlugin = new _UglifyJsPlugin({
  cache: true,
  parallel: true
});

const _OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const OptimizeCSSAssetsPlugin = new _OptimizeCSSAssetsPlugin();

const _ImageminPlugin = require('imagemin-webpack-plugin').default;
const ImageminPlugin = new _ImageminPlugin({
  test: /\.(jpe?g|png|gif|svg)$/i,
  pngquant: { quality: '80' },
});

module.exports = [
  UglifyJsPlugin,
  OptimizeCSSAssetsPlugin,
  ImageminPlugin,
];
