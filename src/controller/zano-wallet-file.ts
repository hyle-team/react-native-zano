import { assertApiErrorCode, assertApiReturnErrors } from '../asserts';
import { type open_wallet_response } from '../entities';
import { PlainWallet } from '../plain-wallet';
import { TypedJSON } from '../utils/typed-json';
import type { ZanoController } from './zano-controller';
import { ZanoWallet } from './zano-wallet';

export const wallets_by_files = new WeakMap<ZanoWalletFile, ZanoWallet | null>();
export class ZanoWalletFile {
  constructor(
    readonly api: ZanoController,
    readonly name: string,
    response?: open_wallet_response
  ) {
    wallets_by_files.set(this, response ? new ZanoWallet(this, response) : null);
  }
  get wallet() {
    return wallets_by_files.get(this);
  }

  async open(password: string) {
    if (this.wallet) return this.wallet;
    const response = TypedJSON.parse(await PlainWallet.open(this.name, password));
    assertApiErrorCode(response);
    assertApiReturnErrors(response);
    const wallet = new ZanoWallet(this, { ...response.result, name: this.name, pass: password });
    wallets_by_files.set(this, wallet);
    return wallet;
  }
}
