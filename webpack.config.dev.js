const baseConfig = require('./webpack.config');

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 只有程序员开发用
// npm install --save-dev xxx
// 只有用户用
// npm install --save xxx

// mode: 'production'时会压缩代码成一行，'development'代码不会压缩一行

module.exports = Object.assign({}, baseConfig, {
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'HUI',
      template: 'index.html',
    })
  ],
});
