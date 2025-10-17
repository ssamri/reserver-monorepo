import nextJest from 'next/jest.js';

const createJestConfig = nextJest({ dir: './' });

const customJestConfig = async () => ({
  displayName: 'client',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@reserver/ui$': '<rootDir>/../../libs/ui/src',
    '^@reserver/models$': '<rootDir>/../../libs/models/src',
    '^@reserver/utils$': '<rootDir>/../../libs/utils/src',
    '^@reserver/i18n$': '<rootDir>/../../libs/i18n/src'
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setup-tests.ts']
});

export default createJestConfig(customJestConfig);
