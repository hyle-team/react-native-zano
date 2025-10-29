const fs = require('fs/promises');
const path = require('path');

const copyRecursively = async (sourceDir, destDir) => {
  const files = await fs.readdir(sourceDir);
  for (const file of files) {
    const sourceFile = path.join(sourceDir, file);
    const destFile = path.join(destDir, file);
    const stat = await fs.stat(sourceFile);
    if (stat.isDirectory()) {
      await fs.mkdir(destFile);
      await copyRecursively(sourceFile, destFile);
    } else {
      await fs.copyFile(sourceFile, destFile);
    }
  }
};

const main = async () => {
  const depDir = path.join(__dirname, '../node_modules/@zano-project/react-native-zano-mobile-prebuild');
  const files = await fs.readdir(depDir).catch((error) => {
    console.error('No dependency @zano-project/react-native-zano-mobile-prebuild found.');
    throw error;
  });
  if (!files.includes('libraries')) {
    console.error('@zano-project/react-native-zano-mobile-prebuild is invalid');
    throw new Error('dependency is invalid.');
  }
  const libsDir = path.join(__dirname, '../libraries');
  await fs.mkdir(libsDir);
  await copyRecursively(path.join(depDir, 'libraries'), libsDir);
};
main();
