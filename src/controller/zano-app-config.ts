import { assertJSONRpcErrorCode, errorWithResponse } from '../asserts';
import { ZanoApiFailError } from '../errors';
import { PlainWallet } from '../plain-wallet';
import { TypedJSON } from '../utils/typed-json';
import type { DeepReadonly } from '../utils/types';
import type { ZanoController } from './zano-controller';

export class ZanoAppConfig<AppConfig> {
  constructor(
    readonly api: ZanoController,
    initial: DeepReadonly<AppConfig>,
    encryption_key?: string
  ) {
    this.encryption_key = encryption_key ?? PlainWallet.generate_random_key(20);
    this.#app_config = initial;
  }

  encryption_key: string | Promise<string>;

  #app_config!: DeepReadonly<AppConfig>;
  async initialize() {
    const response = TypedJSON.parse(await PlainWallet.get_appconfig(await this.encryption_key));
    if (
      typeof response === 'object' &&
      response !== null &&
      'jsonrpc' in response &&
      'error' in response &&
      typeof response.error === 'object' &&
      response.error !== null &&
      'code' in response.error
    ) {
      assertJSONRpcErrorCode(response);
    }
    this.#app_config = response as DeepReadonly<AppConfig>;
  }
  get(): DeepReadonly<AppConfig> {
    return this.#app_config;
  }
  async set(next: DeepReadonly<AppConfig>) {
    const response = TypedJSON.parse(await PlainWallet.set_appconfig(TypedJSON.stringify(next), await this.encryption_key));
    if (response.error) throw errorWithResponse(new ZanoApiFailError(response.error.message), response);
    this.#app_config = next;
  }
}
