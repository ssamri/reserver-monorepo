import { join } from 'node:path';
import type { Config } from 'jest';

const config: Config = {
  displayName: 'api',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|js|mjs)$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }]
  },
  moduleNameMapper: {
    '^@reserver/ui$': '<rootDir>/../../libs/ui/src',
    '^@reserver/models$': '<rootDir>/../../libs/models/src',
    '^@reserver/utils$': '<rootDir>/../../libs/utils/src',
    '^@reserver/i18n$': '<rootDir>/../../libs/i18n/src'
  },
  coverageDirectory: join(__dirname, '../../coverage/apps/api'),
  collectCoverageFrom: ['src/**/*.ts', '!src/main.ts']
};

export default config;
