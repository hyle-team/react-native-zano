import type { HybridObject } from 'react-native-nitro-modules';
import type {
  alias_rpc_details,
  alias_rpc_details_base,
  API_RETURN_CODE,
  asset_descriptor_base,
  asset_descriptor_with_id,
  bc_performance_data,
  blobdata,
  block_header_response,
  block_rpc_extended_info,
  core_offers_filter,
  daemon_network_state,
  epee_hexemizer,
  maintainers_info_external,
  offer_details_ex,
  outs_index_stat,
  pool_performance_data,
  pos_entry,
  RANDOM_OUTPUTS_FOR_AMOUNTS_FLAGS,
  tx_generation_context,
  tx_rpc_brief_info,
  tx_rpc_extended_info,
  vote_results,
  WalletReturnErrors,
} from '../entities';
import type { JSONRpc, JSONRpcSuccessfulResponse } from '../utils/json-rpc';
import type { TypedBase64, UnwrapTypedBase64 } from '../utils/typed-base64';
import type { __UNPROTECTED__TypedJSON, JSONConstrain } from '../utils/typed-json';
import type { CoreRpc } from './core-rpc.nitro';

export enum DAEMON_RPC_GET_INFO_FLAG {
  POS_DIFFICULTY = 0x00001,
  POW_DIFFICULTY = 0x00002,
  NET_TIME_DELTA_MEDIAN = 0x00004,
  CURRENT_NETWORK_HASHRATE_50 = 0x00008,
  CURRENT_NETWORK_HASHRATE_350 = 0x00010,
  SECONDS_FOR_10_BLOCKS = 0x00020,
  SECONDS_FOR_30_BLOCKS = 0x00040,
  TRANSACTIONS_DAILY_STAT = 0x00080,
  LAST_POS_TIMESTAMP = 0x00100,
  LAST_POW_TIMESTAMP = 0x00200,
  TOTAL_COINS = 0x00400,
  LAST_BLOCK_SIZE = 0x00800,
  TX_COUNT_IN_LAST_BLOCK = 0x01000,
  POS_SEQUENCE_FACTOR = 0x02000,
  POW_SEQUENCE_FACTOR = 0x04000,
  OUTS_STAT = 0x08000,
  PERFORMANCE = 0x10000,
  POS_BLOCK_TS_SHIFT_VS_ACTUAL = 0x20000,
  MARKET = 0x40000,
  EXPIRATIONS_MEDIAN = 0x80000,
  ALL_FLAGS = 0xfffff,
}

// on_getblockcount
export type DAEMON_RPC_GETBLOCKCOUNT_REQUEST = {};
export type DAEMON_RPC_GETBLOCKCOUNT_RESPONSE = {
  /** The total number of blocks in the blockchain, equivalent to the top block's height plus one. */
  count: number;
  /** Status of the call. */
  status: API_RETURN_CODE.OK;
};

// on_getblockhash
export type DAEMON_RPC_GETBLOCKHASH_REQUEST = number[];
export type DAEMON_RPC_GETBLOCKHASH_RESPONSE = string;

// on_getblocktemplate
export type DAEMON_RPC_GETBLOCKTEMPLATE_REQUEST = {
  /** A transaction blob that must be explicitly included in the block. */
  explicit_transaction: string;
  /** Arbitrary data added to the extra field of the miner transaction. */
  extra_text: string;
  /** Address where mining rewards will be deposited. */
  wallet_address: string;
  /** Address where the stake is returned for PoS blocks (usually the same as 'wallet_address'). */
  stakeholder_address: string;
  /** PoS entry details, relevant only for PoS block generation. */
  pe: pos_entry;
  /** Flag indicating whether the block is a PoS block. */
  pos_block: boolean;
};
export type DAEMON_RPC_GETBLOCKTEMPLATE_RESPONSE = {
  /** The mining difficulty targeted by the block template. */
  difficulty: string;
  /** The height of the block template in the blockchain. */
  height: number;
  /** Seed value for the ProgPoWZ mining algorithm's epoch. */
  seed: string;
  /** Serialized block template blob. */
  blocktemplate_blob: blobdata;
  /** Hash of the previous block in the chain. */
  prev_hash: string;
  /** Miner transaction generation context. Intended for PoS blocks and Zarcanum. */
  miner_tx_tgc: tx_generation_context;
  /** Base block reward excluding any transaction fees. */
  block_reward_without_fee: number;
  /** Total block reward, including transaction fees if they are given to the miner (legacy), or the base reward if fees are burnt (current state). */
  block_reward: number;
  /** Total fees from transactions included in the block. */
  txs_fee: number;
  /** Status of the call. */
  status: API_RETURN_CODE.OK;
};

// on_submitblock
export type DAEMON_RPC_SUBMITBLOCK_REQUEST = string[];
export type DAEMON_RPC_SUBMITBLOCK_RESPONSE = {
  /** Status of the call. */
  status: API_RETURN_CODE.OK;
};

// on_submitblock2
export type DAEMON_RPC_SUBMITBLOCK2_REQUEST = {
  /** Hex-encoded serialized block. */
  b: string;
  /** List of hex-encoded transactions to be explicitly included in the block. */
  explicit_txs: epee_hexemizer[];
};
export type DAEMON_RPC_SUBMITBLOCK2_RESPONSE = {
  /** Status of the call. */
  status: API_RETURN_CODE.OK;
};

// on_get_last_block_header
export type DAEMON_RPC_GET_LAST_BLOCK_HEADER_REQUEST = string[];
export type DAEMON_RPC_GET_LAST_BLOCK_HEADER_RESPONSE = {
  /** Detailed header information of the block. */
  block_header: block_header_response;
  /** Status of the call. */
  status: API_RETURN_CODE.OK;
};

// on_get_block_header_by_hash
export type DAEMON_RPC_GET_BLOCK_HEADER_BY_HASH_REQUEST = {
  /** The hash of the block for which the header information is being requested. */
  hash: string;
};
export type DAEMON_RPC_GET_BLOCK_HEADER_BY_HASH_RESPONSE = {
  /** Detailed header information of the block. */
  block_header: block_header_response;
  /** Status of the call. */
  status: API_RETURN_CODE.OK;
};

// on_get_block_header_by_height
export type DAEMON_RPC_GET_BLOCK_HEADER_BY_HEIGHT_REQUEST = {
  /** The height of the block for which the header information is being requested. */
  height: number;
};
export type DAEMON_RPC_GET_BLOCK_HEADER_BY_HEIGHT_RESPONSE = {
  /** Detailed header information of the block. */
  block_header: block_header_response;
  /** Status of the call. */
  status: API_RETURN_CODE.OK;
};

// on_get_alias_details
export type DAEMON_RPC_GET_ALIAS_DETAILS_REQUEST = {
  /** The alias name for which details are being requested. */
  alias: string;
};
export type DAEMON_RPC_GET_ALIAS_DETAILS_RESPONSE =
  | {
      /** Contains the detailed information about the specified alias, including the associated wallet address, tracking key, comment etc.. */
      alias_details: alias_rpc_details_base;
      /** Status of the call. */
      status: API_RETURN_CODE.OK;
    }
  | {
      /** Contains the detailed information about the specified alias, including the associated wallet address, tracking key, comment etc.. */
      alias_details?: undefined;
      /** Status of the call. */
      status: 'Alias have wrong name' | API_RETURN_CODE.NOT_FOUND;
    };

// on_aliases_by_address
export type DAEMON_RPC_GET_ALIASES_BY_ADDRESS_REQUEST = string;
export type DAEMON_RPC_GET_ALIASES_BY_ADDRESS_RESPONSE =
  | {
      /** List of alias_rpc_details objects, each containing detailed information about each alias registered to the specified address. */
      alias_info_list: alias_rpc_details[];
      /** Status of the call. */
      status: API_RETURN_CODE.OK;
    }
  | {
      /** List of alias_rpc_details objects, each containing detailed information about each alias registered to the specified address. */
      alias_info_list?: undefined;
      /** Status of the call. */
      status: API_RETURN_CODE.FAIL | API_RETURN_CODE.NOT_FOUND | API_RETURN_CODE.FAIL;
    };

// on_get_alias_reward
export type DAEMON_RPC_GET_ALIAS_REWARD_REQUEST = {
  /** The alias name for which the registration cost is being queried. */
  alias: string;
};
export type DAEMON_RPC_GET_ALIAS_REWARD_RESPONSE = {
  /** The registration cost for the specified alias. */
  reward: number;
  /** Status of the call. */
  status: API_RETURN_CODE.OK;
};

// on_get_est_height_from_date
export type DAEMON_RPC_GET_EST_HEIGHT_FROM_DATE_REQUEST = {
  /** Linux timestamp for the required date. */
  timestamp: number;
};
export type DAEMON_RPC_GET_EST_HEIGHT_FROM_DATE_RESPONSE = {
  /** Estimated height of a block. */
  h: number;
  /** Status of the call. */
  status: API_RETURN_CODE.OK | API_RETURN_CODE.NOT_FOUND;
};

// on_find_outs_in_recent_blocks
export type DAEMON_RPC_FIND_OUTS_IN_RECENT_BLOCKS_REQUEST = {
  /** Target address for which outputs are being searched */
  address: string;
  /** Secret view key corresponding to the given address. */
  viewkey: string;
  /** Block count limit. If 0, only the transaction pool will be searched. Maximum and default is 5. */
  blocks_limit?: number;
};
export type DAEMON_RPC_FIND_OUTS_IN_RECENT_BLOCKS_RESPONSE = {
  /** The amount of the output. */
  amount: number;
  /** Asset ID of the output. */
  asset_id: string;
  /** Transaction ID where the output is present, if found. */
  tx_id: string;
  /** Block height where the transaction is present. */
  tx_block_height: number;
  /** Index of the output in the transaction. */
  output_tx_index: number;
};

// on_rpc_get_blocks_details
export type DAEMON_RPC_GET_BLOCKS_DETAILS_REQUEST = {
  /** The starting block height from which block details are retrieved. */
  height_start: number;
  /** The number of blocks to retrieve from the starting height. */
  count: number;
  ignore_transactions: boolean;
};
export type DAEMON_RPC_GET_BLOCKS_DETAILS_RESPONSE = {
  /** Status of the call. */
  status: API_RETURN_CODE.OK;
  /** List of blocks with detailed information, starting from the specified height. */
  blocks: block_rpc_extended_info[];
};

// on_get_tx_details
export type DAEMON_RPC_GET_TX_DETAILS_REQUEST = {
  /** The hash of the transaction for which detailed information is being requested. */
  tx_hash: string;
};
export type DAEMON_RPC_GET_TX_DETAILS_RESPONSE = {
  /** Status of the call. */
  status: API_RETURN_CODE.OK;
  /** Detailed information about the transaction. */
  tx_info: tx_rpc_extended_info;
};

// on_search_by_id
export type DAEMON_RPC_SERARCH_BY_ID_REQUEST = {
  /** The identifier used to search across various types of entities. */
  id: string;
};
export type DAEMON_RPC_SERARCH_BY_ID_RESPONSE = {
  /** Status of the call. */
  status: API_RETURN_CODE.OK;
  /** List of entity types where the identifier was found. */
  types_found: string[];
};

// on_get_info
export type DAEMON_RPC_GET_INFO_REQUEST = {
  /** Combination of flags to request specific data elements that are computationally expensive to calculate. */
  number: DAEMON_RPC_GET_INFO_FLAG;
};
export type DAEMON_RPC_GET_INFO_RESPONSE = {
  /** Status of the call. */
  status: API_RETURN_CODE.OK;
  /** The current size of the blockchain, equal to the height of the top block plus one. */
  height: number;
  /** Boolean value indicating whether PoS mining is currently allowed based on network rules and state. */
  pos_allowed: boolean;
  /** Current difficulty for Proof of Stake mining. */
  pos_difficulty: string;
  /** Current difficulty for Proof of Work mining. */
  pow_difficulty: number;
  /** Total number of transactions in the blockchain. */
  tx_count: number;
  /** Number of transactions currently in the pool. */
  tx_pool_size: number;
  /** Number of alternative blocks on the blockchain. */
  alt_blocks_count: number;
  /** Number of outgoing P2P connections to other nodes. */
  outgoing_connections_count: number;
  /** Number of incoming P2P connections established by other nodes. */
  incoming_connections_count: number;
  /** Number of P2P connections to nodes that have a fully synchronized blockchain. */
  synchronized_connections_count: number;
  /** Size of the white peer list, which includes addresses of reliable nodes. */
  white_peerlist_size: number;
  /** Size of the grey peer list, which includes addresses of nodes with less consistent availability. */
  grey_peerlist_size: number;
  /** The total number of unique aliases registered on the blockchain. Aliases are alternate, human-readable names associated with addresses. */
  alias_count: number;
  /** Current maximum allowed cumulative block size in bytes. */
  current_max_allowed_block_size: number;
  /** A list of boolean values indicating whether each corresponding hardfork is active. For example, a list 'true, true, false' indicates that the first hardfork is activated, while the second is not. Hardfork #0 is always active as it is a stub. */
  is_hardfok_active: boolean[];
  /** Current network state of the daemon, which could be connecting, synchronizing, online, loading core, internal error, unloading core, or downloading database. */
  daemon_network_state: daemon_network_state;
  /** Blockchain height at which the current synchronization process started. Indicates the starting point for catching up to the network's latest state. */
  synchronization_start_height: number;
  /** Maximum blockchain height observed in the network by this node. */
  max_net_seen_height: number;
  /** Default fee for transactions. */
  default_fee: number;
  /** Minimum fee for transactions. */
  minimum_fee: number;
  /** The most recent maintainer's info. */
  mi: maintainers_info_external;
  /** A value of 0 indicates no time synchronization issues, while a value of 1 indicates the presence of time sync issues. Only available if the DAEMON_RPC_GET_INFO_FLAG_NET_TIME_DELTA_MEDIAN flag is set. */
  net_time_delta_median?: number;
  /** The PoW hash rate calculated over the last 50 blocks of any type. This information is only provided if the DAEMON_RPC_GET_INFO_FLAG_CURRENT_NETWORK_HASHRATE_50 flag is set. */
  current_network_hashrate_50?: number;
  /** The PoW hash rate calculated over the last 350 blocks of any type. This information is only provided if the DAEMON_RPC_GET_INFO_FLAG_CURRENT_NETWORK_HASHRATE_350 flag is set. */
  current_network_hashrate_350?: number;
  /** The time period in seconds between the most recent block and the 10th block older. This information is only provided if the DAEMON_RPC_GET_INFO_FLAG_SECONDS_FOR_10_BLOCKS flag is set. */
  seconds_for_10_blocks?: number;
  /** The time period in seconds between the most recent block and the 30th block older. This information is only provided if the DAEMON_RPC_GET_INFO_FLAG_SECONDS_FOR_30_BLOCKS flag is set. */
  seconds_for_30_blocks?: number;
  /** The number of non-mining transactions recorded over the last 24 hours. This information is only provided if the DAEMON_RPC_GET_INFO_FLAG_TRANSACTIONS_DAILY_STAT flag is set. */
  transactions_cnt_per_day?: number;
  /** The total sum of input amounts from all non-mining transactions over the last 24 hours. Only old bare inputs with explicit amounts are considered. This information is only provided if the DAEMON_RPC_GET_INFO_FLAG_TRANSACTIONS_DAILY_STAT flag is set. */
  transactions_volume_per_day?: number;
  /** The timestamp of the most recent PoS block. This information is only provided if the DAEMON_RPC_GET_INFO_FLAG_LAST_POS_TIMESTAMP flag is set. */
  last_pos_timestamp?: number;
  /** The timestamp of the most recent PoW block. This information is only provided if the DAEMON_RPC_GET_INFO_FLAG_LAST_POW_TIMESTAMP flag is set. */
  last_pow_timestamp?: number;
  /** The total amount of all emitted coins in the system. This information is only provided if the DAEMON_RPC_GET_INFO_FLAG_TOTAL_COINS flag is set. */
  total_coins?: string;
  /** The size of the last block in bytes. This information is only provided if the DAEMON_RPC_GET_INFO_FLAG_LAST_BLOCK_SIZE flag is set. */
  last_block_size?: number;
  /** The number of non-mining transactions in the last block. This information is only provided if the DAEMON_RPC_GET_INFO_FLAG_TX_COUNT_IN_LAST_BLOCK flag is set. */
  tx_count_in_last_block?: number;
  /** The current PoS sequence factor, representing the number of consecutive PoS blocks. This information is only provided if the DAEMON_RPC_GET_INFO_FLAG_POS_SEQUENCE_FACTOR flag is set. */
  pos_sequence_factor?: number;
  /** The current PoW sequence factor, representing the number of consecutive PoW blocks. This information is only provided if the DAEMON_RPC_GET_INFO_FLAG_POW_SEQUENCE_FACTOR flag is set. */
  pow_sequence_factor?: number;
  /** The base block reward that is effective for the next block. Calculated only if either DAEMON_RPC_GET_INFO_FLAG_POS_DIFFICULTY or DAEMON_RPC_GET_INFO_FLAG_TOTAL_COINS flag is set. */
  block_reward?: number;
  /** Reward for the last block, including base reward and transaction fees. Calculated only if either DAEMON_RPC_GET_INFO_FLAG_POS_DIFFICULTY or DAEMON_RPC_GET_INFO_FLAG_TOTAL_COINS flag is set. */
  last_block_total_reward?: number;
  /** PoS difficulty divided by the total amount of all coins in the system minus a premined amount (17,517,203). Calculated only if either DAEMON_RPC_GET_INFO_FLAG_POS_DIFFICULTY or DAEMON_RPC_GET_INFO_FLAG_TOTAL_COINS flag is set. */
  pos_diff_total_coins_rate?: number;
  /** Timestamp of the last block. Calculated only if either DAEMON_RPC_GET_INFO_FLAG_POS_DIFFICULTY or DAEMON_RPC_GET_INFO_FLAG_TOTAL_COINS flag is set. */
  last_block_timestamp?: number;
  /** Hash of the last block. Calculated only if either DAEMON_RPC_GET_INFO_FLAG_POS_DIFFICULTY or DAEMON_RPC_GET_INFO_FLAG_TOTAL_COINS flag is set. */
  last_block_hash?: string;
  /** The difference between the timestamp used in the last PoS block for mining purposes and its actual timestamp as stored in the miner's transaction extra data. This information is only provided if the DAEMON_RPC_GET_INFO_FLAG_POS_BLOCK_TS_SHIFT_VS_ACTUAL flag is set. */
  pos_block_ts_shift_vs_actual?: number;
  /** Statistics for the number of outputs that have a specific amount. This information is only provided if the DAEMON_RPC_GET_INFO_FLAG_OUTS_STAT flag is set. */
  outs_stat?: outs_index_stat;
  /** Detailed technical performance data intended for developers. This information is only provided if the DAEMON_RPC_GET_INFO_FLAG_PERFORMANCE flag is set. */
  performance_data?: bc_performance_data;
  /** Detailed technical performance data intended for developers. This information is only provided if the DAEMON_RPC_GET_INFO_FLAG_PERFORMANCE flag is set. */
  tx_pool_performance_data?: pool_performance_data;
  /** Current number of offers in the offers service. This information is only provided if the DAEMON_RPC_GET_INFO_FLAG_PERFORMANCE flag is set. */
  offers_count?: number;
  /** Median of timestamps of the last N blocks, used to determine the expiration status of transactions. This information is only provided if the DAEMON_RPC_GET_INFO_FLAG_EXPIRATIONS_MEDIAN flag is set. */
  expiration_median_timestamp?: number;
};

// on_get_out_info
export type DAEMON_RPC_GET_TX_GLOBAL_OUTPUTS_INDEXES_BY_AMOUNT_REQUEST = {
  /** The specific amount of output to query. */
  amount: number;
  /** The global index of the output amount to be queried. */
  i: number;
};
export type DAEMON_RPC_GET_TX_GLOBAL_OUTPUTS_INDEXES_BY_AMOUNT_RESPONSE = {
  /** Status of the call. */
  status: API_RETURN_CODE.NOT_FOUND | API_RETURN_CODE.OK;
  /** Transaction ID where the queried output is present, if found. */
  tx_id: string;
  /** Local output index within the transaction. */
  out_no: number;
};

// on_get_multisig_info
export type DAEMON_RPC_GET_MULTISIG_INFO_REQUEST = {
  /** The multisig output's unique identifier (hash). */
  ms_id: string;
};
export type DAEMON_RPC_GET_MULTISIG_INFO_RESPONSE = {
  /** Status of the call. */
  status: API_RETURN_CODE.NOT_FOUND | API_RETURN_CODE.OK;
  /** Transaction ID where the multisig output is present, if found. */
  tx_id: string;
  /** Local output index within the transaction. */
  out_no: number;
};

// on_get_all_aliases
export type DAEMON_RPC_GET_ALL_ALIASES_REQUEST = {};
export type DAEMON_RPC_GET_ALL_ALIASES_RESPONSE = {
  /** List of alias_rpc_details objects, each containing information about an individual alias. */
  aliases: alias_rpc_details[];
  /** Status of the call. */
  status: API_RETURN_CODE.OK;
};

// on_get_aliases
export type DAEMON_RPC_GET_ALIASES_REQUEST = {
  /** The offset in the list of all aliases from which to start retrieving. */
  offset: number;
  /** The number of aliases to retrieve from the specified offset. */
  count: number;
};
export type DAEMON_RPC_GET_ALIASES_RESPONSE = {
  /** List of alias_rpc_details objects, each containing information about an individual alias retrieved based on the request parameters. */
  aliases: alias_rpc_details[];
  /** Status of the call. */
  status: API_RETURN_CODE.OK;
};

// on_get_pool_txs_details
export type DAEMON_RPC_GET_POOL_TXS_DETAILS_REQUEST = {
  /** List of transaction IDs. */
  ids: string[];
};
export type DAEMON_RPC_GET_POOL_TXS_DETAILS_RESPONSE = {
  /** Status of the call. */
  status: API_RETURN_CODE.OK;
  /** List of transactions with detailed information. */
  txs: tx_rpc_extended_info[];
};

// on_get_pool_txs_brief_details
export type DAEMON_RPC_GET_POOL_TXS_BRIEF_DETAILS_REQUEST = {
  /** List of transaction IDs. */
  ids: string[];
};
export type DAEMON_RPC_GET_POOL_TXS_BRIEF_DETAILS_RESPONSE = {
  /** Status of the call. */
  status: API_RETURN_CODE.OK;
  /** List of transactions with detailed information. */
  txs: tx_rpc_brief_info[];
};

// on_get_all_pool_tx_list
export type DAEMON_RPC_GET_ALL_POOL_TX_LIST_REQUEST = {};
export type DAEMON_RPC_GET_ALL_POOL_TX_LIST_RESPONSE = {
  /** Status of the call. */
  status: API_RETURN_CODE.OK;
  /** List of all transaction IDs currently in the transaction pool. */
  ids: string[];
};

// on_get_pool_info
export type DAEMON_RPC_GET_POOL_INFO_REQUEST = {};
export type DAEMON_RPC_GET_POOL_INFO_RESPONSE = {
  /** Status of the call. */
  status: API_RETURN_CODE.OK;
  /** Error code, if there's any error (optional). */
  error_code: string;
  /** List of aliases from txs that are currently in the tx pool. */
  aliases_que: alias_rpc_details[];
};

// on_get_random_outs
export type DAEMON_RPC_GET_RANDOM_OUTPUTS_FOR_AMOUNTS_LEGACY_REQUEST = {
  /** List of amounts for which decoy outputs are requested. */
  amounts: number[];
  /** Number of decoy outputs requested for each amount. */
  outs_count: number;
  /** If true, only outputs with a 'mix_attr' greater than 0 are used as decoys. */
  use_forced_mix_outs: boolean;
};
export type DAEMON_RPC_GET_RANDOM_OUTPUTS_FOR_AMOUNTS_LEGACY_out_entry = {
  global_amount_index: number;
  out_key: string;
};
export type DAEMON_RPC_GET_RANDOM_OUTPUTS_FOR_AMOUNTS_LEGACY_outs_for_amount = {
  amount: number;
  outs: DAEMON_RPC_GET_RANDOM_OUTPUTS_FOR_AMOUNTS_LEGACY_out_entry[];
};
export type DAEMON_RPC_GET_RANDOM_OUTPUTS_FOR_AMOUNTS_LEGACY_RESPONSE = {
  /** Status of the call. */
  status: API_RETURN_CODE.FAIL | API_RETURN_CODE.OK;
  /** List of 'outs_for_amount' structures, each containing decoys for a specific amount. */
  outs: DAEMON_RPC_GET_RANDOM_OUTPUTS_FOR_AMOUNTS_LEGACY_outs_for_amount[];
};

// on_get_random_outs1
export type DAEMON_RPC_GET_RANDOM_OUTPUTS_FOR_AMOUNTS_REQUEST = {
  /** List of amounts for which decoy outputs are requested. */
  amounts: number[];
  /** Number of decoy outputs required for each amount specified. */
  decoys_count: number;
  /** Maximum blockchain height from which decoys can be taken. If nonzero, decoys must be at this height or older. */
  height_upper_limit: number;
  /** If true, only outputs with a 'mix_attr' greater than 0 are used as decoys. */
  use_forced_mix_outs: boolean;
};
export interface DAEMON_RPC_GET_RANDOM_OUTPUTS_FOR_AMOUNTS_out_entry {
  global_amount_index: number;
  stealth_address: string;
  concealing_point: string;
  amount_commitment: string;
  blinded_asset_id: string;
  flags: RANDOM_OUTPUTS_FOR_AMOUNTS_FLAGS;
}
export interface DAEMON_RPC_GET_RANDOM_OUTPUTS_FOR_AMOUNTS_outs_for_amount {
  /** The amount for which decoys are returned. */
  amount: number;
  /** List of 'OutEntry' structures, each containing decoys for a specific amount. */
  outs: DAEMON_RPC_GET_RANDOM_OUTPUTS_FOR_AMOUNTS_out_entry[];
}
export type DAEMON_RPC_GET_RANDOM_OUTPUTS_FOR_AMOUNTS_RESPONSE = {
  /** Status of the call. */
  status: API_RETURN_CODE.FAIL | API_RETURN_CODE.OK;
  /** List of 'outs_for_amount' structures, each containing decoys for a specific amount. */
  outs: DAEMON_RPC_GET_RANDOM_OUTPUTS_FOR_AMOUNTS_outs_for_amount[];
};

// on_get_random_outs3
export type DAEMON_RPC_GET_RANDOM_OUTPUTS_FOR_AMOUNTS3_offsets_distribution = {
  /** If set to 0, only ZC outputs are considered. If nonzero, only old bare outputs are considered. */
  amount: number;
  /** List of global indices for picking decoys. Each index corresponds to a potential decoy output. */
  global_offsets: number[];
};
export type DAEMON_RPC_GET_RANDOM_OUTPUTS_FOR_AMOUNTS3_REQUEST = {
  /** List of amount distributions specifying where to look for decoys, based on old bare outputs or ZC outputs. */
  amounts: DAEMON_RPC_GET_RANDOM_OUTPUTS_FOR_AMOUNTS3_offsets_distribution[];
  /** Maximum blockchain height from which decoys can be taken. If nonzero, decoys must be at this height or older. */
  height_upper_limit: number;
  /** If true, only outputs with a 'mix_attr' greater than 0 are used as decoys. */
  use_forced_mix_outs: boolean;
  /** Specifies the estimated percentage of coinbase outputs to be included in the decoy sets, ranging from 0 to 100. */
  coinbase_percents: number;
};
export type DAEMON_RPC_GET_RANDOM_OUTPUTS_FOR_AMOUNTS3_RESPONSE = DAEMON_RPC_GET_RANDOM_OUTPUTS_FOR_AMOUNTS_RESPONSE;

// on_get_votes
export type DAEMON_RPC_GET_VOTES_REQUEST = {
  /** Start of the block range to search in (including). */
  h_start: number;
  /** End of the block range to search in (including). */
  h_end: number;
};
export type DAEMON_RPC_GET_VOTES_RESPONSE = {
  /** Status of the call. */
  status: API_RETURN_CODE.INTERNAL_ERROR | API_RETURN_CODE.OK;
  /** Error code, if any. */
  error_code: string;
  /** Found votes in the given range. */
  votes: vote_results;
};

// on_get_asset_info
export type DAEMON_RPC_GET_ASSET_INFO_REQUEST = {
  /** ID of an asset. */
  asset_id: string;
};
export type DAEMON_RPC_GET_ASSET_INFO_RESPONSE = {
  /** Status of the call. */
  status: API_RETURN_CODE.NOT_FOUND | API_RETURN_CODE.OK;
  /** Asset descriptor base. */
  asset_descriptor: asset_descriptor_base;
};

// on_get_assets_list
export type DAEMON_RPC_GET_ASSETS_LIST_REQUEST = {
  /** Offset for the item to start copying */
  offset: number;
  /** Number of items to receive */
  count: number;
};
export type DAEMON_RPC_GET_ASSETS_LIST_RESPONSE = {
  /** Status of the call. */
  status: API_RETURN_CODE.NOT_FOUND | API_RETURN_CODE.OK;
  /** List of assets registered in Zano blockchain. */
  assets: asset_descriptor_with_id[];
};

// on_decrypt_tx_details
export type DAEMON_RPC_DECRYPT_TX_DETAILS_REQUEST = {
  /** ID for a transaction if it is already in the blockchain. Can be omitted if tx_blob is provided. */
  tx_id: string;
  /** Transaction blob. */
  tx_blob: blobdata;
  /** Secret key for the transaction. */
  tx_secret_key: string;
  /** List of output addresses. */
  outputs_addresses: string[];
};
export type DAEMON_RPC_DECRYPT_TX_DETAILS_decoded_output = {
  /** Amount being transferred. */
  amount: number;
  /** Destination address. */
  address: string;
  /** Asset id. */
  asset_id: string;
  /** Index of the corresponding output in the transaction. */
  out_index: number;
};
export type DAEMON_RPC_DECRYPT_TX_DETAILS_RESPONSE = {
  /** Status code of operation, OK if success. */
  status: API_RETURN_CODE.OK;
  /** List of decoded outputs. */
  decoded_outputs: DAEMON_RPC_DECRYPT_TX_DETAILS_decoded_output[];
  /** Transaction in JSON format. */
  tx_in_json: string;
  /** Verified transaction ID. */
  verified_tx_id: string;
};

// on_get_main_block_details
// on_get_alt_block_details
export type DAEMON_RPC_GET_BLOCK_DETAILS_REQUEST = {
  /** The hash ID of the block for which detailed information is being requested. */
  id: string;
};
export type DAEMON_RPC_GET_BLOCK_DETAILS_RESPONSE = {
  /** Status of the call. */
  status: API_RETURN_CODE.OK;
  /** Detailed information about the block retrieved based on the provided hash ID. */
  block_details: block_rpc_extended_info;
};

// on_get_alt_blocks_details
export type DAEMON_RPC_GET_ALT_BLOCKS_DETAILS_REQUEST = {
  /** The offset in the list of alternative blocks from which to start retrieval. */
  offset: number;
  /** The number of alternative blocks to retrieve from the specified offset. */
  count: number;
};
export type DAEMON_RPC_GET_ALT_BLOCKS_DETAILS_RESPONSE = {
  /** Status of the call. */
  status: API_RETURN_CODE.OK;
  /** List of alternative blocks with detailed information, retrieved based on the specified parameters. */
  blocks: block_rpc_extended_info[];
};

// on_reset_transaction_pool
export type DAEMON_RPC_RESET_TX_POOL_REQUEST = {};
export type DAEMON_RPC_RESET_TX_POOL_RESPONSE = {
  /** Status of the call. */
  status: API_RETURN_CODE.OK;
};

// on_remove_tx_from_pool
export type DAEMON_RPC_REMOVE_TX_FROM_POOL_REQUEST = {
  /** List of transaction IDs that are to be removed from the transaction pool. */
  tx_to_remove: string[];
};
export type DAEMON_RPC_REMOVE_TX_FROM_POOL_RESPONSE = {
  /** Status of the call. */
  status: API_RETURN_CODE.OK;
};

// on_get_current_core_tx_expiration_median
export type DAEMON_RPC_GET_CURRENT_CORE_TX_EXPIRATION_MEDIAN_REQUEST = {};
export type DAEMON_RPC_GET_CURRENT_CORE_TX_EXPIRATION_MEDIAN_RESPONSE = {
  /** Status of the call. */
  status: API_RETURN_CODE.OK;
  /** The median timestamp from the last N blocks, used to determine if transactions are expired based on their timestamp. */
  expiration_median: number;
};

// on_get_offers_ex
export type DAEMON_RPC_GET_OFFERS_EX_REQUEST = {
  /** Filter options. */
  filter: core_offers_filter;
};
export type DAEMON_RPC_GET_OFFERS_EX_RESPONSE = {
  /** Status of the operation. */
  status: API_RETURN_CODE.OK;
  /** List of offers related to the operation. */
  offers: offer_details_ex[];
  /** Total number of offers. */
  total_offers: number;
};

// on_validate_signature
export type COMMAND_VALIDATE_SIGNATURE_REQUEST = {
  /** Base64 encoded data for which the signature is to be validated. */
  buff: string;
  /** Schnorr signature to validate, encoded as a hexadecimal string. */
  sig: string;
  /** Public key used for signature verification, encoded as a hexadecimal string. If null or not set, the public key is retrieved using the provided alias. */
  pkey?: string;
  /** Alias to retrieve the associated public spend key if no explicit public key is provided for verification. */
  alias?: string;
};
export type COMMAND_VALIDATE_SIGNATURE_RESPONSE = {
  /** Status of the call. */
  status: API_RETURN_CODE.DISCONNECTED | API_RETURN_CODE.NOT_FOUND | API_RETURN_CODE.FAIL | API_RETURN_CODE.OK;
};

type Method<Params extends JSONConstrain<Params>, Result extends JSONConstrain<Result>, Errors extends JSONConstrain<Errors> = never> = {
  params: Params;
  result: Result;
  errors: Errors;
};
export interface CoreRpcMethods {
  // JSON RPCs
  /** Returns the total number of blocks in the blockchain (the height of the top block plus one). */
  getblockcount: Method<DAEMON_RPC_GETBLOCKCOUNT_REQUEST, DAEMON_RPC_GETBLOCKCOUNT_RESPONSE>;
  /** Returns block hash by the given height. */
  on_getblockhash: Method<DAEMON_RPC_GETBLOCKHASH_REQUEST, DAEMON_RPC_GETBLOCKHASH_RESPONSE>;
  /** Generates a block template for mining, intended for both PoW and PoS types of blocks based on the provided parameters. */
  getblocktemplate: Method<DAEMON_RPC_GETBLOCKTEMPLATE_REQUEST, DAEMON_RPC_GETBLOCKTEMPLATE_RESPONSE>;
  /** Adds new block to the blockchain. Request should contain one string with hex-encoded block blob. */
  submitblock: Method<DAEMON_RPC_SUBMITBLOCK_REQUEST, DAEMON_RPC_SUBMITBLOCK_RESPONSE>;
  /** Adds new block to the blockchain. */
  submitblock2: Method<DAEMON_RPC_SUBMITBLOCK2_REQUEST, DAEMON_RPC_SUBMITBLOCK2_RESPONSE>;
  /** Returns the block header information of the most recent block. */
  getlastblockheader: Method<DAEMON_RPC_GET_LAST_BLOCK_HEADER_REQUEST, DAEMON_RPC_GET_LAST_BLOCK_HEADER_RESPONSE>;
  /** Retrieves the block header information for a given block hash. */
  getblockheaderbyhash: Method<DAEMON_RPC_GET_BLOCK_HEADER_BY_HASH_REQUEST, DAEMON_RPC_GET_BLOCK_HEADER_BY_HASH_RESPONSE>;
  /** Retrieves the block header information for a given block height. */
  getblockheaderbyheight: Method<DAEMON_RPC_GET_BLOCK_HEADER_BY_HEIGHT_REQUEST, DAEMON_RPC_GET_BLOCK_HEADER_BY_HEIGHT_RESPONSE>;
  /** Retrieves information about a specific address alias. */
  get_alias_details: Method<DAEMON_RPC_GET_ALIAS_DETAILS_REQUEST, DAEMON_RPC_GET_ALIAS_DETAILS_RESPONSE>;
  /** Retrieves all aliases registered for a given address. */
  get_alias_by_address: Method<DAEMON_RPC_GET_ALIASES_BY_ADDRESS_REQUEST, DAEMON_RPC_GET_ALIASES_BY_ADDRESS_RESPONSE>;
  /** Retrieves the cost of registering an alias on the blockchain. */
  get_alias_reward: Method<DAEMON_RPC_GET_ALIAS_REWARD_REQUEST, DAEMON_RPC_GET_ALIAS_REWARD_RESPONSE>;
  /** Give an estimation of block height by the given date. */
  get_est_height_from_date: Method<DAEMON_RPC_GET_EST_HEIGHT_FROM_DATE_REQUEST, DAEMON_RPC_GET_EST_HEIGHT_FROM_DATE_RESPONSE>;
  /** Retrieves information about outputs in recent blocks that are targeted for the given address with the corresponding secret view key. */
  find_outs_in_recent_blocks: Method<DAEMON_RPC_FIND_OUTS_IN_RECENT_BLOCKS_REQUEST, DAEMON_RPC_FIND_OUTS_IN_RECENT_BLOCKS_RESPONSE>;

  //block explorer api
  /** Retrieves detailed information about a sequence of blocks starting from a specific height. */
  get_blocks_details: Method<DAEMON_RPC_GET_BLOCKS_DETAILS_REQUEST, DAEMON_RPC_GET_BLOCKS_DETAILS_RESPONSE>;
  /** Retrieves detailed information about a specific transaction. */
  get_tx_details: Method<DAEMON_RPC_GET_TX_DETAILS_REQUEST, DAEMON_RPC_GET_TX_DETAILS_RESPONSE>;
  /** Searches for a given ID across various entity types such as blocks, transactions, key images, multisig outputs, and alternative blocks, useful when the entity type is unknown or unspecified. */
  search_by_id: Method<DAEMON_RPC_SERARCH_BY_ID_REQUEST, DAEMON_RPC_SERARCH_BY_ID_RESPONSE>;
  /** Retrieves various information about the blockchain node. The user must specify their needs via a 'flags' field in the request by combining necessary flags using binary OR. Some values are always calculated and provided, others only if the corresponding flag is specified. */
  getinfo: Method<DAEMON_RPC_GET_INFO_REQUEST, DAEMON_RPC_GET_INFO_RESPONSE>;
  /** Returns transaction ID and local output index for a given output amount and its global index. */
  get_out_info: Method<DAEMON_RPC_GET_TX_GLOBAL_OUTPUTS_INDEXES_BY_AMOUNT_REQUEST, DAEMON_RPC_GET_TX_GLOBAL_OUTPUTS_INDEXES_BY_AMOUNT_RESPONSE>;
  /** Retrieve basic information about a multisig output using its unique identifier (hash). */
  get_multisig_info: Method<DAEMON_RPC_GET_MULTISIG_INFO_REQUEST, DAEMON_RPC_GET_MULTISIG_INFO_RESPONSE>;
  /** Retrieves all registered aliases along with associated information. */
  get_all_alias_details: Method<DAEMON_RPC_GET_ALL_ALIASES_REQUEST, DAEMON_RPC_GET_ALL_ALIASES_RESPONSE>;
  /** Retrieves a specified portion of all registered aliases, allowing pagination through large sets of aliases. */
  get_aliases: Method<DAEMON_RPC_GET_ALIASES_REQUEST, DAEMON_RPC_GET_ALIASES_RESPONSE>;
  /** Retrieves detailed information about specific transactions in the transaction pool, identified by their IDs. */
  get_pool_txs_details: Method<DAEMON_RPC_GET_POOL_TXS_DETAILS_REQUEST, DAEMON_RPC_GET_POOL_TXS_DETAILS_RESPONSE>;
  /** Retrieves brief details about specific transactions in the transaction pool, identified by their IDs. */
  get_pool_txs_brief_details: Method<DAEMON_RPC_GET_POOL_TXS_BRIEF_DETAILS_REQUEST, DAEMON_RPC_GET_POOL_TXS_BRIEF_DETAILS_RESPONSE>;
  /** Retrieves a list of all transaction IDs currently in the transaction pool. */
  get_all_pool_tx_list: Method<DAEMON_RPC_GET_ALL_POOL_TX_LIST_REQUEST, DAEMON_RPC_GET_ALL_POOL_TX_LIST_RESPONSE>;
  /** Obtain basic information about the transaction pool. */
  get_pool_info: Method<DAEMON_RPC_GET_POOL_INFO_REQUEST, DAEMON_RPC_GET_POOL_INFO_RESPONSE>;
  /** Retrieve random decoy outputs for specified amounts (legacy format). */
  getrandom_outs: Method<DAEMON_RPC_GET_RANDOM_OUTPUTS_FOR_AMOUNTS_LEGACY_REQUEST, DAEMON_RPC_GET_RANDOM_OUTPUTS_FOR_AMOUNTS_LEGACY_RESPONSE>;
  /** Retrieve random decoy outputs for specified amounts, to be used for mixing in transactions. */
  getrandom_outs1: Method<DAEMON_RPC_GET_RANDOM_OUTPUTS_FOR_AMOUNTS_REQUEST, DAEMON_RPC_GET_RANDOM_OUTPUTS_FOR_AMOUNTS_RESPONSE>;
  /** Version 3 of the command to retrieve random decoy outputs for specified amounts, focusing on either pre-zarcanum or post-zarcanum zones based on the amount value. */
  getrandom_outs3: Method<DAEMON_RPC_GET_RANDOM_OUTPUTS_FOR_AMOUNTS3_REQUEST, DAEMON_RPC_GET_RANDOM_OUTPUTS_FOR_AMOUNTS3_RESPONSE>;
  /** Get votes' results from the given block range. */
  get_votes: Method<DAEMON_RPC_GET_VOTES_REQUEST, DAEMON_RPC_GET_VOTES_RESPONSE>;

  //assets api
  /** Obtain information for the given asset by its ID. */
  get_asset_info: Method<DAEMON_RPC_GET_ASSET_INFO_REQUEST, DAEMON_RPC_GET_ASSET_INFO_RESPONSE>;
  /** Return list of assets registered in Zano blockchain */
  get_assets_list: Method<DAEMON_RPC_GET_ASSETS_LIST_REQUEST, DAEMON_RPC_GET_ASSETS_LIST_RESPONSE>;
  /** Decrypts transaction private information. Should be used only with your own local daemon for security reasons. */
  decrypt_tx_details: Method<DAEMON_RPC_DECRYPT_TX_DETAILS_REQUEST, DAEMON_RPC_DECRYPT_TX_DETAILS_RESPONSE>;

  /** Retrieves detailed information about a specific main block identified by its hash. */
  get_main_block_details: Method<DAEMON_RPC_GET_BLOCK_DETAILS_REQUEST, DAEMON_RPC_GET_BLOCK_DETAILS_RESPONSE>;
  /** Retrieves detailed information about a specific alternative block identified by its hash. */
  get_alt_block_details: Method<DAEMON_RPC_GET_BLOCK_DETAILS_REQUEST, DAEMON_RPC_GET_BLOCK_DETAILS_RESPONSE>;
  /** Retrieves details of alternative blocks in the blockchain, allowing for pagination through large datasets. */
  get_alt_blocks_details: Method<DAEMON_RPC_GET_ALT_BLOCKS_DETAILS_REQUEST, DAEMON_RPC_GET_ALT_BLOCKS_DETAILS_RESPONSE>;
  /** Clears transaction pool. */
  reset_transaction_pool: Method<DAEMON_RPC_RESET_TX_POOL_REQUEST, DAEMON_RPC_RESET_TX_POOL_RESPONSE>;
  /** Removes specified transactions from the transaction pool, typically to clear out transactions that are no longer valid or needed. */
  remove_tx_from_pool: Method<DAEMON_RPC_REMOVE_TX_FROM_POOL_REQUEST, DAEMON_RPC_REMOVE_TX_FROM_POOL_RESPONSE>;
  /** Retrieves the current core transaction expiration median. */
  get_current_core_tx_expiration_median: Method<
    DAEMON_RPC_GET_CURRENT_CORE_TX_EXPIRATION_MEDIAN_REQUEST,
    DAEMON_RPC_GET_CURRENT_CORE_TX_EXPIRATION_MEDIAN_RESPONSE
  >;
  /** Fetch from daemon offers listed in the marketplace with given filters */
  marketplace_global_get_offers_ex: Method<DAEMON_RPC_GET_OFFERS_EX_REQUEST, DAEMON_RPC_GET_OFFERS_EX_RESPONSE>;
  /** Validates a Schnorr signature for arbitrary data. The public key for verification is provided directly or retrieved using an associated alias. */
  validate_signature: Method<COMMAND_VALIDATE_SIGNATURE_REQUEST, COMMAND_VALIDATE_SIGNATURE_RESPONSE>;
}
type CoreRpcMethodNames = Exclude<keyof CoreRpc, keyof HybridObject | 'base64_encode' | 'base64_decode'>;
export type ICoreRpc = HybridObject<{ ios: 'c++'; android: 'c++' }> & {
  base64_encode<Value extends string>(value: NoInfer<Value>): TypedBase64<Value>;
  base64_decode<Text extends TypedBase64<string>>(text: Text): UnwrapTypedBase64<Text>;
} & {
  [Name in CoreRpcMethodNames]: (params: __UNPROTECTED__TypedJSON<CoreRpcMethods[Name]['params']>) => Promise<
    __UNPROTECTED__TypedJSON<
      | {
          response_code: unknown;
          base64_body: TypedBase64<
            __UNPROTECTED__TypedJSON<
              | (JSONRpc & {
                  id: string;
                  result: CoreRpcMethods[Name]['result'];
                  error: null;
                })
              | (JSONRpc & {
                  id: string;
                  result: null;
                  error: CoreRpcMethods[Name]['errors'];
                })
            >
          >;
        }
      | JSONRpcSuccessfulResponse<WalletReturnErrors>
      | { error_code: API_RETURN_CODE.BAD_ARG_INVALID_JSON | API_RETURN_CODE.FAIL }
    >
  >;
};
