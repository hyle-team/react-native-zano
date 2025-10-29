const fs = require('fs/promises');
const path = require('path');

const copyRecursively = async (sourceDir, destDir) => {
  const files = await fs.readdir(sourceDir);
  for (const file of files) {
    const sourceFile = path.join(sourceDir, file);
    const destFile = path.join(destDir, file);
    const stat = await fs.stat(sourceFile);
    if (stat.isDirectory()) {
      await fs.mkdir(destFile, { recursive: true });
      await copyRecursively(sourceFile, destFile);
    } else {
      await fs.copyFile(sourceFile, destFile);
    }
  }
};

const main = async () => {
  const platform = process.argv[2];
  const pkgName = `@zano-project/react-native-zano-${platform}-prebuild`;
  const depDir = require(pkgName);
  const files = await fs.readdir(depDir).catch((error) => {
    console.error(`No dependency ${pkgName} found.`);
    throw error;
  });
  if (!files.includes('libraries')) {
    console.error(`${pkgName} is invalid`);
    throw new Error('dependency is invalid.');
  }
  const libsDir = path.join(__dirname, '../libraries');
  await fs.mkdir(libsDir, { recursive: true });
  await copyRecursively(path.join(depDir, 'libraries'), libsDir);
};
main();
