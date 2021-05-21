const compareStats = (currStat, prevStat) => {
  const comparedStats = currStat.map((stat) => {
    const accordingPrevStat = prevStat.find((prvStat) => prvStat.label === stat.label);

    if (!accordingPrevStat) {
      return {
        status: '',
        module: stat.label,
        size: 0,
        gzip: 0,
        depCount: 0,
      };
    }

    return {
      status:
        stat.gzipSize === accordingPrevStat.gzipSize ? '=' : stat.gzipSize > accordingPrevStat.gzipSize ? '📈' : '📉',
      module: stat.label,
      size: stat.statSize - accordingPrevStat.statSize,
      gzip: stat.gzipSize - accordingPrevStat.gzipSize,
      depCount: stat.groups.length - accordingPrevStat.groups.length,
    };
  });

  return comparedStats;
};

module.exports = { compareStats };
