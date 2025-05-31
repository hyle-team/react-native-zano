import type { ZanoLogLevel } from './zano-lib/enums';

export type asset_descriptor_base = {
  /** Maximum possible supply for a given asset, cannot be changed after deployment. */
  total_max_supply: number;
  /** Currently emitted supply for the given asset (ignored for REGISTER operation). */
  current_supply: number;
  /** Decimal point. */
  decimal_point: number;
  /** Ticker associated with the asset. */
  ticker: string;
  /** Full name of the asset. */
  full_name: string;
  /** Any other information associated with the asset in free form. */
  meta_info: string;
  /** Owner's key, used only for EMIT and UPDATE validation, can be changed by transferring asset ownership. */
  owner: string;
  /** This field is reserved for future use and will be documented later. */
  hidden_supply: boolean;
  /** Version of the asset descriptor base. */
  version: number;
  /** [Optional] Owner's key in the case when ETH signature is used. */
  owner_eth_pub_key?: string;
};

export interface asset_descriptor_with_id extends asset_descriptor_base {
  /** Asset ID */
  asset_id: string;
}

export interface asset_balance_entry_base {
  /** Total coins available (including locked) */
  total: number;
  /** Unlocked coins available (the ones that could be used right now) */
  unlocked: number;
  /** Unconfirmed amount for receive */
  awaiting_in: number;
  /** Unconfirmed amount for send */
  awaiting_out: number;

  /** Number of total unspent outputs (including locked) */
  outs_count: number;
  /** Output's minimum amount */
  outs_amount_min: number;
  /** Output's maximum amount */
  outs_amount_max: number;
}
export interface asset_balance_entry extends asset_balance_entry_base {
  /** Asset info details */
  asset_info: asset_descriptor_with_id;
}

export interface wallet_provision_info {
  /** Number of transfers in wallet */
  transfers_count: number;
  /** Number of UTXO entries in wallet */
  transfer_entries_count: number;
  /** Current balance of native coins */
  balance: number;
  /** Unlocked balance of native coins */
  unlocked_balance: number;
  /** Current sync height of the wallet */
  current_height: number;
}

export enum GUI_TX_TYPE {
  NORMAL = 0,
  PUSH_OFFER = 1,
  UPDATE_OFFER = 2,
  CANCEL_OFFER = 3,
  NEW_ALIAS = 4,
  UPDATE_ALIAS = 5,
  COIN_BASE = 6,
  ESCROW_PROPOSAL = 7,
  ESCROW_TRANSFER = 8,
  ESCROW_RELEASE_NORMAL = 9,
  ESCROW_RELEASE_BURN = 10,
  ESCROW_CANCEL_PROPOSAL = 11,
  ESCROW_RELEASE_CANCEL = 12,
  HTLC_DEPOSIT = 13,
  HTLC_REDEEM = 14,
}

export type employed_tx_entry = {
  /** Index of the entry */
  index: number;
  /** Amount of the entry */
  amount: number;
  /** Asset id */
  asset_id: string;
};

export type employed_tx_entries = {
  /** Mark entries from transaction that were connected to this wallet */
  receive: employed_tx_entry[];
  /** Mark entries from transaction that were connected to this wallet */
  spent?: employed_tx_entry[];
};

export type contract_private_details = {
  /** Title of the contract */
  t: string;
  /** Comment for the contract */
  c: string;
  /** Address of party A (usually buyer) */
  a_addr: string;
  /** Address of party B (usually seller) */
  b_addr: string;
  /** Amount to pay */
  to_pay: number;
  /** Amount of pledge from party A */
  a_pledge: number;
  /** Amount of pledge from party B */
  b_pledge: number;
};

export enum contract_state {
  proposal_sent = 1,
  contract_accepted = 2,
  contract_released_normal = 3,
  contract_released_burned = 4,
  contract_cancel_proposal_sent = 5,
  contract_released_cancelled = 6,
}
export interface escrow_contract_details_basics {
  state: contract_state;
  is_a: boolean;
  expiration_time: number;
  cancel_expiration_time: number;
  timestamp: number;
  height: number;
  payment_id: string;
  private_detailes: contract_private_details;
}

export interface escrow_contract_details extends escrow_contract_details_basics {
  contract_id: string;
}

export enum TX_SERVICE_ATTACHMENT {
  /* eslint-disable no-bitwise */
  ENCRYPT_BODY = 1 << 0,
  DEFLATE_BODY = 1 << 1,
  ENCRYPT_BODY_ISOLATE_AUDITABLE = 1 << 2,
  ENCRYPT_ADD_PROOF = 1 << 3,
  /* eslint-enable no-bitwise */
}
export type tx_service_attachment = {
  /** Service ID, identificator that differentiates one service from another */
  service_id: string;
  /** Instruction that makes sense for this particular service */
  instruction: string;
  /** Hex-encoded body of the attachment */
  body: string;
  /** Hex-encoded public key of the owner, optional */
  security: string[];
  /** Flags that help wallet to automatically process some properties of the attachment */
  flags: TX_SERVICE_ATTACHMENT;
};

export interface wallet_sub_transfer_info {
  /** Amount of asset */
  amount: number;
  /** Asset id */
  asset_id: string;
  is_income: boolean;
}

export enum ASSET_DESCRIPTOR_OPERATION_VERSION {
  HF4_VER = 1,
  HF5_VER = 2,
  LAST_VER = 2,
}

export enum ASSET_DESCRIPTOR_OPERATION_TYPE {
  UNDEFINED = 0,
  REGISTER = 1,
  EMIT = 2,
  UPDATE = 3,
  PUBLIC_BURN = 4,
}

export type asset_descriptor_operation = {
  /** Asset operation type struct version */
  version: ASSET_DESCRIPTOR_OPERATION_VERSION;
  /** Asset operation type identifier */
  operation_type: ASSET_DESCRIPTOR_OPERATION_TYPE;
  /** Asset operation amount commitment (register/emit/burn). */
  opt_amount_commitment?: string;
  /** ID of an asset (emit/burn/update). */
  opt_asset_id?: string;
  /** Asset operation descriptor (register/update). */
  opt_descriptor?: asset_descriptor_base;
  /** Asset operation amount (register/emit/burn when supply is non-hidden). */
  opt_amount?: number;
  /** Asset ID salt. May only be used for asset registration. */
  opt_asset_id_salt?: number;
};

export type wallet_transfer_info = {
  /** Timestamp of the block that included transaction in blockchain, 0 for unconfirmed */
  timestamp: number;
  /** Transaction ID (hash) */
  tx_hash: string;
  /** Height of the block that included transaction (0 if transaction is unconfirmed) */
  height: number;
  /** Unlock time of this transfer (if present) */
  unlock_time: number;
  /** Size of transaction in bytes */
  tx_blob_size: number;
  /** HEX-encoded payment id blob, if it was present */
  payment_id: string;
  /** Some human-readable comment */
  comment: string;
  /** Tells if this transaction is used as utility by one of Zano services (contracts, ionic swaps, etc) */
  is_service: boolean;
  /** Tells if this transaction using mixins or not (auditable wallets normally don't use mixins) */
  is_mixing: boolean;
  /** Tells if this transaction is coinbase transaction (i.e., generated by PoW mining or by PoS staking) */
  is_mining: boolean;
  /** Could be one of these: GUI_TX_TYPE_NORMAL=0, GUI_TX_TYPE_PUSH_OFFER=1, GUI_TX_TYPE_UPDATE_OFFER=2, GUI_TX_TYPE_CANCEL_OFFER=3, GUI_TX_TYPE_NEW_ALIAS=4, GUI_TX_TYPE_UPDATE_ALIAS=5, GUI_TX_TYPE_COIN_BASE=6, GUI_TX_TYPE_ESCROW_PROPOSAL=7, GUI_TX_TYPE_ESCROW_TRANSFER=8, GUI_TX_TYPE_ESCROW_RELEASE_NORMAL=9, GUI_TX_TYPE_ESCROW_RELEASE_BURN=10, GUI_TX_TYPE_ESCROW_CANCEL_PROPOSAL=11, GUI_TX_TYPE_ESCROW_RELEASE_CANCEL=12, GUI_TX_TYPE_HTLC_DEPOSIT=13, GUI_TX_TYPE_HTLC_REDEEM=14 */
  tx_type: number;
  /** Mark entries from transaction that were connected to this wallet */
  employed_entries: employed_tx_entries;
  /** Transaction fee */
  fee: number;
  /** If sender is included in tx */
  show_sender: boolean;
  /** Escrow contract if it's part of the transaction */
  contract: escrow_contract_details[];
  /** Additional entries that might be stored in transaction but not part of its consensus */
  service_entries: tx_service_attachment[];
  /** Index of this entry in the wallet's array of transaction's history */
  transfer_internal_index: number;
  /** Remote addresses of this transfer (destination if it's outgoing transfer or sender if it's incoming transaction) */
  remote_addresses?: string[];
  /** Aliases for remote addresses, if discovered */
  remote_aliases?: string[];
  /** Essential part of transfer entry: amounts that have been transferred in this transaction grouped by asset id */
  subtransfers: wallet_sub_transfer_info[];
  /** "Asset Descriptor Operation" if it was present in transaction */
  ado?: asset_descriptor_operation;
};

export interface wallet_transfer_info_old extends wallet_transfer_info {
  /** Native coins amount */
  amount: number;
  /** If transfer entry is income (taken from native subtransfer) */
  is_income: boolean;
}

export interface transfer_destination {
  amount: number;
  address: string;
  asset_id: string;
}

export interface payment_details {
  payment_id: string;
  tx_hash: string;
  amount: number;
  block_height: number;
  unlock_time: number;
}

export interface asset_funds {
  asset_id: string;
  amount: number;
}

export type ionic_swap_proposal_info = {
  /** Assets sent to the finalizer */
  to_finalizer: asset_funds[];
  /** Assets sent to the initiator */
  to_initiator: asset_funds[];
  /** Fee paid by party A (initiator) */
  fee_paid_by_a: number;
};

export enum BASIC_RESPONSE_STATUS {
  OK = 'OK',
  BUSY = 'BUSY',
  NOT_FOUND = 'NOT_FOUND',
  FAILED = 'FAILED',
}
export enum API_RETURN_CODE {
  OK = BASIC_RESPONSE_STATUS.OK,
  FAIL = BASIC_RESPONSE_STATUS.FAILED,
  NOT_FOUND = BASIC_RESPONSE_STATUS.NOT_FOUND,
  ACCESS_DENIED = 'ACCESS_DENIED',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  NOT_ENOUGH_MONEY = 'NOT_ENOUGH_MONEY',
  NOT_ENOUGH_OUTPUTS_FOR_MIXING = 'NOT_ENOUGH_OUTPUTS_FOR_MIXING',
  INTERNAL_ERROR_QUE_FULL = 'INTERNAL_ERROR_QUE_FULL',
  BAD_ARG = 'BAD_ARG',
  BAD_ARG_EMPTY_DESTINATIONS = 'BAD_ARG_EMPTY_DESTINATIONS',
  BAD_ARG_WRONG_FEE = 'BAD_ARG_WRONG_FEE',
  BAD_ARG_INVALID_ADDRESS = 'BAD_ARG_INVALID_ADDRESS',
  BAD_ARG_WRONG_AMOUNT = 'BAD_ARG_WRONG_AMOUNT',
  BAD_ARG_WRONG_PAYMENT_ID = 'BAD_ARG_WRONG_PAYMENT_ID',
  BAD_ARG_INVALID_JSON = 'BAD_ARG_INVALID_JSON',
  WRONG_PASSWORD = 'WRONG_PASSWORD',
  WALLET_WRONG_ID = 'WALLET_WRONG_ID',
  WALLET_WATCH_ONLY_NOT_SUPPORTED = 'WALLET_WATCH_ONLY_NOT_SUPPORTED',
  WALLET_AUDITABLE_NOT_SUPPORTED = 'WALLET_AUDITABLE_NOT_SUPPORTED',
  WALLET_FEE_TOO_LOW = 'API_RETURN_CODE_WALLET_FEE_TOO_LOW',
  FILE_NOT_FOUND = 'FILE_NOT_FOUND',
  ALREADY_EXISTS = 'ALREADY_EXISTS',
  CANCELED = 'CANCELED',
  FILE_RESTORED = 'FILE_RESTORED',
  TRUE = 'TRUE',
  FALSE = 'FALSE',
  CORE_BUSY = 'CORE_BUSY',
  OVERFLOW = 'OVERFLOW',
  BUSY = 'BUSY',
  INVALID_FILE = 'INVALID_FILE',
  WRONG_SEED = 'WRONG_SEED',
  GENESIS_MISMATCH = 'GENESIS_MISMATCH',
  DISCONNECTED = 'DISCONNECTED',
  UNINITIALIZED = 'UNINITIALIZED',
  TX_IS_TOO_BIG = 'TX_IS_TOO_BIG',
  TX_REJECTED = 'TX_REJECTED',
  HTLC_ORIGIN_HASH_MISSMATCHED = 'HTLC_ORIGIN_HASH_MISSMATCHED',
  WRAP = 'WRAP',
  MISSING_ZC_INPUTS = 'MISSING_ZC_INPUTS',
}
export enum WALLET_RPC_ERROR_CODE {
  UNKNOWN_ERROR = -1,
  WRONG_ADDRESS = -2,
  DAEMON_IS_BUSY = -3,
  GENERIC_TRANSFER_ERROR = -4,
  WRONG_PAYMENT_ID = -5,
  WRONG_ARGUMENT = -6,
  NOT_ENOUGH_MONEY = -7,
  WRONG_MIXINS_FOR_AUDITABLE_WALLET = -8,

  INVALID_REQUEST = -32600,
  INVALID_PARAMS = -32602,
  PARSE_ERROR = -32700,
}

export interface app_config_wallet {
  name: string;
  pass: string;
}

export interface app_config {
  version: number;
  log_level: ZanoLogLevel;
  agreement_accepted?: boolean;
  pin_code?: string;
  wallets?: app_config_wallet[];
}

export interface app_connectivity_status {
  is_online: boolean;
  last_daemon_is_disconnected: boolean;
  is_server_busy: boolean;
  is_remote_node_mode: boolean;
  last_proxy_communicate_timestamp: number;
}

export interface transfers_array {
  unconfirmed: wallet_transfer_info[];
  history?: wallet_transfer_info[];
  total_history_items: number;
  last_item_index: number;
}

export type wallet_info = {
  /** Balances held by this wallet */
  balances: asset_balance_entry[];
  /** Total amount mined */
  mined_total: number;
  /** Address */
  address: string;
  /** View secret key */
  view_sec_key: string;
  /** Path to wallet file */
  path: string;
  /** Flag indicating whether the wallet is auditable */
  is_auditable: boolean;
  /** Flag indicating whether the wallet is watch-only */
  is_watch_only: boolean;
  /** Flag indicating whether the wallet has bare unspent outputs (pre-zarcanum outputs) */
  has_bare_unspent_outputs: boolean;
};

export type wallet_entry_info = {
  /** Wallet information */
  wi: wallet_info;
  /** Wallet ID */
  wallet_id: number;
};

export interface extended_wallet_info {
  address: string;
  path: string;
  transfers_count: number;
  transfer_entries_count: number;
  is_whatch_only: boolean;
  has_bare_unspent_outputs: boolean;
  utxo_distribution: string[];
  current_height: number;
}

export interface open_wallet_request {
  pass: string;
  path: string;
  txs_to_return: number;
  exclude_mining_txs: boolean;
}

export interface restore_wallet_request {
  pass: string;
  path: string;
  seed_pass: string;
  seed_phrase: string;
}

export interface open_wallet_response {
  wallet_id: number;
  recent_history: transfers_array;
  wi: wallet_info;
  seed: string;
  recovered: boolean;
  wallet_local_bc_size: number;
  wallet_file_size: number;
  name: string;
  pass: string;
}

export interface seed_info_param {
  seed_phrase: string;
  seed_password?: string;
}

export interface seed_phrase_info {
  syntax_correct: boolean;
  require_password: boolean;
  hash_sum_matched: boolean;
  tracking: boolean;
  address: string;
}

export enum wallet_state {
  initial = 0,
  synchronizing = 1,
  ready = 2,
  error = 3,
}

export interface wallet_sync_status_info {
  is_daemon_connected: boolean;
  wallet_state: wallet_state;
  is_in_long_refresh: boolean;
  progress: number;
  current_daemon_height: number;
  current_wallet_height: number;
}

export interface asset_rich_descriptor extends asset_descriptor_with_id {
  logo?: string;
  price_url?: string;
}

export enum CORE_RPC_ERROR_CODE {
  WRONG_PARAM = -1,
  TOO_BIG_HEIGHT = -2,
  TOO_BIG_RESERVE_SIZE = -3,
  WRONG_WALLET_ADDRESS = -4,
  INTERNAL_ERROR = -5,
  WRONG_BLOCKBLOB = -6,
  BLOCK_NOT_ACCEPTED = -7,
  CORE_BUSY = -9,
  INVALID_ALIAS_NAME = -10,
  INVALID_ALIAS_ADDRESS = -11,
  ALIAS_COMMENT_TO_LONG = -12,
  BLOCK_ADDED_AS_ALTERNATIVE = -13,
  NOT_FOUND = -14,
}

export type blobdata = string;

export interface block_header_response {
  /** Major version of the block. */
  major_version: number;
  /** Minor version of the block. */
  minor_version: number;
  /** Timestamp of the block creation. */
  timestamp: number;
  /** Hash of the previous block in the chain. */
  prev_hash: string;
  /** Nonce used for generating the block to meet the network difficulty. */
  nonce: number;
  /** Indicates if the block is an orphan (true) or a normal block (false). */
  orphan_status: boolean;
  /** Height of the block in the blockchain. */
  height: number;
  /** Depth of the block in the blockchain. Depth 0 indicates the most recent block. */
  depth: number;
  /** Hash of the block. */
  hash: string;
  /** Network difficulty target that the block met. */
  difficulty: string;
  /** Total mining reward of the block including transaction fees (if applicable). */
  reward: number;
}

export type alias_rpc_details_base = {
  /** Address of the alias */
  address: string;
  /** View secret key of the corresponding address (optional) */
  tracking_key?: string;
  /** Arbitrary comment (optional) */
  comment?: string;
};

export type alias_rpc_details = alias_rpc_details_base & {
  /** Alias itself, a brief shortcut for an address */
  alias: string;
};

export interface block_rpc_extended_info {
  /** Serialized form of the block. */
  blob: string;
  /** Height of the block in the blockchain. */
  height: number;
  /** Timestamp when the block was created, in PoS blocks used for mining. */
  timestamp: number;
  /** Actual timestamp encoded in the block's extra data for PoS blocks. */
  actual_timestamp: number;
  /** Cumulative size of the block including all transactions. */
  block_cumulative_size: number;
  /** Total size of all transactions included in the block. */
  total_txs_size: number;
  block_tself_size: number;
  /** Base mining reward for the block. */
  base_reward: number;
  /** Total reward for the block, including base reward and transaction fees (legacy). */
  summary_reward: number;
  /** Total transaction fees included in the block. */
  total_fee: number;
  /** Penalty applied to the reward if the block is larger than median but not large enough to be rejected. */
  penalty: number;
  /** Unique identifier of the block. */
  id: string;
  /** Hash of the previous block in the chain. */
  prev_id: string;
  pow_seed: string;
  /** Adjusted cumulative difficulty of the blockchain up to this block. */
  cumulative_diff_adjusted: string;
  /** Precise cumulative difficulty of the blockchain up to this block. */
  cumulative_diff_precise: string;
  /** Mining difficulty of the block. */
  difficulty: string;
  /** Total amount of coins generated in the blockchain up to this block. */
  already_generated_coins: string;
  /** Median transaction fee of the transactions within this block. */
  this_block_fee_median: number;
  effective_fee_median: number;
  /** Detailed information about each transaction included in the block. */
  transactions_details: tx_rpc_extended_info[];
  /** Type of the block. */
  type: number;
  /** Indicates whether the block is an orphan. */
  is_orphan: boolean;
  /** Additional textual information provided by the miner of the block. */
  miner_text_info: string;
  /** Serialized representation of the block in JSON format. */
  object_in_json: string;
}

export interface tx_rpc_extended_info {
  /** Serialized form of the transaction, encoded in Base64. */
  blob: blobdata;
  /** Size of the serialized transaction in bytes. */
  blob_size: number;
  /** Timestamp when the transaction was created. */
  timestamp: number;
  /** Block height where the transaction is confirmed, or -1 if it is unconfirmed. */
  keeper_block: number;
  /** Transaction fee in the smallest currency unit. */
  fee: number;
  /** Total output amount of the transaction (legacy, for pre-Zarcanum txs). */
  amount: number;
  /** Hash of the transaction. */
  id: string;
  /** Public key associated with the transaction. */
  pub_key: string;
  /** Outputs of the transaction. */
  outs: tx_out_rpc_entry[];
  /** Inputs of the transaction. */
  ins: tx_in_rpc_entry[];
  /** Extra data associated with the transaction. */
  extra: tx_extra_rpc_entry[];
  /** Additional attachments to the transaction. */
  attachments: tx_extra_rpc_entry[];
  /** Serialized transaction represented in JSON, encoded in Base64. */
  object_in_json: string;
}

export interface tx_out_rpc_entry {
  /** The output's amount, 0 for ZC outputs. */
  amount: number;
  /** List of public keys associated with the output. */
  pub_keys: string[];
  /** Minimum number of signatures required to spend the output, for multisig outputs only. */
  minimum_sigs: number;
  /** Indicates whether the output has been spent. */
  is_spent: boolean;
  /** Global index of the output for this specific amount. */
  global_index: number;
}

export interface tx_in_rpc_entry {
  /** The amount of coins being transacted. */
  amount: number;
  /** Origin hash for HTLC (Hash Time Locked Contract). */
  htlc_origin: string;
  /** Contains either the key image for the input or the multisig output ID, depending on the input type. */
  kimage_or_ms_id: string;
  /** List of global indexes indicating the outputs referenced by this input, where only one is actually being spent. */
  global_indexes: Array<number>;
  /** Number of multisig signatures used, relevant only for multisig outputs. */
  multisig_count: number;
  /** Auxiliary options associated with the input, containing additional configuration or data. */
  etc_options: Array<string>;
}

export interface tx_extra_rpc_entry {
  /** Type of the extra entry in the transaction. */
  type: string;
  /** A concise representation of the extra entry. */
  short_view: string;
  /** A detailed representation of the extra entry. */
  details_view: string;
}

export enum daemon_network_state {
  connecting = 0,
  synchronizing = 1,
  online = 2,
  loading_core = 3,
  internal_error = 4,
  unloading_core = 5,
  downloading_database = 6,
}

export interface outs_index_stat {
  amount_0: number;
  amount_0_001: number;
  amount_0_01: number;
  amount_0_1: number;
  amount_1: number;
  amount_10: number;
  amount_100: number;
  amount_1000: number;
  amount_10000: number;
  amount_100000: number;
  amount_1000000: number;
}

export interface bc_performance_data {
  // block processing zone
  block_processing_time_0: number;
  block_processing_time_1: number;
  target_calculating_time_2: number;
  longhash_calculating_time_3: number;
  all_txs_insert_time_5: number;
  etc_stuff_6: number;
  insert_time_4: number;
  raise_block_core_event: number;
  target_calculating_enum_blocks: number;
  target_calculating_calc: number;

  // tx processing zone
  tx_check_inputs_time: number;
  tx_add_one_tx_time: number;
  tx_process_extra: number;
  tx_process_attachment: number;
  tx_process_inputs: number;
  tx_push_global_index: number;
  tx_check_exist: number;
  tx_append_time: number;
  tx_append_rl_wait: number;
  tx_append_is_expired: number;
  tx_print_log: number;
  tx_prapare_append: number;

  tx_mixin_count: number;

  tx_store_db: number;

  tx_check_inputs_prefix_hash: number;
  tx_check_inputs_attachment_check: number;
  tx_check_inputs_loop: number;
  tx_check_inputs_loop_kimage_check: number;
  tx_check_inputs_loop_ch_in_val_sig: number;
  tx_check_inputs_loop_scan_outputkeys_get_item_size: number;
  tx_check_inputs_loop_scan_outputkeys_relative_to_absolute: number;
  tx_check_inputs_loop_scan_outputkeys_loop: number;
  tx_check_inputs_loop_scan_outputkeys_loop_get_subitem: number;
  tx_check_inputs_loop_scan_outputkeys_loop_find_tx: number;
  tx_check_inputs_loop_scan_outputkeys_loop_handle_output: number;

  // db performance data
  map_size: number;
  tx_count: number;
  writer_tx_count: number;
}

export interface pool_performance_data {
  tx_processing_time: number;
  check_inputs_types_supported_time: number;
  expiration_validate_time: number;
  validate_amount_time: number;
  validate_alias_time: number;
  check_keyimages_ws_ms_time: number;
  check_inputs_time: number;
  begin_tx_time: number;
  update_db_time: number;
  db_commit_time: number;
}

export interface tx_rpc_brief_info {
  /** Hash of the transaction. */
  id: string;
  /** Transaction fee in the smallest currency unit. */
  fee: number;
  /** Total amount transferred in the transaction (legacy, for pre-Zarcanum txs). */
  total_amount: number;
  /** Size of the transaction in bytes. */
  sz: number;
}

export enum RANDOM_OUTPUTS_FOR_AMOUNTS_FLAGS {
  COINBASE = 1,
  NOT_ALLOWED = 2,
  POS_COINBASE = 4,
}

export interface vote_on_proposal {
  /** ID of the proposal. */
  proposalId: string;
  /** Number of positive votes. */
  yes: number;
  /** Number of negative votes. */
  no: number;
}

export interface vote_results {
  /** Number of blocks in a given range. */
  totalPosBlocks: number;
  /** Result of votes in a given range. */
  votes: vote_on_proposal[];
}

export interface core_offers_filter {
  /** Field to order the results by one on this: ORDER_BY_TIMESTAMP=0, ORDER_BY_AMOUNT_PRIMARY=1, ORDER_BY_AMOUNT_TARGET=2, ORDER_BY_AMOUNT_RATE=3, ORDER_BY_PAYMENT_TYPES=4, ORDER_BY_CONTACTS=5, ORDER_BY_LOCATION=6, ORDER_BY_NAME=7 */
  order_by: number;
  /** Flag to indicate whether the results should be sorted in reverse order */
  reverse: boolean;
  /** Offset for pagination */
  offset: number;
  /** Maximum number of results to return */
  limit: number;
  /** Start timestamp for filtering results */
  timestamp_start: number;
  /** Stop timestamp for filtering results */
  timestamp_stop: number;
  /** Mask representing the types of offers to include in the results, combination of this: OFFER_TYPE_MASK_PRIMARY_TO_TARGET 0x00000001, OFFER_TYPE_MASK_TARGET_TO_PRIMARY 0x00000002, OFFER_TYPE_MASK_GOODS_TO_PRIMARY 0x00000004, OFFER_TYPE_MASK_PRIMARY_TO_GOODS 0x00000008 */
  offer_type_mask: number;
  /** Lower limit for the amount of offers */
  amount_low_limit: number;
  /** Upper limit for the amount of offers */
  amount_up_limit: number;
  /** Lower limit for the rate */
  rate_low_limit: number;
  /** Upper limit for the rate */
  rate_up_limit: number;
  /** Types of payment accepted for the offers (in a free form as it is in contract) */
  payment_types: string[];
  /** Country of the location for the offers */
  location_country: string;
  /** City of the location for the offers */
  location_city: string;
  /** Target entity of the offers */
  target: string;
  /** Primary field for the offers */
  primary: string;
  /** Bonus associated with the offers */
  bonus: boolean;
  /** Category of the offers */
  category: string;
  /** Keyword for searching offers */
  keyword: string;
  /** Current time */
  current_time: number;
}

export interface offer_details {
  /** Type of the offer: OFFER_TYPE_PRIMARY_TO_TARGET(SELL ORDER) - 0, OFFER_TYPE_TARGET_TO_PRIMARY(BUY ORDER) - 1 etc. */
  ot: number;
  /** Amount of the currency */
  ap: string;
  /** Amount of other currency or goods */
  at: string;
  /** Bonus associated with the offer */
  b: string;
  /** Target: currency / goods */
  t: string;
  /** Currency for goods */
  p: string;
  /** Country of the offer location */
  lco: string;
  /** City of the offer location */
  lci: string;
  /** Contacts related to the offer */
  cnt: string;
  /** Comment associated with the offer */
  com: string;
  /** Types of payment accepted for the offer */
  pt: string;
  /** Deal option for the offer */
  do: string;
  /** Category of the offer */
  cat: string;
  /** Expiration time of the offer */
  et: number;
  /** URL for previewing the offer */
  url: string;
}

export interface offer_details_ex extends offer_details {
  /** Transaction hash represented as a hexadecimal string */
  tx_hash: string;
  /** Origin transaction hash represented as a hexadecimal string (if offer updated) */
  tx_original_hash: string;
  /** Index of the tx_service_attachment entry in transaction */
  index_in_tx: number;
  /** Timestamp of the transaction */
  timestamp: number;
  /** Fee associated with the transaction */
  fee: number;
  /** Owner's public key for access control */
  security: string;
  /** Mutable flag indicating if the offer is stopped */
  stopped: boolean;
}

/** @deprecated unknown data */
export interface crypto_key_image {}

/** @deprecated unknown data */
export interface crypto_hash {}

export interface pos_entry {
  amount: number;
  /** global output index. (could be WALLET_GLOBAL_OUTPUT_INDEX_UNDEFINED) */
  g_index: number;
  stake_unlock_time: number;
  block_timestamp: number;
  keyimage: crypto_key_image;
  /** stake output source tx id */
  tx_id: crypto_hash;
  /** stake output local index in its tx */
  tx_out_index: number;
}

export interface tx_generation_context {
  asset_ids: string[];
  blinded_asset_ids: string[];
  amount_commitments: string[];
  asset_id_blinding_masks: string[];
  amounts: string[];
  amount_blinding_masks: string[];
  pseudo_outs_blinded_asset_ids: string[];
  pseudo_outs_plus_real_out_blinding_masks: string[];
  real_zc_ins_asset_ids: string[];
  zc_input_amounts: number;
  pseudo_out_amount_commitments_sum: string;
  pseudo_out_amount_blinding_masks_sum: string;
  real_in_asset_id_blinding_mask_x_amount_sum: string;
  amount_commitments_sum: string;
  amount_blinding_masks_sum: string;
  asset_id_blinding_mask_x_amount_sum: string;
  ao_asset_id: string;
  ao_asset_id_pt: string;
  ao_amount_commitment: string;
  ao_amount_blinding_mask: string;
  ao_commitment_in_outputs: string;
  tx_key: string;
  tx_pub_key_p: string;
}

export interface epee_hexemizer {
  blob: string;
}

export interface maintainers_info_external {
  ver_major: number;
  ver_minor: number;
  ver_revision: number;
  build_no: number;
  mode: number;
}

export type mining_history_entry = {
  /** Mined amount (block reward) */
  a: number;
  /** Timestamp */
  t: number;
  /** Height */
  h: number;
};

export type mining_history = {
  /** Mined blocks entries */
  mined_entries: mining_history_entry[];
};

export type contracts_array = {
  /** Array of escrow contract details */
  contracts: escrow_contract_details[];
};

export type htlc_entry_info = {
  /** Counterparty address */
  counterparty_address: string;
  /** SHA-256 hash */
  sha256_hash: string;
  /** Transaction ID */
  tx_id: string;
  /** Amount */
  amount: number;
  /** Indicates if it is a redeem */
  is_redeem: boolean;
};

export type data_for_external_asset_signing_tx = {
  /** Base64-encoded unsigned transaction blob. */
  unsigned_tx: string;
  /** Hex-encoded transaction secret key. */
  tx_secret_key: string;
  /** Target address for each of the transaction output. */
  outputs_addresses: string[];
  /** Base64-encoded finalized_tx data structure, which should be passed along with submitting the transaction. */
  finalized_tx: string;
};

export type wallet_info_extra = {
  view_private_key: string;
  view_public_key: string;
  spend_private_key: string;
  spend_public_key: string;
  seed: string;
};

export type wallet_extended_info = {
  wi: wallet_info;
  wi_extended: wallet_info_extra;
};

export type get_wallet_files_response = { items: string[] };

export type WalletReturnCode<Code extends string = API_RETURN_CODE> = { return_code: Code };
export type WalletErrorCode<Code = API_RETURN_CODE, Message extends string = string> = { code: Code; message: Message };
export type WalletReturnErrors = WalletReturnCode<
  API_RETURN_CODE.UNINITIALIZED | `${API_RETURN_CODE.INTERNAL_ERROR} ${string}` | API_RETURN_CODE.INTERNAL_ERROR
>;
