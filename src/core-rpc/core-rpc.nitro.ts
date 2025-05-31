import type { HybridObject } from 'react-native-nitro-modules';

export interface CoreRpc extends HybridObject<{ ios: 'c++'; android: 'c++' }> {
  base64_encode(data: string): string;
  base64_decode(data: string): string;

  getblockcount(params: string): Promise<string>;
  on_getblockhash(params: string): Promise<string>;
  getblocktemplate(params: string): Promise<string>;
  submitblock(params: string): Promise<string>;
  submitblock2(params: string): Promise<string>;
  getlastblockheader(params: string): Promise<string>;
  getblockheaderbyhash(params: string): Promise<string>;
  getblockheaderbyheight(params: string): Promise<string>;
  get_alias_details(params: string): Promise<string>;
  get_alias_by_address(params: string): Promise<string>;
  get_alias_reward(params: string): Promise<string>;
  get_est_height_from_date(params: string): Promise<string>;
  find_outs_in_recent_blocks(params: string): Promise<string>;
  get_blocks_details(params: string): Promise<string>;
  get_tx_details(params: string): Promise<string>;
  search_by_id(params: string): Promise<string>;
  getinfo(params: string): Promise<string>;
  get_out_info(params: string): Promise<string>;
  get_multisig_info(params: string): Promise<string>;
  get_all_alias_details(params: string): Promise<string>;
  get_aliases(params: string): Promise<string>;
  get_pool_txs_details(params: string): Promise<string>;
  get_pool_txs_brief_details(params: string): Promise<string>;
  get_all_pool_tx_list(params: string): Promise<string>;
  get_pool_info(params: string): Promise<string>;
  getrandom_outs(params: string): Promise<string>;
  getrandom_outs1(params: string): Promise<string>;
  getrandom_outs3(params: string): Promise<string>;
  get_votes(params: string): Promise<string>;
  get_asset_info(params: string): Promise<string>;
  get_assets_list(params: string): Promise<string>;
  decrypt_tx_details(params: string): Promise<string>;
  get_main_block_details(params: string): Promise<string>;
  get_alt_block_details(params: string): Promise<string>;
  get_alt_blocks_details(params: string): Promise<string>;
  reset_transaction_pool(params: string): Promise<string>;
  remove_tx_from_pool(params: string): Promise<string>;
  get_current_core_tx_expiration_median(params: string): Promise<string>;
  marketplace_global_get_offers_ex(params: string): Promise<string>;
  validate_signature(params: string): Promise<string>;
}
