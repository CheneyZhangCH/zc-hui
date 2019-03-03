const path = require('path');
// 只有程序员开发用
// npm install --save-dev xxx
// 只有用户用
// npm install --save xxx

module.exports = {
  mode: 'production',
  entry: {
    index: './lib/index.jsx',
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
  }
};
