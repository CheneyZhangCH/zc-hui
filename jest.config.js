// https://jestjs.io/docs/en/configuration.html

module.exports = {
  verbose: true,
  clearMocks: false,
  // 测试覆盖率相关配置 
  collectCoverage: true,
  collectCoverageFrom: ['{lib,include}/**/*.{js,jsx,ts,tsx}', '!**/node_modules/**'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  reporters: ["default", "jest-junit"],

  // globals: {
  //     'ts-jest': {
  //         tsConfig: 'tsconfig.test.json',
  //     },
  // },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleDirectories: ['node_modules', 'include'],
  // 配置jpg scss导出对象
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/test/__mocks__/file-mock.js',
    '\\.(css|less|sass|scss)$': '<rootDir>/test/__mocks__/object-mock.js',
  },
  // 测试文件放置位置及命名形式
  testMatch: ['<rootDir>/**/__tests__/**/*.unit.(js|jsx|ts|tsx)', '<rootDir>/**/*.unit.(js|jsx|ts|tsx)'],
  transform: {
    '^.+unit\\.(js|jsx)$': 'babel-jest',
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  setupFilesAfterEnv: ['<rootDir>test/setupTests.js']
};
