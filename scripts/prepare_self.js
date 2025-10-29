const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const main = () => {
  const cwd = path.join(__dirname, '../');
  const currentPkgFile = path.join(__dirname, '../package.json');
  const pkg = JSON.parse(fs.readFileSync(currentPkgFile));
  pkg.optionalDependencies['@zano-project/react-native-zano-android-prebuild'] = pkg.version;
  pkg.optionalDependencies['@zano-project/react-native-zano-ios-prebuild'] = pkg.version;
  fs.writeFileSync(currentPkgFile, JSON.stringify(pkg, undefined, 2) + '\n');
  for (let times = 5; times > 0; times -= 1) {
    try {
      execSync('sleep 5', { cwd, stdio: 'inherit' });
      execSync('yarn install', { cwd, stdio: 'inherit' });
      break;
    } catch (error) {
      console.error('Failed:', error);
    }
  }

  pkg.scripts.postinstall = pkg.scripts._postinstall;
  delete pkg.scripts._postinstall;
  fs.writeFileSync(currentPkgFile, JSON.stringify(pkg, undefined, 2) + '\n');
  execSync('yarn pack', { cwd, stdio: 'inherit' });

  pkg.scripts._postinstall = pkg.scripts.postinstall;
  delete pkg.scripts.postinstall;
  fs.writeFileSync(currentPkgFile, JSON.stringify(pkg, undefined, 2) + '\n');
};

main();
