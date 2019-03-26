const base = require('./jest.config')
module.exports = Object.assign({}, base, {
  // 测试覆盖率相关配置
  reporters: ["jest-junit"],
  collectCoverage: true,
  collectCoverageFrom: ['lib/**/*.{js,jsx,ts,tsx}', '!**/node_modules/**'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
})

