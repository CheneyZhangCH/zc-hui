const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 只有程序员开发用
// npm install --save-dev xxx
// 只有用户用
// npm install --save xxx

// mode: 'production'时会压缩代码成一行，'development'代码不会压缩一行

// 文件打包太大解决办法如下
// externals: 外部文件单独打包， root 对应 <scrip src='xxx。js'>

module.exports = {
  mode: 'development',
  entry: {
    index: './lib/index.tsx',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, './dist/lib'),
    library: 'HUI', // 库的名字
    libraryTarget: 'umd', // 库的格式， amd 和 cmd 兼容模式，通过判断是否有define ->amd, module->cmd
  },
  module: {
    rules: [{
      test: /\.tsx?$/, // 规则
      loader: 'awesome-typescript-loader', // loader
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'HUI',
      template: 'index.html',
    })
  ],
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: 'ReactDOM',
    },
  },
};

