const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const main = () => {
  const currentPkgFile = path.join(__dirname, '../package.json');
  const pkg = JSON.parse(fs.readFileSync(currentPkgFile));
  pkg.optionalDependencies['@zano-project/react-native-zano-android-prebuild'] = pkg.version;
  pkg.optionalDependencies['@zano-project/react-native-zano-ios-prebuild'] = pkg.version;
  fs.writeFileSync(currentPkgFile, JSON.stringify(pkg, undefined, 2));
};

main();
