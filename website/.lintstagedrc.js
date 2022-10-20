module.exports = {
    '**/*.js?(x)': (filenames) =>
      `eslint --fix ${filenames.join(' ')}`,
  }