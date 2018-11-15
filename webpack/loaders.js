const _MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

const EJSLoader = {
  test: /\.(ejs)$/,
  include: path.resolve(__dirname, '../src/_partials'),
  use: {
    loader: 'ejs-compiled-loader',
    options: {
      beautify: true,
      htmlmin: false,
    }
  }
}

const JSLoader = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        "@babel/preset-env"
      ]
    }
  }
};

const ESLintLoader = {
  test: /\.js$/,
  enforce: 'pre',
  exclude: /node_modules/,
  use: {
    loader: 'eslint-loader',
    options: {
      configFile: __dirname + '/.eslintrc'
    },
  }
};

const postcssOpt = {
  config: {
    path: __dirname + '/postcss.config.js'
  }
};

const SCSSLoader = {
  test: /\.(s*)css$/,
  use: [
    _MiniCssExtractPlugin.loader,
    'css-loader',
    { loader: 'postcss-loader', options: postcssOpt, },
    'sass-loader',
  ],
};

const StylusLoader = {
  test: /\.styl$/,
  use: [
    _MiniCssExtractPlugin.loader,
    'css-loader',
    { loader: 'postcss-loader', options: postcssOpt, },
    'stylus-loader',
  ],
};

const FileLoader = {
  test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.eot$|\.ttf$|\.wav$|\.mp3$/,
  use: {
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      outputPath: 'assets/'
    }
  }
};

module.exports = [
  EJSLoader,
  JSLoader,
  ESLintLoader,
  SCSSLoader,
  StylusLoader,
  FileLoader,
];
