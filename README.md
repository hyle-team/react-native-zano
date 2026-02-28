# @zano-project/react-native-zano

Zano Wallet Library for mobile platforms

## Installation

```sh
npm install @zano-project/react-native-zano @zano-project/react-native-zano-ios-prebuild @zano-project/react-native-zano-android-prebuild react-native-nitro-modules
```

`react-native-nitro-modules` is required as this library relies on [Nitro Modules](https://nitro.margelo.com/).

## Usage

`ZanoController` closely resembles [`plain_wallet_api.h`](libraries/include/plain_wallet_api.h) except it wraps any
wallets related apis into `ZanoWallet` instance ([`sync_call`](libraries/include/plain_wallet_api.h#L43) mostly).

```ts
import { ZanoController } from '@zano-project/react-native-zano';

const zano = new ZanoController('https://node.zano.org:443');
console.log(`Running on zano(${zano.lib_version})`); // will return version of Zano
console.log(`  working_directory: ${zano.working_directory}`);
console.log(`  downloads_directory: ${zano.downloads_directory}`);

console.log('Initializing...');
await zano.initialize();

if (zano.wallet_files.length) {
  console.log('Found wallet files:');
  zano.wallet_files.forEach((file) => {
    console.log(`  "${file.name}" - ${file.wallet ? 'opened' : 'closed'}`);
  });
} else {
  console.log('No wallet files found');
}

console.log('Generating new wallet...');
const wallet = await zano.generate_wallet('Test Wallet', '****');

console.log("Getting it's status...");
const status = await wallet.get_status();
console.log(`Newly generated wallet status: ${status}`);

console.log('Closing wallet...');
await wallet.close();

console.log('Requesting alias info from remote daemon...');
const { address, tracking_key, comment } = await zano.daemon.get_alias_details({ alias: 'dev' });
console.log(`alias(dev) information: ${{ address, tracking_key, comment }}`);

console.log('Deinitializing library...');
await zano.dispose();
```

`ZanoWalletFile` represents existing wallet files. Should not be instantiated manually.

```ts
import { ZanoController } from '@zano-project/react-native-zano';

const zano = new ZanoController('https://node.zano.org:443');
const file = zano.wallet_files.get('Test Wallet');
if (!file) throw new Error('File not found');
file.wallet; // reference to `ZanoWallet` instance, if null indicates that file was not opened yet.
await file.open('****');
if (!file.wallet) throw new Error('Should be opened at this point');
```

`ZanoWallet` represents opened wallet file. Should not be instantiated manually.

```ts
import { ZanoController } from '@zano-project/react-native-zano';

const zano = new ZanoController('https://node.zano.org:443');
const file = zano.wallet_files.get('Test Wallet');
if (!file?.wallet) throw new Error('File is not opened or not found');
console.log(`Wallet balances are: ${file.wallet.wi.balances}`);
```

`ZanoAppConfig` wraps `appconfig` api and let's developer store data encrypted with some key

```ts
import { ZanoController, ZanoAppConfig } from '@zano-project/react-native-zano';

const zano = new ZanoController('https://node.zano.org:443');
await zano.initialize();
const key = /* restore key from some secure storage, [react-native-keychain](https://www.npmjs.com/package/react-native-keychain) for example */;
const appconfig = new ZanoAppConfig<{storedData: string} | null>(zano, null, key);
await appconfig.initialize();
console.log(`Stored appconfig: ${appconfig}`);
```

`ZanoController` is a recommended way to use the library, cause it does handle and throws as exceptions all known library errors.
Though it's also possible to use [`plain_wallet_api.h`](libraries/include/plain_wallet_api.h) api directly:

- `PlainWallet` exposes all [`plain_wallet_api.h`](libraries/include/plain_wallet_api.h) methods
- `WalletRpc` separately wraps all [`invoke`](libraries/include/plain_wallet_api.h#L38) methods
- `CoreRpc` exposes remote daemon api methods

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
