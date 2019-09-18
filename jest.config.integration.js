const path = require('path')

module.exports = {
  rootDir: path.join(__dirname),
  roots: ['tests'],
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.test.js'],
  transform: {
    '^.+\\.js$': path.resolve(__dirname, 'jest.transform.integration.js')
  },
  collectCoverage: true,
  coverageDirectory: '<rootDir>/tests/coverage',
  coveragePathIgnorePatterns: ["/node_modules/", "/lib/", "tests/"],
  globalSetup: 'tests/prepare-credentials.js'
}
