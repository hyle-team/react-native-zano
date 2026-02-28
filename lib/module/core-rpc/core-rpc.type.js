"use strict";

export let DAEMON_RPC_GET_INFO_FLAG = /*#__PURE__*/function (DAEMON_RPC_GET_INFO_FLAG) {
  DAEMON_RPC_GET_INFO_FLAG[DAEMON_RPC_GET_INFO_FLAG["POS_DIFFICULTY"] = 1] = "POS_DIFFICULTY";
  DAEMON_RPC_GET_INFO_FLAG[DAEMON_RPC_GET_INFO_FLAG["POW_DIFFICULTY"] = 2] = "POW_DIFFICULTY";
  DAEMON_RPC_GET_INFO_FLAG[DAEMON_RPC_GET_INFO_FLAG["NET_TIME_DELTA_MEDIAN"] = 4] = "NET_TIME_DELTA_MEDIAN";
  DAEMON_RPC_GET_INFO_FLAG[DAEMON_RPC_GET_INFO_FLAG["CURRENT_NETWORK_HASHRATE_50"] = 8] = "CURRENT_NETWORK_HASHRATE_50";
  DAEMON_RPC_GET_INFO_FLAG[DAEMON_RPC_GET_INFO_FLAG["CURRENT_NETWORK_HASHRATE_350"] = 16] = "CURRENT_NETWORK_HASHRATE_350";
  DAEMON_RPC_GET_INFO_FLAG[DAEMON_RPC_GET_INFO_FLAG["SECONDS_FOR_10_BLOCKS"] = 32] = "SECONDS_FOR_10_BLOCKS";
  DAEMON_RPC_GET_INFO_FLAG[DAEMON_RPC_GET_INFO_FLAG["SECONDS_FOR_30_BLOCKS"] = 64] = "SECONDS_FOR_30_BLOCKS";
  DAEMON_RPC_GET_INFO_FLAG[DAEMON_RPC_GET_INFO_FLAG["TRANSACTIONS_DAILY_STAT"] = 128] = "TRANSACTIONS_DAILY_STAT";
  DAEMON_RPC_GET_INFO_FLAG[DAEMON_RPC_GET_INFO_FLAG["LAST_POS_TIMESTAMP"] = 256] = "LAST_POS_TIMESTAMP";
  DAEMON_RPC_GET_INFO_FLAG[DAEMON_RPC_GET_INFO_FLAG["LAST_POW_TIMESTAMP"] = 512] = "LAST_POW_TIMESTAMP";
  DAEMON_RPC_GET_INFO_FLAG[DAEMON_RPC_GET_INFO_FLAG["TOTAL_COINS"] = 1024] = "TOTAL_COINS";
  DAEMON_RPC_GET_INFO_FLAG[DAEMON_RPC_GET_INFO_FLAG["LAST_BLOCK_SIZE"] = 2048] = "LAST_BLOCK_SIZE";
  DAEMON_RPC_GET_INFO_FLAG[DAEMON_RPC_GET_INFO_FLAG["TX_COUNT_IN_LAST_BLOCK"] = 4096] = "TX_COUNT_IN_LAST_BLOCK";
  DAEMON_RPC_GET_INFO_FLAG[DAEMON_RPC_GET_INFO_FLAG["POS_SEQUENCE_FACTOR"] = 8192] = "POS_SEQUENCE_FACTOR";
  DAEMON_RPC_GET_INFO_FLAG[DAEMON_RPC_GET_INFO_FLAG["POW_SEQUENCE_FACTOR"] = 16384] = "POW_SEQUENCE_FACTOR";
  DAEMON_RPC_GET_INFO_FLAG[DAEMON_RPC_GET_INFO_FLAG["OUTS_STAT"] = 32768] = "OUTS_STAT";
  DAEMON_RPC_GET_INFO_FLAG[DAEMON_RPC_GET_INFO_FLAG["PERFORMANCE"] = 65536] = "PERFORMANCE";
  DAEMON_RPC_GET_INFO_FLAG[DAEMON_RPC_GET_INFO_FLAG["POS_BLOCK_TS_SHIFT_VS_ACTUAL"] = 131072] = "POS_BLOCK_TS_SHIFT_VS_ACTUAL";
  DAEMON_RPC_GET_INFO_FLAG[DAEMON_RPC_GET_INFO_FLAG["MARKET"] = 262144] = "MARKET";
  DAEMON_RPC_GET_INFO_FLAG[DAEMON_RPC_GET_INFO_FLAG["EXPIRATIONS_MEDIAN"] = 524288] = "EXPIRATIONS_MEDIAN";
  DAEMON_RPC_GET_INFO_FLAG[DAEMON_RPC_GET_INFO_FLAG["ALL_FLAGS"] = 1048575] = "ALL_FLAGS";
  return DAEMON_RPC_GET_INFO_FLAG;
}({});

// on_getblockcount

// on_getblockhash

// on_send_raw_tx

// on_getblocktemplate

// on_submitblock

// on_submitblock2

// on_get_last_block_header

// on_get_block_header_by_hash

// on_get_block_header_by_height

// on_get_alias_details

// on_aliases_by_address

// on_get_alias_reward

// on_alias_lookup

// on_get_est_height_from_date

// on_find_outs_in_recent_blocks

// on_find_outs_in_recent_blocks

// on_rpc_get_blocks_details

// on_get_tx_details

// on_search_by_id

// on_get_info

// on_get_out_info

// on_get_multisig_info

// on_get_all_aliases

// on_get_aliases

// on_get_pool_txs_details

// on_get_pool_txs_brief_details

// on_get_all_pool_tx_list

// on_get_pool_info

// on_get_random_outs

// on_get_random_outs1

// on_get_random_outs3

// on_get_votes

// on_get_asset_info

// on_get_assets_list

// on_decrypt_tx_details

// on_get_main_block_details
// on_get_alt_block_details

// on_get_alt_blocks_details

// // on_reset_transaction_pool
// export type DAEMON_RPC_RESET_TX_POOL_REQUEST = {};
// export type DAEMON_RPC_RESET_TX_POOL_RESPONSE = {
//   /** Status of the call. */
//   status: API_RETURN_CODE.OK;
// };

// // on_remove_tx_from_pool
// export type DAEMON_RPC_REMOVE_TX_FROM_POOL_REQUEST = {
//   /** List of transaction IDs that are to be removed from the transaction pool. */
//   tx_to_remove: string[];
// };
// export type DAEMON_RPC_REMOVE_TX_FROM_POOL_RESPONSE = {
//   /** Status of the call. */
//   status: API_RETURN_CODE.OK;
// };

// on_get_current_core_tx_expiration_median

// on_get_offers_ex

// on_validate_signature
//# sourceMappingURL=core-rpc.type.js.map