import { join } from 'node:path';
import type { Config } from 'jest';

const config: Config = {
  displayName: 'extranet',
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  transform: {
    '^.+\\.(ts|mjs|js|html)$': ['ts-jest', {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$'
    }]
  },
  moduleNameMapper: {
    '^@reserver/ui$': '<rootDir>/../../libs/ui/src',
    '^@reserver/models$': '<rootDir>/../../libs/models/src',
    '^@reserver/utils$': '<rootDir>/../../libs/utils/src',
    '^@reserver/i18n$': '<rootDir>/../../libs/i18n/src'
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  coverageDirectory: join(__dirname, '../../coverage/apps/extranet')
};

export default config;
