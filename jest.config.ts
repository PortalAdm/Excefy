import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '/\\.storybook/',
    '\\.stories\\.(jsx?|tsx?)$'
  ],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts(x)'],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
  moduleNameMapper: {
    '^~/(.+)': '<rootDir>/$1',
    '^~hooks/(.+)': '<rootDir>/src/app/shared/hooks/$1',
    '^~contexts/(.+)': '<rootDir>/src/app/shared/contexts/$1',
    '^~shared/(.+)': '<rootDir>/src/app/shared/$1'
  }
};

export default jestConfig;
