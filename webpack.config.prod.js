const baseConfig = require('./webpack.config')

module.exports = Object.assign({}, baseConfig, {
  mode: 'production',
  // externals: 外部文件单独打包， root 对应 <scrip src='xxx。js'>
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
})
