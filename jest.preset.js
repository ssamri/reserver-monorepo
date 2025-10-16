const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,
  testEnvironmentOptions: {
    ...nxPreset.testEnvironmentOptions,
    customExportConditions: ['node', 'node-addons']
  }
};
