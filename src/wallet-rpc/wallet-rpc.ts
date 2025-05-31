import type { DAEMON_RPC_GET_OFFERS_EX_REQUEST, DAEMON_RPC_GET_OFFERS_EX_RESPONSE } from '../core-rpc/core-rpc';
import type {
  alias_rpc_details,
  API_RETURN_CODE,
  asset_balance_entry,
  asset_descriptor_base,
  asset_descriptor_with_id,
  contract_private_details,
  contracts_array,
  data_for_external_asset_signing_tx,
  htlc_entry_info,
  ionic_swap_proposal_info,
  mining_history,
  offer_details_ex,
  payment_details,
  transfer_destination,
  tx_service_attachment,
  wallet_entry_info,
  wallet_provision_info,
  WALLET_RPC_ERROR_CODE,
  wallet_transfer_info,
  wallet_transfer_info_old,
  WalletErrorCode,
  WalletReturnErrors,
} from '../entities';
import type { JSONRpcResponse } from '../utils/json-rpc';
import type { __UNPROTECTED__TypedJSON, JSONConstrain } from '../utils/typed-json';
import type { WalletRpc } from './wallet-rpc.nitro';

// on_getbalance
export type INVOKE_RPC_GET_BALANCE_REQUEST = {};
export type INVOKE_RPC_GET_BALANCE_RESPONSE = {
  /** Native coins total amount */
  balance: number;
  /** Native coins total unlocked amount */
  unlocked_balance: number;
  /** Balances grouped by its asset_id */
  balances: asset_balance_entry[];
};

// on_getaddress
export type INVOKE_RPC_GET_ADDRESS_REQUEST = {};
export type INVOKE_RPC_GET_ADDRESS_RESPONSE = {
  /** Standard public address of the wallet */
  address: string;
};

// on_getwallet_info
export type INVOKE_RPC_GET_WALLET_INFO_REQUEST = {};
export type INVOKE_RPC_GET_WALLET_INFO_RESPONSE = {
  /** Standard public address of the wallet */
  address: string;
  /** Path to wallet file location */
  path: string;
  /** Number of transactions that happened to this wallet (basically tx history) */
  transfers_count: number;
  /** Number of internal entries count (each entry represents tx output that has been addressed to this wallet) */
  transfer_entries_count: number;
  /** Shows if the wallet is watch-only */
  is_watch_only: boolean;
  /** Shows if the wallet still has UTXO from pre-zarcanum era */
  has_bare_unspent_outputs: boolean;
  /** UTXO distribution for this particular wallet: disabled right now */
  utxo_distribution: string[];
  /** Current wallet/daemon height */
  current_height: number;
};

// on_get_recent_txs_and_info
export type INVOKE_RPC_GET_RECENT_TXS_AND_INFO_REQUEST = INVOKE_RPC_GET_RECENT_TXS_AND_INFO2_REQUEST;
export type INVOKE_RPC_GET_RECENT_TXS_AND_INFO_RESPONSE = {
  /** Details on wallet balance etc */
  pi: wallet_provision_info;
  /** Transfers */
  transfers: wallet_transfer_info[];
  /** Total transfers */
  total_transfers: number;
  /** Last item index */
  last_item_index: number;
};

// on_get_recent_txs_and_info2
export type INVOKE_RPC_GET_RECENT_TXS_AND_INFO2_REQUEST = {
  /** Offset from what index to start fetching transfers entries (if filters are used then last_item_index could be used from previous call) */
  offset: number;
  /** How many items to fetch, if items fetched is less than count, then enumeration is over */
  count: number;
  /** If update pi is required, could be false only if need to optimize performance (applicable for very big wallets) */
  update_provision_info: boolean;
  /** Exclude mining/staking transactions from results (last_item_index should be used for subsequent calls) */
  exclude_mining_txs: boolean;
  /** Do not include unconfirmed transactions in results (it also not included if offset is non-zero) */
  exclude_unconfirmed: boolean;
  /** Order: "FROM_BEGIN_TO_END" or "FROM_END_TO_BEGIN" */
  order: 'FROM_BEGIN_TO_END' | 'FROM_END_TO_BEGIN';
};
export type INVOKE_RPC_GET_RECENT_TXS_AND_INFO2_RESPONSE = {
  /** Details on wallet balance etc */
  pi: wallet_provision_info;
  /** Transfers */
  transfers?: wallet_transfer_info[];
  /** Total transfers */
  total_transfers: number;
  /** Last item index */
  last_item_index: number;
};

// on_transfer
export type INVOKE_RPC_TRANSFER_REQUEST = {
  /** List of destinations */
  destinations: transfer_destination[];
  /** Fee to be paid on behalf of sender's wallet (paid in native coins) */
  fee: number;
  /** Specifies number of mixins (decoys) that would be used to create input */
  mixin: number;
  /** Hex-encoded payment_id, that normally used for user database by exchanges */
  payment_id?: string;
  /** Text comment that is displayed in UI */
  comment?: string;
  /** Reveal information about sender of this transaction */
  push_payer?: boolean;
  /** Add to transaction information about remote address (destination) */
  hide_receiver?: boolean;
  /** Service entries that might be used by different apps that works on top of Zano network */
  service_entries?: tx_service_attachment[];
  /** Point to wallet that service_entries should be placed to 'extra' section of transaction */
  service_entries_permanent?: boolean;
};
export type INVOKE_RPC_TRANSFER_RESPONSE = {
  /** Hash of the generated transaction (if succeeded) */
  tx_hash: string;
  /** Unsigned transaction data in hexadecimal format */
  tx_unsigned_hex: string;
  /** Transaction size in bytes */
  tx_size: number;
};

// on_store
export type INVOKE_RPC_STORE_REQUEST = {};
export type INVOKE_RPC_STORE_RESPONSE = {
  /** Resulting file size in bytes */
  wallet_file_size: number;
};

// on_get_payments
export type INVOKE_RPC_GET_PAYMENTS_REQUEST = {
  /** Payment id that is used to identify transfers */
  payment_id: string;
  /** Says to wallet if locked transfers should be included or not */
  allow_locked_transactions: boolean;
};
export type INVOKE_RPC_GET_PAYMENTS_RESPONSE = {
  /** Array of payments that connected to given payment_id */
  payments: payment_details[];
};

// on_get_bulk_payments
export type INVOKE_RPC_GET_BULK_PAYMENTS_REQUEST = {
  /** Payment ids that is used to identify transfers */
  payment_ids: string[];
  /** Minimal block height to consider */
  min_block_height: number;
  /** Says to wallet if locked transfers should be included or not */
  allow_locked_transactions: boolean;
};
export type INVOKE_RPC_GET_BULK_PAYMENTS_RESPONSE = INVOKE_RPC_GET_PAYMENTS_RESPONSE;

// on_make_integrated_address
export type INVOKE_RPC_MAKE_INTEGRATED_ADDRESS_REQUEST = {
  /** Hex-encoded Payment ID to be associated with this address. If empty, the wallet will generate a new payment ID using the system random library */
  payment_id: string;
};
export type INVOKE_RPC_MAKE_INTEGRATED_ADDRESS_RESPONSE = {
  /** Integrated address combining a standard address and payment ID, if applicable */
  integrated_address: string;
  /** Payment ID associated with this address */
  payment_id: string;
};

// on_split_integrated_address
export type INVOKE_RPC_SPLIT_INTEGRATED_ADDRESS_REQUEST = {
  /** Integrated address combining a standard address and payment ID, if applicable */
  integrated_address: string;
};
export type INVOKE_RPC_SPLIT_INTEGRATED_ADDRESS_RESPONSE = {
  /** Standard address */
  standard_address: string;
  /** Hex-encoded payment id */
  payment_id: string;
};

// on_sweep_below
export type INVOKE_RPC_SWEEP_BELOW_REQUEST = {
  /** Number of outputs from the blockchain to mix with when sending a transaction to improve privacy */
  mixin: number;
  /** Public address for sending or receiving native coins */
  address: string;
  /** Threshold amount of native coins to sweep */
  amount: number;
  /** Payment ID associated with the transaction in hexadecimal format */
  payment_id_hex: string;
  /** Transaction fee required for processing the transaction */
  fee: number;
};
export type INVOKE_RPC_SWEEP_BELOW_RESPONSE = {
  /** Transaction ID (hash) format */
  tx_hash: string;
  /** Unsigned transaction data in hexadecimal format */
  tx_unsigned_hex: string;
  /** Total number of outputs in the transaction */
  outs_total: number;
  /** Total amount of native coins involved in the transaction */
  amount_total: number;
  /** Number of outputs swept in the transaction */
  outs_swept: number;
  /** Amount of native coins swept in the transaction */
  amount_swept: number;
};

// on_get_bare_outs_stats
export type INVOKE_RPC_GET_BARE_OUTS_STATS_REQUEST = {};
export type INVOKE_RPC_GET_BARE_OUTS_STATS_RESPONSE = {
  /** Total number of unspent bare outputs in the wallet */
  total_bare_outs: number;
  /** Total amount of native coins involved in bare outputs */
  total_amount: number;
  /** Expected total transaction fee required for processing the transaction */
  expected_total_fee: number;
  /** Total number of transactions needed to convert all bare outputs */
  txs_count: number;
};

// on_sweep_bare_outs
export type INVOKE_RPC_SWEEP_BARE_OUTS_REQUEST = {};
export type INVOKE_RPC_SWEEP_BARE_OUTS_RESPONSE = {
  /** Number of bare outputs swept in the transactions */
  bare_outs_swept: number;
  /** Amount of native coins swept in the transactions */
  amount_swept: number;
  /** Total fee spent on the transactions */
  fee_spent: number;
  /** Total number of transactions sent */
  txs_sent: number;
};

// on_sign_transfer
export type INVOKE_RPC_SIGN_TRANSFER_REQUEST = {
  /** Unsigned transaction hex-encoded blob */
  tx_unsigned_hex: string;
};
export type INVOKE_RPC_SIGN_TRANSFER_RESPONSE = {
  /** Signed transaction hex-encoded blob */
  tx_signed_hex: string;
  /** Signed transaction hash */
  tx_hash: string;
};

// on_submit_transfer
export type INVOKE_RPC_SUBMIT_TRANSFER_REQUEST = {
  /** Signed transaction hex-encoded blob */
  tx_signed_hex: string;
};
export type INVOKE_RPC_SUBMIT_TRANSFER_RESPONSE = {
  /** Signed transaction hash */
  tx_hash: string;
};

// on_search_for_transactions
export type INVOKE_RPC_SEARCH_FOR_TRANSACTIONS_LEGACY_REQUEST = INVOKE_RPC_SEARCH_FOR_TRANSACTIONS_REQUEST;
export type INVOKE_RPC_SEARCH_FOR_TRANSACTIONS_LEGACY_RESPONSE = {
  /** List of incoming transactions */
  in: wallet_transfer_info_old[];
  /** List of outgoing transactions */
  out: wallet_transfer_info_old[];
  /** List of pool transactions */
  pool: wallet_transfer_info_old[];
};

// on_search_for_transactions2
export type INVOKE_RPC_SEARCH_FOR_TRANSACTIONS_REQUEST = {
  /** Transaction ID represented as a hexadecimal string */
  tx_id: string;
  /** Search over incoming transactions */
  in?: boolean;
  /** Search over outgoing transactions */
  out?: boolean;
  /** Search over pool transactions */
  pool?: boolean;
  /** Do filter transactions by height or not */
  filter_by_height?: boolean;
  /** Minimum height for filtering transactions */
  min_height?: number;
  /** Maximum height for filtering transactions */
  max_height?: number;
};
export type INVOKE_RPC_SEARCH_FOR_TRANSACTIONS_RESPONSE = {
  /** List of incoming transactions */
  in: wallet_transfer_info[];
  /** List of outgoing transactions */
  out: wallet_transfer_info[];
  /** List of pool transactions */
  pool: wallet_transfer_info[];
};

// on_getwallet_restore_info
export type INVOKE_RPC_GET_WALLET_RESTORE_INFO_REQUEST = {
  /** Password to secure wallet's seed */
  seed_password: string;
};
export type INVOKE_RPC_GET_WALLET_RESTORE_INFO_RESPONSE = {
  /** Wallet's seed (secured with password if it was provided in argument) */
  seed_phrase: string;
};

// on_get_seed_phrase_info
export type INVOKE_RPC_GET_SEED_PHRASE_INFO_REQUEST = {
  /** Mnemonic seed phrase used for wallet recovery or generation */
  seed_phrase: string;
  /** Password used to encrypt or decrypt the mnemonic seed phrase, if applicable */
  seed_password: string;
};
export type INVOKE_RPC_GET_SEED_PHRASE_INFO_RESPONSE = {
  /** Indicates whether the syntax is correct */
  syntax_correct: boolean;
  /** Indicates whether a password is required */
  require_password: boolean;
  /** Indicates whether the hash sum matches */
  hash_sum_matched: boolean;
  /** Indicates whether tracking is enabled */
  tracking: boolean;
  /** Return address of the seed phrase */
  address: string;
};

// on_get_mining_history
export type INVOKE_RPC_GET_MINING_HISTORY_REQUEST = {
  v: number;
};
export type INVOKE_RPC_GET_MINING_HISTORY_RESPONSE = mining_history;

// on_register_alias
export type INVOKE_RPC_REGISTER_ALIAS_REQUEST = {
  /** Alias details */
  al: alias_rpc_details;
  /** Key for registering aliases shorter than 6 letters (team) */
  authority_key?: string;
};
export type INVOKE_RPC_REGISTER_ALIAS_RESPONSE = {
  /** If success - transactions that performs registration (alias becomes available after few confirmations) */
  tx_id: string;
};

// on_update_alias
export type INVOKE_RPC_UPDATE_ALIAS_REQUEST = {
  /** Alias details */
  al: alias_rpc_details;
};
export type INVOKE_RPC_UPDATE_ALIAS_RESPONSE = {
  /** If success - transactions that performs registration(alias becomes available after few confirmations) */
  tx_id: string;
};

// on_contracts_send_proposal
export type INVOKE_RPC_CONTRACTS_SEND_PROPOSAL_REQUEST = {
  /** Contract private details */
  details: contract_private_details;
  /** Payment ID */
  payment_id: string;
  /** Expiration period */
  expiration_period: number;
  /** Fee */
  fee: number;
  /** B fee */
  b_fee: number;
  /** Fake outputs count */
  fake_outputs_count: number;
  /** Unlock time */
  unlock_time: number;
};
export type INVOKE_RPC_CONTRACTS_SEND_PROPOSAL_RESPONSE = {
  /** Status of the proposal */
  status: string;
};

// on_contracts_accept_proposal
export type INVOKE_RPC_CONTRACTS_ACCEPT_PROPOSAL_REQUEST = {
  /** Contract ID */
  contract_id: string;
  /** Acceptance fee */
  acceptance_fee: number;
};
export type INVOKE_RPC_CONTRACTS_ACCEPT_PROPOSAL_RESPONSE = {};

// on_contracts_get_all
export type INVOKE_RPC_CONTRACTS_GET_ALL_REQUEST = {};
export type INVOKE_RPC_CONTRACTS_GET_ALL_RESPONSE = contracts_array;

// on_contracts_release
export type INVOKE_RPC_CONTRACTS_RELEASE_REQUEST = {
  /** Contract ID */
  contract_id: string;
  /** Release type */
  release_type: string;
};
export type INVOKE_RPC_CONTRACTS_RELEASE_RESPONSE = {};

// on_contracts_request_cancel
export type INVOKE_RPC_CONTRACTS_REQUEST_CANCEL_REQUEST = {
  /** Contract ID */
  contract_id: string;
  /** Expiration period */
  expiration_period: number;
  /** Fee */
  fee: number;
};
export type INVOKE_RPC_CONTRACTS_REQUEST_CANCEL_RESPONSE = {};

// on_contracts_accept_cancel
export type INVOKE_RPC_CONTRACTS_ACCEPT_CANCEL_REQUEST = {
  /** Contract ID */
  contract_id: string;
};
export type INVOKE_RPC_CONTRACTS_ACCEPT_CANCEL_RESPONSE = {};

// on_marketplace_get_my_offers
export type INVOKE_RPC_MARKETPLACE_GET_MY_OFFERS_REQUEST = DAEMON_RPC_GET_OFFERS_EX_REQUEST;
export type INVOKE_RPC_MARKETPLACE_GET_MY_OFFERS_RESPONSE = DAEMON_RPC_GET_OFFERS_EX_RESPONSE;

// on_marketplace_push_offer
export type INVOKE_RPC_MARKETPLACE_PUSH_OFFER_REQUEST = {
  /** Offer details */
  od: offer_details_ex;
};
export type INVOKE_RPC_MARKETPLACE_PUSH_OFFER_RESPONSE = {
  /** Transaction hash */
  tx_hash: string;
  /** Size of the transaction blob */
  tx_blob_size: number;
};

// on_marketplace_push_update_offer
export type INVOKE_RPC_MARKETPLACE_PUSH_UPDATE_OFFER_REQUEST = {
  /** Transaction ID represented as a hexadecimal string */
  tx_id: string;
  /** Number of offer entries inside transaction (likely 0) */
  no: number;
  /** Offer details */
  od: offer_details_ex;
};
export type INVOKE_RPC_MARKETPLACE_PUSH_UPDATE_OFFER_RESPONSE = {
  /** Transaction hash */
  tx_hash: string;
  /** Size of the transaction blob */
  tx_blob_size: number;
};

// on_marketplace_cancel_offer
export type INVOKE_RPC_MARKETPLACE_CANCEL_OFFER_REQUEST = {
  /** Transaction ID represented as a hexadecimal string */
  tx_id: string;
  /** Number of offer entries inside transaction (likely 0) */
  no: number;
  /** Fee for operation */
  fee: number;
};
export type INVOKE_RPC_MARKETPLACE_CANCEL_OFFER_RESPONSE = {
  /** Transaction hash */
  tx_hash: string;
  /** Size of the transaction blob */
  tx_blob_size: number;
};

// on_create_htlc_proposal
export type INVOKE_RPC_CREATE_HTLC_PROPOSAL_REQUEST = {
  /** Amount */
  amount: number;
  /** Counterparty address */
  counterparty_address: string;
  /** Lock blocks count */
  lock_blocks_count: number;
  /** HTLC hash */
  htlc_hash: string;
};
export type INVOKE_RPC_CREATE_HTLC_PROPOSAL_RESPONSE = {
  /** Result transaction blob */
  result_tx_blob: string;
  /** Result transaction ID */
  result_tx_id: string;
  /** Derived origin secret (this field derived in a deterministic way if no htlc_hash was provided) */
  derived_origin_secret: string;
};

// on_get_list_of_active_htlc
export type INVOKE_RPC_GET_LIST_OF_ACTIVE_HTLC_REQUEST = {
  /** Indicates if only income redeem HTLCs should be included */
  income_redeem_only: boolean;
};
export type INVOKE_RPC_GET_LIST_OF_ACTIVE_HTLC_RESPONSE = {
  /** List of HTLC entries */
  htlcs: htlc_entry_info[];
};

// on_redeem_htlc
export type INVOKE_RPC_REDEEM_HTLC_REQUEST = {
  /** Transaction ID */
  tx_id: string;
  /** Origin secret */
  origin_secret: string;
};
export type INVOKE_RPC_REDEEM_HTLC_RESPONSE = {
  /** Result transaction blob */
  result_tx_blob: string;
  /** Result transaction ID */
  result_tx_id: string;
};

// on_check_htlc_redeemed
export type INVOKE_RPC_CHECK_HTLC_REDEEMED_REQUEST = {
  /** HTLC transaction ID */
  htlc_tx_id: string;
};
export type INVOKE_RPC_CHECK_HTLC_REDEEMED_RESPONSE = {
  /** Origin secret */
  origin_secrete: string;
  /** Redeem transaction ID */
  redeem_tx_id: string;
};

// on_ionic_swap_generate_proposal
export type INVOKE_RPC_IONIC_SWAP_GENERATE_PROPOSAL_REQUEST = {
  /** Proposal details */
  proposal: ionic_swap_proposal_info;
  /** Destination address */
  destination_address: string;
};
export type INVOKE_RPC_IONIC_SWAP_GENERATE_PROPOSAL_RESPONSE = {
  /** Hex-encoded proposal raw data (encrypted with common shared key). Includes half-created transaction template and some extra information that would be needed counterparty to finalize and sign transaction */
  hex_raw_proposal: string;
};

// on_ionic_swap_get_proposal_info
export type INVOKE_RPC_IONIC_SWAP_GET_PROPOSAL_INFO_REQUEST = {
  /** Hex-encoded proposal raw data (encrypted with common shared key). Includes half-created transaction template and some extra information that would be needed counterparty to finalize and sign transaction */
  hex_raw_proposal: string;
};
export type INVOKE_RPC_IONIC_SWAP_GET_PROPOSAL_INFO_RESPONSE = {
  /** Proposal details */
  proposal: ionic_swap_proposal_info;
};

// on_ionic_swap_accept_proposal
export type INVOKE_RPC_IONIC_SWAP_ACCEPT_PROPOSAL_REQUEST = {
  /** Hex-encoded proposal raw data (encrypted with common shared key). Includes half-created transaction template and some extra information that would be needed counterparty to finalize and sign transaction */
  hex_raw_proposal: string;
};
export type INVOKE_RPC_IONIC_SWAP_ACCEPT_PROPOSAL_RESPONSE = {
  /** Result transaction ID */
  result_tx_id: string;
};

// on_assets_whitelist_get
export type INVOKE_RPC_ASSETS_WHITELIST_GET_REQUEST = {};
export type INVOKE_RPC_ASSETS_WHITELIST_GET_RESPONSE = {
  /** Local whitelist, assets that have been added to this wallet file manually */
  local_whitelist: asset_descriptor_with_id[];
  /** Global whitelist, well-known assets with adoption, maintained by the team and community */
  global_whitelist: asset_descriptor_with_id[];
  /** Own assets, the ones that are under control of this wallet */
  own_assets: asset_descriptor_with_id[];
};

// on_assets_whitelist_add
export type INVOKE_RPC_ASSETS_WHITELIST_ADD_REQUEST = {
  /** Asset id that needed to be added to local whitelist, asset_id must exist in the network */
  asset_id: string;
};
export type INVOKE_RPC_ASSETS_WHITELIST_ADD_RESPONSE = {
  /** Status of the asset */
  status: API_RETURN_CODE.NOT_FOUND | API_RETURN_CODE.OK;
  /** Details of the asset, received from node */
  asset_descriptor: asset_descriptor_base;
};

// on_assets_whitelist_remove
export type INVOKE_RPC_ASSETS_WHITELIST_REMOVE_REQUEST = {
  /** Asset id to be removed from local whitelist */
  asset_id: string;
};
export type INVOKE_RPC_ASSETS_WHITELIST_REMOVE_RESPONSE = {
  /** Command result (OK if success) */
  status: API_RETURN_CODE.NOT_FOUND | API_RETURN_CODE.OK;
};

// on_asset_deploy
export type INVOKE_RPC_ASSETS_DEPLOY_REQUEST = {
  /** Addresses where to receive emitted coins. Asset id in the destinations is irrelevant and can be omitted. */
  destinations: transfer_destination[];
  /** Descriptor that holds all information about asset - ticker, emission, description etc. */
  asset_descriptor: asset_descriptor_base;
  /** If true, the provided destinations will be used as-is and won't be split (or altered) to avoid common issues. Default is false. */
  do_not_split_destinations: boolean;
};
export type INVOKE_RPC_ASSETS_DEPLOY_RESPONSE = {
  /** Id of transaction that carries asset registration command, asset would be registered as soon as transaction got confirmed. */
  tx_id: string;
  /** Issued asset id. */
  new_asset_id: string;
};

// on_asset_emit
export type INVOKE_RPC_ASSETS_EMIT_REQUEST = {
  /** Id of the asset to emit more coins */
  asset_id: string;
  /** Addresses where to receive emitted coins. Asset id in the destinations is irrelevant and can be omitted. */
  destinations: transfer_destination[];
  /** If true, the provided destinations will be used as-is and won't be split (or altered) to avoid common issues. Default is false. */
  do_not_split_destinations: boolean;
};
export type INVOKE_RPC_ASSETS_EMIT_RESPONSE = {
  /** Id of transaction that emits the required asset. */
  tx_id: string;
  /** [optional] Additional data for external asset tx signing. */
  data_for_external_signing?: data_for_external_asset_signing_tx;
};

// on_asset_update
export type INVOKE_RPC_ASSETS_UPDATE_REQUEST = {
  /** Id of the asset to update */
  asset_id: string;
  /** Descriptor that holds all information about asset that need to be updated (only owner could be updated) */
  asset_descriptor: asset_descriptor_base;
};
export type INVOKE_RPC_ASSETS_UPDATE_RESPONSE = {
  /** Id of transaction that carries asset registration command, asset would be registered as soon as transaction got confirmed */
  tx_id: string;
  /** [optional] Hex-encoded transaction for external signing */
  data_for_external_signing?: data_for_external_asset_signing_tx;
};

// on_asset_burn
export type INVOKE_RPC_ASSETS_BURN_REQUEST = {
  /** Id of the asset to burn */
  asset_id: string;
  /** Amount to burn */
  burn_amount: number;
  /** Optional, if we need this transaction to be seen by a particular wallet */
  point_tx_to_address?: string;
  /** Optional, if we need this transaction to be seen by a particular wallet */
  native_amount?: number;
  /** Optional, if we need to include service entries for burn transaction */
  service_entries?: tx_service_attachment[];
};
export type INVOKE_RPC_ASSETS_BURN_RESPONSE = {
  /** Id of transaction that carries asset burn operation */
  tx_id: string;
};

// on_asset_send_ext_signed_tx
export type INVOKE_RPC_ASSET_SEND_EXT_SIGNED_TX_REQUEST = {
  /** Base64-encoded finalized_tx data structure, which was received from emit_asset call. */
  finalized_tx: string;
  /** Base64-encoded unsigned transaction blob, which was received from emit_asset call. */
  unsigned_tx: string;
  /** HEX-encoded ETH signature (64 bytes) */
  eth_sig: string;
  /** The expected transaction id. Tx won't be sent if the calculated one doesn't match this one. Consider using 'verified_tx_id' returned by 'decrypt_tx_details' call. */
  expected_tx_id: string;
  /** If true, all locked wallet transfers, corresponding to the transaction, will be unlocked on sending failure. False by default. */
  unlock_transfers_on_fail: boolean;
};
export type INVOKE_RPC_ASSET_SEND_EXT_SIGNED_TX_RESPONSE = {
  /** Status of the call */
  status: API_RETURN_CODE.OK | `The given tx was created in a different wallet, keys missmatch, tx hash: ${string}` | (string & {});
  /** If true, all input transfers that were locked when preparing this transaction, are now unlocked and may be spent. Can be true only upon sending failure and if requested. */
  transfers_were_unlocked: boolean;
};

// on_attach_asset_descriptor
export type INVOKE_RPC_ATTACH_ASSET_DESCRIPTOR_REQUEST = {
  /** Asset id of the ADO that need to be attached to this wallet. */
  asset_id: string;
  /** If true - asset descriptor attached to wallet, if false - asset detached. */
  do_attach: boolean;
};
export type INVOKE_RPC_ATTACH_ASSET_DESCRIPTOR_RESPONSE = {
  /** Status of the call */
  status: API_RETURN_CODE.NOT_FOUND | API_RETURN_CODE.ACCESS_DENIED | API_RETURN_CODE.OK;
};

// on_transfer_asset_ownership
export type INVOKE_RPC_TRANSFER_ASSET_OWNERSHIP_REQUEST =
  | {
      /** Own asset id, that would be transfered to someone else */
      asset_id: string;
      /** Public key of the new owner(default Ed25519 public key, 32 bytes) */
      new_owner: string;
      /** Public key of the new owner(ECDSA public key, 33 bytes) Used only if 'owner' field is empty */
      new_owner_eth_pub_key?: undefined;
    }
  | {
      /** Own asset id, that would be transfered to someone else */
      asset_id: string;
      /** Public key of the new owner(default Ed25519 public key, 32 bytes) */
      new_owner?: undefined;
      /** Public key of the new owner(ECDSA public key, 33 bytes) Used only if 'owner' field is empty */
      new_owner_eth_pub_key: string;
    };
export type INVOKE_RPC_TRANSFER_ASSET_OWNERSHIP_RESPONSE = {
  /** Status of the call */
  status:
    | API_RETURN_CODE.BAD_ARG_INVALID_ADDRESS
    | API_RETURN_CODE.OK
    | `Couldn't find asset_id "${string}" in own assets list`
    | 'Failed to get asset info from daemon'
    | (string & {});
  /** Id of transaction that carries asset transfer ownership operation */
  tx_id: string;
  /** Additional data for external ownership transfer tx signing(if asset is ownership is belong to third party). */
  data_for_external_signing?: data_for_external_asset_signing_tx;
};

// on_mw_get_wallets
export type INVOKE_RPC_MW_GET_WALLETS_REQUEST = {};
export type INVOKE_RPC_MW_GET_WALLETS_RESPONSE = {
  wallets: wallet_entry_info[];
};

// on_mw_select_wallet
export type INVOKE_RPC_MW_SELECT_WALLET_REQUEST = {
  /** Wallet id */
  wallet_id: number;
};
export type INVOKE_RPC_MW_SELECT_WALLET_RESPONSE = {
  /** Result (OK if success) */
  status: string;
};

// on_sign_message
export type INVOKE_RPC_SIGN_MESSAGE_REQUEST = {
  /** Base64 encoded data message to be signed */
  buff: string;
};
export type INVOKE_RPC_SIGN_MESSAGE_RESPONSE = {
  /** Signature represented as a hexadecimal string */
  sig: string;
  /** Wallet's public key represented as a hexadecimal string */
  pkey: string;
};

// on_encrypt_data
export type INVOKE_RPC_ENCRYPT_DATA_REQUEST = {
  /** Base64 encoded data message to be encrypted */
  buff: string;
};
export type INVOKE_RPC_ENCRYPT_DATA_RESPONSE = {
  /** Base64 encoded resulted data message */
  res_buff: string;
};

// on_decrypt_data
export type INVOKE_RPC_DECRYPT_DATA_REQUEST = {
  /** Base64 encoded data message to be decrypted */
  buff: string;
};
export type INVOKE_RPC_DECRYPT_DATA_RESPONSE = {
  /** Base64 encoded resulted data message */
  res_buff: string;
};

// on_proxy_to_daemon
export type INVOKE_RPC_PROXY_TO_DAEMON_REQUEST = {
  /** URI for daemon API */
  uri: string;
  /** Base64 encoded request body */
  base64_body: string;
};
export type INVOKE_RPC_PROXY_TO_DAEMON_RESPONSE = {
  /** Base64 encoded daemon response body */
  base64_body: string;
  /** Response code */
  response_code: number;
};

type WalletMethod<Params extends JSONConstrain<Params>, Result extends JSONConstrain<Result>, Errors extends JSONConstrain<Errors> = never> = (
  instance_id: number,
  params: Params | (string & {})
) =>
  | __UNPROTECTED__TypedJSON<
      JSONRpcResponse<
        Result | WalletReturnErrors,
        | Errors
        | WalletErrorCode<WALLET_RPC_ERROR_CODE.UNKNOWN_ERROR, API_RETURN_CODE.BUSY>
        | WalletErrorCode<WALLET_RPC_ERROR_CODE.PARSE_ERROR, 'Parse error'>
        | WalletErrorCode<WALLET_RPC_ERROR_CODE.INVALID_REQUEST, 'Invalid Request'>
        | WalletErrorCode<WALLET_RPC_ERROR_CODE.INVALID_PARAMS, 'Invalid params'>
        | WalletErrorCode<WALLET_RPC_ERROR_CODE.DAEMON_IS_BUSY, `WALLET_RPC_ERROR_CODE_DAEMON_IS_BUSY${string}`>
        | WalletErrorCode<WALLET_RPC_ERROR_CODE.NOT_ENOUGH_MONEY, `WALLET_RPC_ERROR_CODE_NOT_ENOUGH_MONEY${string}`>
        | WalletErrorCode<WALLET_RPC_ERROR_CODE.GENERIC_TRANSFER_ERROR>
        | WalletErrorCode<WALLET_RPC_ERROR_CODE.GENERIC_TRANSFER_ERROR, `WALLET_RPC_ERROR_CODE_GENERIC_TRANSFER_ERROR${string}`>
        | WalletErrorCode<WALLET_RPC_ERROR_CODE.UNKNOWN_ERROR, `WALLET_RPC_ERROR_CODE_UNKNOWN_ERROR`>
        | WalletErrorCode<API_RETURN_CODE.UNINITIALIZED, `${API_RETURN_CODE.INTERNAL_ERROR} ${string}` | API_RETURN_CODE.INTERNAL_ERROR>
      >
    >
  | API_RETURN_CODE.WALLET_WRONG_ID;
export interface IWalletRpc extends WalletRpc {
  /** Return the balances across all whitelisted assets of the wallet */
  getbalance: WalletMethod<INVOKE_RPC_GET_BALANCE_REQUEST, INVOKE_RPC_GET_BALANCE_RESPONSE>;
  /** Obtains wallet's public address */
  getaddress: WalletMethod<INVOKE_RPC_GET_ADDRESS_REQUEST, INVOKE_RPC_GET_ADDRESS_RESPONSE>;
  /** Returns wallet helpful wallet information */
  get_wallet_info: WalletMethod<INVOKE_RPC_GET_WALLET_INFO_REQUEST, INVOKE_RPC_GET_WALLET_INFO_RESPONSE>;
  /** Returns wallet history of transactions */
  get_recent_txs_and_info: WalletMethod<INVOKE_RPC_GET_RECENT_TXS_AND_INFO_REQUEST, INVOKE_RPC_GET_RECENT_TXS_AND_INFO_RESPONSE>;
  /** Returns wallet history of transactions V2 (post-zarcanum version) */
  get_recent_txs_and_info2: WalletMethod<INVOKE_RPC_GET_RECENT_TXS_AND_INFO2_REQUEST, INVOKE_RPC_GET_RECENT_TXS_AND_INFO2_RESPONSE>;
  /** Make new payment transaction from the wallet */
  transfer: WalletMethod<
    INVOKE_RPC_TRANSFER_REQUEST,
    INVOKE_RPC_TRANSFER_RESPONSE,
    | WalletErrorCode<WALLET_RPC_ERROR_CODE.WRONG_ARGUMENT, `Given fee is too low: ${number}, minimum is: ${number}`>
    | WalletErrorCode<WALLET_RPC_ERROR_CODE.WRONG_PAYMENT_ID, `invalid encoded payment id: ${string}, hex-encoded string was expected`>
    | WalletErrorCode<WALLET_RPC_ERROR_CODE.WRONG_ARGUMENT, 'Second wrap entry not supported in transactions'>
    | WalletErrorCode<WALLET_RPC_ERROR_CODE.WRONG_ADDRESS, `WALLET_RPC_ERROR_CODE_WRONG_ADDRESS: ${string}`>
    | WalletErrorCode<WALLET_RPC_ERROR_CODE.WRONG_PAYMENT_ID, `embedded payment id: ${string} conflicts with previously set payment id: ${string}`>
    | WalletErrorCode<WALLET_RPC_ERROR_CODE.WRONG_PAYMENT_ID, `payment id ${string} is invalid and can't be set`>
  >;
  /** Store wallet's data to file */
  store: WalletMethod<INVOKE_RPC_STORE_REQUEST, INVOKE_RPC_STORE_RESPONSE>;
  /** Gets list of incoming transfers by a given payment ID */
  get_payments: WalletMethod<
    INVOKE_RPC_GET_PAYMENTS_REQUEST,
    INVOKE_RPC_GET_PAYMENTS_RESPONSE,
    WalletErrorCode<WALLET_RPC_ERROR_CODE.WRONG_PAYMENT_ID, `invalid payment id given: '${string}', hex-encoded string was expected`>
  >;
  /** Gets list of incoming transfers by a given multiple payment_ids */
  get_bulk_payments: WalletMethod<
    INVOKE_RPC_GET_BULK_PAYMENTS_REQUEST,
    INVOKE_RPC_GET_BULK_PAYMENTS_RESPONSE,
    WalletErrorCode<WALLET_RPC_ERROR_CODE.WRONG_PAYMENT_ID, `invalid payment id given: '${string}', hex-encoded string was expected`>
  >;
  /** Generate integrated address */
  make_integrated_address: WalletMethod<
    INVOKE_RPC_MAKE_INTEGRATED_ADDRESS_REQUEST,
    INVOKE_RPC_MAKE_INTEGRATED_ADDRESS_RESPONSE,
    | WalletErrorCode<WALLET_RPC_ERROR_CODE.WRONG_PAYMENT_ID, `invalid payment id given: '${string}', hex-encoded string was expected`>
    | WalletErrorCode<WALLET_RPC_ERROR_CODE.WRONG_PAYMENT_ID, `given payment id is too long: '${string}'`>
  >;
  /** Decode integrated address */
  split_integrated_address: WalletMethod<
    INVOKE_RPC_SPLIT_INTEGRATED_ADDRESS_REQUEST,
    INVOKE_RPC_SPLIT_INTEGRATED_ADDRESS_RESPONSE,
    WalletErrorCode<WALLET_RPC_ERROR_CODE.WRONG_ADDRESS, `invalid integrated address given: '${string}'`>
  >;
  /** Tries to transfer all coins with amount below the given limit to the given address */
  sweep_below: WalletMethod<
    INVOKE_RPC_SWEEP_BELOW_REQUEST,
    INVOKE_RPC_SWEEP_BELOW_RESPONSE,
    | WalletErrorCode<WALLET_RPC_ERROR_CODE.WRONG_PAYMENT_ID, `Invalid payment id: ${string}`>
    | WalletErrorCode<WALLET_RPC_ERROR_CODE.WRONG_ADDRESS, `Invalid address: ${string}`>
    | WalletErrorCode<
        WALLET_RPC_ERROR_CODE.WRONG_PAYMENT_ID,
        `address ${string} has integrated payment id ${string} which is incompatible with payment id ${string} that was already assigned to this transfer`
      >
    | WalletErrorCode<WALLET_RPC_ERROR_CODE.WRONG_ARGUMENT, `Given fee is too low: ${string}, minimum is: ${string}`>
  >;
  /** Return information about wallet's pre-zarcanum era outputs */
  get_bare_outs_stats: WalletMethod<
    INVOKE_RPC_GET_BARE_OUTS_STATS_REQUEST,
    INVOKE_RPC_GET_BARE_OUTS_STATS_RESPONSE,
    | WalletErrorCode<WALLET_RPC_ERROR_CODE.UNKNOWN_ERROR, `operation cannot be performed in watch-only wallet`>
    | WalletErrorCode<WALLET_RPC_ERROR_CODE.UNKNOWN_ERROR, `get_bare_unspent_outputs_stats failed`>
  >;
  /** Execute transactions needed to convert all bare(pre-zarcanum) outputs to post-zarcanum outputs */
  sweep_bare_outs: WalletMethod<
    INVOKE_RPC_SWEEP_BARE_OUTS_REQUEST,
    INVOKE_RPC_SWEEP_BARE_OUTS_RESPONSE,
    | WalletErrorCode<WALLET_RPC_ERROR_CODE.UNKNOWN_ERROR, `operation cannot be performed in watch-only wallet`>
    | WalletErrorCode<WALLET_RPC_ERROR_CODE.UNKNOWN_ERROR, `get_bare_unspent_outputs_stats failed`>
  >;
  /** Sign transaction with the wallet's keys */
  sign_transfer: WalletMethod<
    INVOKE_RPC_SIGN_TRANSFER_REQUEST,
    INVOKE_RPC_SIGN_TRANSFER_RESPONSE,
    WalletErrorCode<WALLET_RPC_ERROR_CODE.WRONG_ARGUMENT, `tx_unsigned_hex is invalid`>
  >;
  /** Relay signed transaction over the network */
  submit_transfer: WalletMethod<
    INVOKE_RPC_SUBMIT_TRANSFER_REQUEST,
    INVOKE_RPC_SUBMIT_TRANSFER_RESPONSE,
    WalletErrorCode<WALLET_RPC_ERROR_CODE.WRONG_ARGUMENT, `tx_unsigned_hex is invalid`>
  >;
  /** Search for transactions in the wallet by few parameters (legacy version) */
  search_for_transactions: WalletMethod<INVOKE_RPC_SEARCH_FOR_TRANSACTIONS_LEGACY_REQUEST, INVOKE_RPC_SEARCH_FOR_TRANSACTIONS_LEGACY_RESPONSE>;
  /** Search for transactions in the wallet by few parameters */
  search_for_transactions2: WalletMethod<INVOKE_RPC_SEARCH_FOR_TRANSACTIONS_REQUEST, INVOKE_RPC_SEARCH_FOR_TRANSACTIONS_RESPONSE>;
  /** Return wallet seed, which could be password-protected or open */
  get_restore_info: WalletMethod<INVOKE_RPC_GET_WALLET_RESTORE_INFO_REQUEST, INVOKE_RPC_GET_WALLET_RESTORE_INFO_RESPONSE>;
  /** This call is used to validate seed phrase and to fetch additional information about it */
  get_seed_phrase_info: WalletMethod<INVOKE_RPC_GET_SEED_PHRASE_INFO_REQUEST, INVOKE_RPC_GET_SEED_PHRASE_INFO_RESPONSE>;
  /** Returns wallet statistic on mining */
  get_mining_history: WalletMethod<INVOKE_RPC_GET_MINING_HISTORY_REQUEST, INVOKE_RPC_GET_MINING_HISTORY_RESPONSE>;
  /** Register an alias for the address */
  register_alias: WalletMethod<
    INVOKE_RPC_REGISTER_ALIAS_REQUEST,
    INVOKE_RPC_REGISTER_ALIAS_RESPONSE,
    | WalletErrorCode<WALLET_RPC_ERROR_CODE.WRONG_ADDRESS, 'WALLET_RPC_ERROR_CODE_WRONG_ADDRESS'>
    | WalletErrorCode<WALLET_RPC_ERROR_CODE.WRONG_ADDRESS, 'WALLET_RPC_ERROR_CODE_WRONG_ADDRESS - Wrong alias name'>
  >;
  /** Update an alias details/transfer alias ownership */
  update_alias: WalletMethod<
    INVOKE_RPC_UPDATE_ALIAS_REQUEST,
    INVOKE_RPC_UPDATE_ALIAS_RESPONSE,
    | WalletErrorCode<WALLET_RPC_ERROR_CODE.WRONG_ADDRESS, 'WALLET_RPC_ERROR_CODE_WRONG_ADDRESS'>
    | WalletErrorCode<WALLET_RPC_ERROR_CODE.WRONG_ADDRESS, 'WALLET_RPC_ERROR_CODE_WRONG_ADDRESS - Wrong alias name'>
  >;

  //contracts API
  //contracts_send_proposal: Method<INVOKE_RPC_CONTRACTS_SEND_PROPOSAL_REQUEST, INVOKE_RPC_CONTRACTS_SEND_PROPOSAL_RESPONSE>;
  //contracts_accept_proposal: Method<INVOKE_RPC_CONTRACTS_ACCEPT_PROPOSAL_REQUEST, INVOKE_RPC_CONTRACTS_ACCEPT_PROPOSAL_RESPONSE>;
  //contracts_get_all: Method<INVOKE_RPC_CONTRACTS_GET_ALL_REQUEST, INVOKE_RPC_CONTRACTS_GET_ALL_RESPONSE>;
  //contracts_release: Method<INVOKE_RPC_CONTRACTS_RELEASE_REQUEST, INVOKE_RPC_CONTRACTS_RELEASE_RESPONSE>;
  //contracts_request_cancel: Method<INVOKE_RPC_CONTRACTS_REQUEST_CANCEL_REQUEST, INVOKE_RPC_CONTRACTS_REQUEST_CANCEL_RESPONSE>;
  //contracts_accept_cancel: Method<INVOKE_RPC_CONTRACTS_ACCEPT_CANCEL_REQUEST, INVOKE_RPC_CONTRACTS_ACCEPT_CANCEL_RESPONSE>;

  //marketplace API
  /** Fetch wallet's offers listed in the marketplace with given filters */
  marketplace_get_offers_ex: WalletMethod<INVOKE_RPC_MARKETPLACE_GET_MY_OFFERS_REQUEST, INVOKE_RPC_MARKETPLACE_GET_MY_OFFERS_RESPONSE>;
  /** Creates new offer and publish it on the blockchain */
  marketplace_push_offer: WalletMethod<
    INVOKE_RPC_MARKETPLACE_PUSH_OFFER_REQUEST,
    INVOKE_RPC_MARKETPLACE_PUSH_OFFER_RESPONSE,
    WalletErrorCode<WALLET_RPC_ERROR_CODE.WRONG_ARGUMENT, 'fee is too low'>
  >;
  /** Updates existing offer that this wallet created, and publish updated version on the blockchain */
  marketplace_push_update_offer: WalletMethod<
    INVOKE_RPC_MARKETPLACE_PUSH_UPDATE_OFFER_REQUEST,
    INVOKE_RPC_MARKETPLACE_PUSH_UPDATE_OFFER_RESPONSE,
    WalletErrorCode<WALLET_RPC_ERROR_CODE.WRONG_ARGUMENT, 'fee is too low'>
  >;
  /** Cancel existing offer that this wallet created */
  marketplace_cancel_offer: WalletMethod<
    INVOKE_RPC_MARKETPLACE_CANCEL_OFFER_REQUEST,
    INVOKE_RPC_MARKETPLACE_CANCEL_OFFER_RESPONSE,
    WalletErrorCode<WALLET_RPC_ERROR_CODE.WRONG_ARGUMENT, 'fee is too low'>
  >;

  //HTLC API
  //atomics_create_htlc_proposal: Method<INVOKE_RPC_CREATE_HTLC_PROPOSAL_REQUEST, INVOKE_RPC_CREATE_HTLC_PROPOSAL_RESPONSE>;
  //atomics_get_list_of_active_htlc: Method<INVOKE_RPC_GET_LIST_OF_ACTIVE_HTLC_REQUEST, INVOKE_RPC_GET_LIST_OF_ACTIVE_HTLC_RESPONSE>;
  //atomics_redeem_htlc: Method<INVOKE_RPC_REDEEM_HTLC_REQUEST, INVOKE_RPC_REDEEM_HTLC_RESPONSE>;
  //atomics_check_htlc_redeemed: Method<INVOKE_RPC_CHECK_HTLC_REDEEMED_REQUEST, INVOKE_RPC_CHECK_HTLC_REDEEMED_RESPONSE>;

  //IONIC_SWAPS API
  /** Generates ionic swap proposal according to details provided in request */
  ionic_swap_generate_proposal: WalletMethod<
    INVOKE_RPC_IONIC_SWAP_GENERATE_PROPOSAL_REQUEST,
    INVOKE_RPC_IONIC_SWAP_GENERATE_PROPOSAL_RESPONSE,
    | WalletErrorCode<WALLET_RPC_ERROR_CODE.WRONG_ADDRESS, 'WALLET_RPC_ERROR_CODE_WRONG_ADDRESS'>
    | WalletErrorCode<WALLET_RPC_ERROR_CODE.WRONG_ADDRESS, 'WALLET_RPC_ERROR_CODE_WRONG_ADDRESS - integrated address is noit supported yet'>
    | WalletErrorCode<WALLET_RPC_ERROR_CODE.WRONG_ADDRESS, 'WALLET_RPC_ERROR_CODE_WRONG_ADDRESS - Error creating proposal'>
  >;
  /** Reads hex-encoded ionic swap proposal info, generated by other user and addressed to this wallet */
  ionic_swap_get_proposal_info: WalletMethod<
    INVOKE_RPC_IONIC_SWAP_GET_PROPOSAL_INFO_REQUEST,
    INVOKE_RPC_IONIC_SWAP_GET_PROPOSAL_INFO_RESPONSE,
    | WalletErrorCode<WALLET_RPC_ERROR_CODE.WRONG_ADDRESS, 'WALLET_RPC_ERROR_CODE_WRONG_ADDRESS - failed to parse template from hex'>
    | WalletErrorCode<WALLET_RPC_ERROR_CODE.WRONG_ADDRESS, 'WALLET_RPC_ERROR_CODE_WRONG_ADDRESS - get_ionic_swap_proposal_info'>
  >;
  /** This essential command actually execute proposal that was sent by counter party */
  ionic_swap_accept_proposal: WalletMethod<
    INVOKE_RPC_IONIC_SWAP_ACCEPT_PROPOSAL_REQUEST,
    INVOKE_RPC_IONIC_SWAP_ACCEPT_PROPOSAL_RESPONSE,
    | WalletErrorCode<WALLET_RPC_ERROR_CODE.WRONG_ADDRESS, 'WALLET_RPC_ERROR_CODE_WRONG_ADDRESS - failed to parse template from hex'>
    | WalletErrorCode<WALLET_RPC_ERROR_CODE.WRONG_ADDRESS, 'WALLET_RPC_ERROR_CODE_WRONG_ADDRESS - failed to accept_ionic_swap_proposal()'>
  >;

  // Assets API
  /** Get whitelisted assets for this wallet */
  assets_whitelist_get: WalletMethod<INVOKE_RPC_ASSETS_WHITELIST_GET_REQUEST, INVOKE_RPC_ASSETS_WHITELIST_GET_RESPONSE>;
  /** Add given asset id to local whitelist */
  assets_whitelist_add: WalletMethod<INVOKE_RPC_ASSETS_WHITELIST_ADD_REQUEST, INVOKE_RPC_ASSETS_WHITELIST_ADD_RESPONSE>;
  /** Remove given asset id from local whitelist */
  assets_whitelist_remove: WalletMethod<INVOKE_RPC_ASSETS_WHITELIST_REMOVE_REQUEST, INVOKE_RPC_ASSETS_WHITELIST_REMOVE_RESPONSE>;

  /** Deploy new asset in the system */
  deploy_asset: WalletMethod<
    INVOKE_RPC_ASSETS_DEPLOY_REQUEST,
    INVOKE_RPC_ASSETS_DEPLOY_RESPONSE,
    WalletErrorCode<WALLET_RPC_ERROR_CODE.WRONG_ARGUMENT, 'asset ticker or full_name is invalid'>
  >;
  /** Emit new coins of the asset, that is controlled by this wallet */
  emit_asset: WalletMethod<INVOKE_RPC_ASSETS_EMIT_REQUEST, INVOKE_RPC_ASSETS_EMIT_RESPONSE>;
  /** Update asset descriptor */
  update_asset: WalletMethod<INVOKE_RPC_ASSETS_UPDATE_REQUEST, INVOKE_RPC_ASSETS_UPDATE_RESPONSE>;
  /** Burn some owned amount of the coins for the given asset */
  burn_asset: WalletMethod<INVOKE_RPC_ASSETS_BURN_REQUEST, INVOKE_RPC_ASSETS_BURN_RESPONSE>;
  /** Inserts externally made asset ownership signature into the given transaction and broadcasts it */
  send_ext_signed_asset_tx: WalletMethod<
    INVOKE_RPC_ASSET_SEND_EXT_SIGNED_TX_REQUEST,
    INVOKE_RPC_ASSET_SEND_EXT_SIGNED_TX_RESPONSE,
    | WalletErrorCode<WALLET_RPC_ERROR_CODE.WRONG_ARGUMENT, "finalized_tx couldn't be deserialized">
    | WalletErrorCode<WALLET_RPC_ERROR_CODE.WRONG_ARGUMENT, "unsigned_tx doesn't match finalized_tx">
    | WalletErrorCode<WALLET_RPC_ERROR_CODE.WRONG_ARGUMENT, `expected_tx_id mismatch, real tx id is ${string}`>
  >;
  /** Attach asset descripto to this wallet instance, if asset descripto attached then ADO operations to this asset can be performed using API of this wallet. */
  attach_asset_descriptor: WalletMethod<INVOKE_RPC_ATTACH_ASSET_DESCRIPTOR_REQUEST, INVOKE_RPC_ATTACH_ASSET_DESCRIPTOR_RESPONSE>;
  /** Transfer asset ownership to new public key. */
  transfer_asset_ownership: WalletMethod<INVOKE_RPC_TRANSFER_ASSET_OWNERSHIP_REQUEST, INVOKE_RPC_TRANSFER_ASSET_OWNERSHIP_RESPONSE>;

  //MULTIWALLET APIs
  /** Get loaded wallets list, useful for multi-wallet API */
  mw_get_wallets: WalletMethod<
    INVOKE_RPC_MW_GET_WALLETS_REQUEST,
    INVOKE_RPC_MW_GET_WALLETS_RESPONSE,
    WalletErrorCode<WALLET_RPC_ERROR_CODE.UNKNOWN_ERROR, 'WALLET_RPC_ERROR_CODE_UNKNOWN_ERROR'>
  >;
  /** Select current active wallet */
  mw_select_wallet: WalletMethod<
    INVOKE_RPC_MW_SELECT_WALLET_REQUEST,
    INVOKE_RPC_MW_SELECT_WALLET_RESPONSE,
    WalletErrorCode<WALLET_RPC_ERROR_CODE.UNKNOWN_ERROR, 'WALLET_RPC_ERROR_CODE_UNKNOWN_ERROR'>
  >;

  //basic crypto operations
  /** Trivially sign base64 encoded data message using wallet spend key */
  sign_message: WalletMethod<INVOKE_RPC_SIGN_MESSAGE_REQUEST, INVOKE_RPC_SIGN_MESSAGE_RESPONSE>;
  /** Trivially encrypt base64 encoded data message with chacha using wallet spend key */
  encrypt_data: WalletMethod<INVOKE_RPC_ENCRYPT_DATA_REQUEST, INVOKE_RPC_ENCRYPT_DATA_RESPONSE>;
  /** Trivially decrypt base64 encoded data message with chacha using wallet spend key */
  decrypt_data: WalletMethod<INVOKE_RPC_DECRYPT_DATA_REQUEST, INVOKE_RPC_DECRYPT_DATA_RESPONSE>;

  //utility call
  // /**
  //  * Proxy call to daemon(node)
  //  * @deprecated use sync_call#proxy_to_daemon
  //  */
  // proxy_to_daemon: Method<INVOKE_RPC_PROXY_TO_DAEMON_REQUEST, INVOKE_RPC_PROXY_TO_DAEMON_RESPONSE>;
}
