const path = require('path');

module.exports = {
  transform: {
    '^.+\\.(jsx|tsx?)$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx|tsx)$',
  moduleDirectories: [
    'node_modules',
  ],
  setupFiles: ['<rootDir>/__tests__/setup/setup.ts'],
  globals: {
    'ts-jest': {
      tsConfig: path.resolve(__dirname, 'tsconfig.json'),
    },
  },
  testPathIgnorePatterns: [
    'node_modules',
  ],
};
