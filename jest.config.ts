import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  moduleNameMapper: {
    '^@prisma-generated/client$': '<rootDir>/prisma/generated/client',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@modules/(.*)$': '<rootDir>/src/modules/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@users/(.*)$': '<rootDir>/src/modules/users/$1',
    '^@deliveries/(.*)$': '<rootDir>/src/modules/deliveries/$1',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: ['**/*.spec.ts'],
  collectCoverageFrom: [
    "**/*.(t|j)s"
  ],
  coverageDirectory: "../coverage",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
};

export default config;
