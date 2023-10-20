module.exports = {
  roots: [
    '<rootDir>/src'
  ],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.js'
  ],
  testEnvironment: 'node',
  moduleNameMapper: {
    axios: 'axios/dist/node/axios.cjs'
  }
}
