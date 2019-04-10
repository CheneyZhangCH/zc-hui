const path = require('path');

module.exports = {
  // mode: 'development',
  entry: {
    index: './lib/index.tsx',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, './dist/lib'),
    library: 'HUI',
    // 库的格式， amd 和 cmd 的兼容模式，通过判断是否有define ->amd, module->cmd
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /.svg$/,
        loader: 'svg-sprite-loader',
      },
      {
        test: /.scss$/,
        loader: ['style-loader', 'css-loader', 'sass-loader'],
      }
    ]
  },
};

