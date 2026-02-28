import { type open_wallet_response } from '../entities';
import type { ZanoController } from './zano-controller';
import { ZanoWallet } from './zano-wallet';
export declare const wallets_by_files: WeakMap<ZanoWalletFile, ZanoWallet | null>;
export declare class ZanoWalletFile {
    readonly api: ZanoController;
    readonly name: string;
    constructor(api: ZanoController, name: string, response?: open_wallet_response);
    get wallet(): ZanoWallet | null | undefined;
    open(password: string): Promise<ZanoWallet>;
}
//# sourceMappingURL=zano-wallet-file.d.ts.map