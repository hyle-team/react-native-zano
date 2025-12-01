import { assertApiErrorCode, errorWithResponse } from '../asserts';
import { ZanoApiFailedError } from '../errors';
import { PlainWallet } from '../plain-wallet';
import { TypedJSON, type JSONConstrain } from '../utils/typed-json';
import type { DeepReadonly } from '../utils/types';
import type { ZanoController } from './zano-controller';

export class ZanoAppConfig<AppConfig extends JSONConstrain<AppConfig>> {
  constructor(
    readonly api: ZanoController,
    initial: DeepReadonly<AppConfig>,
    encryption_key?: string
  ) {
    this.encryption_key = encryption_key ?? PlainWallet.generate_random_key(20);
    this.#app_config = initial;
  }

  encryption_key: string;

  #app_config!: DeepReadonly<AppConfig>;
  initialize() {
    const response = TypedJSON.parse(PlainWallet.get_appconfig(this.encryption_key));
    if (
      typeof response === 'object' &&
      response !== null &&
      'jsonrpc' in response &&
      'error' in response &&
      typeof response.error === 'object' &&
      response.error !== null &&
      'code' in response.error
    ) {
      assertApiErrorCode(response);
    }
    this.#app_config = response as DeepReadonly<AppConfig>;
  }
  get(): DeepReadonly<AppConfig> {
    return this.#app_config;
  }
  set(next: DeepReadonly<AppConfig>) {
    const response = TypedJSON.parse(PlainWallet.set_appconfig(TypedJSON.stringify(next), this.encryption_key));
    if (response.error) throw errorWithResponse(new ZanoApiFailedError(response.error.message), response);
    this.#app_config = next;
  }
}
