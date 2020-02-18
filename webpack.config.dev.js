const baseConfig = require('./webpack.config');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = Object.assign({}, baseConfig, {
  mode: 'development',
  entry: {
    example: './example.tsx',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'HUI',
      template: 'example.html',
    })
  ],
  devServer: {
    port: 9000,
    // open:true,
  },
});
