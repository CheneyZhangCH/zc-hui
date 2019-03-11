const baseConfig = require('./webpack.config');

// 文件打包太大解决办法如下
// mode: 'production'
// externals: 外部文件单独打包， root 对应 <scrip src='xxx。js'>

module.exports = Object.assign({}, baseConfig, {
  mode: 'production',
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
});

