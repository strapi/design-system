const formatToMd = (stats) => {
  const markdown = `
    | Status | Module | Size diff | Gzip Size diff | Dependency count diff |
    |--------|--------|-----------|----------------|-----------------------|
    ${stats.map(
      (row) =>
        `| ${row.status}  |   ${row.module}     |   ${row.size}      |   ${row.gzip}      |  ${row.depCount}   |`,
    )}`;

  return markdown;
};

module.exports = { formatToMd };
