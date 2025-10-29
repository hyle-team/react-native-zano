const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

let dispose;
const main = () => {
  const platform = process.argv[2];
  const currentPkgFile = path.join(__dirname, '../package.json');
  const backupPkgFile = path.join(__dirname, '../_package.json');
  const platformPkgFile = path.join(__dirname, `../package.${platform}.json`);
  const platformPkgTgz = path.join(__dirname, `../package.${platform}.tgz`);

  console.log(`Pack prebuilts for ${platform}`);
  if (fs.existsSync(platformPkgTgz)) {
    console.log(`Removing old ${platformPkgTgz}...`);
    fs.unlinkSync(platformPkgTgz);
  }
  console.log(`Reading version...`);
  const { version } = JSON.parse(fs.readFileSync(currentPkgFile));
  console.log(`  ${version}`);
  console.log(`Backup package.json`);
  fs.renameSync(currentPkgFile, backupPkgFile);
  dispose = () => {
    console.log(`Restore package.json`);
    fs.unlinkSync(currentPkgFile);
    fs.renameSync(backupPkgFile, currentPkgFile);
  };
  try {
    console.log(`Switching package.json to package.${platform}.json`);
    const pkg = JSON.parse(fs.readFileSync(platformPkgFile));
    pkg.version = version;
    console.log(`Saving...`);
    fs.writeFileSync(currentPkgFile, JSON.stringify(pkg, undefined, 2) + '\n');
    console.log(`Pack...`);
    execSync(`yarn pack --out package.${platform}.tgz`, { cwd: path.join(__dirname, '..'), stdio: 'inherit' });
  } finally {
    dispose();
    dispose = undefined;
  }
};

const shitdown = () => {
  console.log(`Gracefull shutdown`);
  dispose?.();
  process.exit(0);
};
process.on('SIGINT', shitdown);
process.on('SIGTERM', shitdown);

main();
