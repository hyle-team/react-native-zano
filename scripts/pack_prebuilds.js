const fs = require('fs/promises');
const path = require('path');
const { execSync } = require('child_process');

const main = async () => {
  const platform = process.argv[2];
  await fs.unlink(path.join(__dirname, `../package.${platform}.tgz`));
  const { version } = JSON.parse(await fs.readFile(path.join(__dirname, '../package.json')));
  await fs.rename(path.join(__dirname, '../package.json'), path.join(__dirname, '../_package.json'));
  try {
    const pkg = JSON.parse(await fs.readFile(path.join(__dirname, `../package.${platform}.json`)));
    pkg.version = version;
    await fs.writeFile(path.join(__dirname, '../package.json'), JSON.stringify(pkg, undefined, 2));
    execSync(`yarn pack --out package.${platform}.tgz`, { cwd: path.join(__dirname, '..') });
  } finally {
    await fs.unlink(path.join(__dirname, '../package.json'));
    await fs.rename(path.join(__dirname, '../_package.json'), path.join(__dirname, '../package.json'));
  }
};
main();
