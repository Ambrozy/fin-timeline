const config = (opt) => (Object.assign({}, {
  hash: true,
  minify: false,
  navcolor: '#000000',
  metrikaCounter: 42218354,
  template: './src/index.template.ejs',
  filename: './' + opt.page,
  chunks: ['index'],
}, opt));

const _HtmlWebpackPlugin = require('html-webpack-plugin');
const Index = new _HtmlWebpackPlugin(
  config({
    title: 'Таймлайн событий',
    navcolor: '#F3F3F3',
    page: 'index.html',
  })
);

module.exports = [
  Index,
];
