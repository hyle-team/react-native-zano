#pragma once

#include "HybridWalletRpcSpec.hpp"
#include <jsi/jsi.h>

#define DECLARE_METHOD(name) std::string name(double instance_id, const std::string &params) override
#define DECLARE_ASYNC_METHOD(name) std::shared_ptr<Promise<std::string>> name(double instance_id, const std::string &params) override

namespace margelo::nitro::zano {

class WalletRpc : public HybridWalletRpcSpec
{
public:
  WalletRpc() : HybridObject(TAG) {}

private:
  uint64_t _next_id = 0;
  uint64_t next_id();

public:
  DECLARE_METHOD(getbalance);
  DECLARE_METHOD(getaddress);
  DECLARE_METHOD(get_wallet_info);
  DECLARE_METHOD(get_recent_txs_and_info);
  DECLARE_METHOD(get_recent_txs_and_info2);
  DECLARE_METHOD(transfer);
  DECLARE_METHOD(store);
  DECLARE_METHOD(get_payments);
  DECLARE_METHOD(get_bulk_payments);
  DECLARE_METHOD(make_integrated_address);
  DECLARE_METHOD(split_integrated_address);
  DECLARE_METHOD(sweep_below);
  DECLARE_METHOD(get_bare_outs_stats);
  DECLARE_METHOD(sweep_bare_outs);
  DECLARE_METHOD(sign_transfer);
  DECLARE_METHOD(submit_transfer);
  DECLARE_METHOD(search_for_transactions);
  DECLARE_METHOD(search_for_transactions2);
  DECLARE_METHOD(get_restore_info);
  DECLARE_METHOD(get_seed_phrase_info);
  DECLARE_METHOD(get_mining_history);
  DECLARE_METHOD(register_alias);
  DECLARE_METHOD(update_alias);
  // DECLARE_METHOD(contracts_send_proposal);
  // DECLARE_METHOD(contracts_accept_proposal);
  // DECLARE_METHOD(contracts_get_all);
  // DECLARE_METHOD(contracts_release);
  // DECLARE_METHOD(contracts_request_cancel);
  // DECLARE_METHOD(contracts_accept_cancel);
  DECLARE_METHOD(marketplace_get_offers_ex);
  DECLARE_METHOD(marketplace_push_offer);
  DECLARE_METHOD(marketplace_push_update_offer);
  DECLARE_METHOD(marketplace_cancel_offer);
  // DECLARE_METHOD(atomics_create_htlc_proposal);
  // DECLARE_METHOD(atomics_get_list_of_active_htlc);
  // DECLARE_METHOD(atomics_redeem_htlc);
  // DECLARE_METHOD(atomics_check_htlc_redeemed);
  DECLARE_METHOD(ionic_swap_generate_proposal);
  DECLARE_METHOD(ionic_swap_get_proposal_info);
  DECLARE_METHOD(ionic_swap_accept_proposal);
  DECLARE_METHOD(assets_whitelist_get);
  DECLARE_METHOD(assets_whitelist_add);
  DECLARE_METHOD(assets_whitelist_remove);
  DECLARE_METHOD(deploy_asset);
  DECLARE_METHOD(emit_asset);
  DECLARE_METHOD(update_asset);
  DECLARE_METHOD(burn_asset);
  DECLARE_METHOD(send_ext_signed_asset_tx);
  DECLARE_METHOD(attach_asset_descriptor);
  DECLARE_METHOD(transfer_asset_ownership);
  DECLARE_METHOD(mw_get_wallets);
  DECLARE_METHOD(mw_select_wallet);
  DECLARE_METHOD(sign_message);
  DECLARE_METHOD(encrypt_data);
  DECLARE_METHOD(decrypt_data);
  // DECLARE_METHOD(proxy_to_daemon);
};

#undef DECLARE_METHOD

} // namespace margelo::nitro::zano
