'use strict';

const path = require('path');

/**
 * @type {import('jest').Config}
 */
module.exports = {
  rootDir: __dirname,
  testMatch: ['/**/(*.)+(spec|test).[jt]s?(x)'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  globalSetup: '<rootDir>/test/global-setup.js',
  setupFilesAfterEnv: ['@testing-library/jest-dom', '<rootDir>/test/env-setup.js'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
    '^@strapi/design-system$': '<rootDir>/packages/strapi-design-system/src',
    '^@strapi/ui-primitives$': '<rootDir>/packages/primitives/src',
    '^@strapi/icons$': '<rootDir>/packages/strapi-icons/src',
    '^react$': path.join(__dirname, 'node_modules/react'),
    '^react-dom$': path.join(__dirname, 'node_modules/react-dom'),
    '^react-router-dom$': path.join(__dirname, 'node_modules/react-router-dom'),
    '^styled-components$': path.join(__dirname, 'node_modules/styled-components'),
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      },
    ],
  },
  prettierPath: require.resolve('prettier-2'),
  watchPlugins: [
    require.resolve('jest-watch-select-projects'),
    require.resolve('jest-watch-typeahead/filename'),
    require.resolve('jest-watch-typeahead/testname'),
  ],
};
