module.exports = {
    '**/*.js?(x)': (filenames) =>
      `eslint lint --fix --file ${filenames
        .map((file) => file.split(process.cwd())[1])
        .join(' --file ')}`,
  }