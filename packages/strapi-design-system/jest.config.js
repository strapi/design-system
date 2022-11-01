module.exports = {
  testRegex: ['src/.*\\.spec\\.(jsx|js)$', 'tests/.*\\.spec.js$'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect', './test-bundler.js'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
    '^@strapi/icons/(.*)': '<rootDir>/../strapi-icons/dist/$1',
    '^@strapi/icons': '<rootDir>/../strapi-icons/dist/index.js',
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[tj]sx?$': ['@swc/jest', { jsc: { parser: { jsx: true, dynamicImport: true } } }],
    '^.+\\.mdx?$': '@storybook/addon-docs/jest-transform-mdx',
  },
};
