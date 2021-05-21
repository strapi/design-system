const fs = require('fs/promises');
const path = require('path');
const { formatToMd } = require('./format-to-md');
const { compareStats } = require('./compare-stats');

const compareWebpackSize = async () => {
  const bundleStatPathOnCi = process.env.BUNDLE_STAT_PATH;
  const currentBundleSizePath = path.join(process.cwd(), 'dist', 'report.json');
  const currentBundleStat = require(currentBundleSizePath);

  try {
    const previousBundleStats = require(bundleStatPathOnCi);
    const comparedStats = compareStats(currentBundleStat, previousBundleStats);
    const md = formatToMd(comparedStats);

    console.table(comparedStats);
  } catch (err) {
    console.log('Stat does not exist yet, copying the actual file.');
    return fs.copyFile(currentBundleSizePath, bundleStatPathOnCi);
  }
};

(async () => {
  console.log('\n\n----------\n');
  await compareWebpackSize();
  console.log('\n----------\n');
})();
