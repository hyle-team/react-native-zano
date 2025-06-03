#include <limits>
#include "WalletRpc.hpp"
#include "plain_wallet_api.h"

#define DEFINE_METHOD(method) std::string WalletRpc::method(double instance_id, const std::string &params) { \
    std::stringstream json; \
    json << "{ \"jsonrpc\": \"2.0\", \"id\": " << next_id() << ", \"method\": \"" << #method << "\", \"params\": " << params << " }"; \
    return plain_wallet::invoke(static_cast<plain_wallet::hwallet>(instance_id), json.str()); \
  }
#define DEFINE_ASYNC_METHOD(method) std::shared_ptr<Promise<std::string>> WalletRpc::method(double instance_id, const std::string &params) { \
    return Promise<result>::async([=]() { \
      std::stringstream json; \
      json << "{ \"jsonrpc\": \"2.0\", \"id\": " << next_id() << ", \"method\": \"" << #method << "\", \"params\": " << params << " }"; \
      return plain_wallet::invoke(static_cast<plain_wallet::hwallet>(instance_id), json.str()); \
    }); \
  }

namespace margelo::nitro::zano {

  uint64_t WalletRpc::next_id() {
    if (_next_id == std::numeric_limits<decltype(_next_id)>::max()) {
      _next_id = 0;
    }
    return _next_id++;
  }

  DEFINE_METHOD(getbalance)
  DEFINE_METHOD(getaddress)
  DEFINE_METHOD(get_wallet_info)
  DEFINE_METHOD(get_recent_txs_and_info)
  DEFINE_METHOD(get_recent_txs_and_info2)
  DEFINE_METHOD(transfer)
  DEFINE_METHOD(store)
  DEFINE_METHOD(get_payments)
  DEFINE_METHOD(get_bulk_payments)
  DEFINE_METHOD(make_integrated_address)
  DEFINE_METHOD(split_integrated_address)
  DEFINE_METHOD(sweep_below)
  DEFINE_METHOD(get_bare_outs_stats)
  DEFINE_METHOD(sweep_bare_outs)
  DEFINE_METHOD(sign_transfer)
  DEFINE_METHOD(submit_transfer)
  DEFINE_METHOD(search_for_transactions)
  DEFINE_METHOD(search_for_transactions2)
  DEFINE_METHOD(get_restore_info)
  DEFINE_METHOD(get_seed_phrase_info)
  DEFINE_METHOD(get_mining_history)
  DEFINE_METHOD(register_alias)
  DEFINE_METHOD(update_alias)
  // DEFINE_METHOD(contracts_send_proposal)
  // DEFINE_METHOD(contracts_accept_proposal)
  // DEFINE_METHOD(contracts_get_all)
  // DEFINE_METHOD(contracts_release)
  // DEFINE_METHOD(contracts_request_cancel)
  // DEFINE_METHOD(contracts_accept_cancel)
  DEFINE_METHOD(marketplace_get_offers_ex)
  DEFINE_METHOD(marketplace_push_offer)
  DEFINE_METHOD(marketplace_push_update_offer)
  DEFINE_METHOD(marketplace_cancel_offer)
  // DEFINE_METHOD(atomics_create_htlc_proposal)
  // DEFINE_METHOD(atomics_get_list_of_active_htlc)
  // DEFINE_METHOD(atomics_redeem_htlc)
  // DEFINE_METHOD(atomics_check_htlc_redeemed)
  DEFINE_METHOD(ionic_swap_generate_proposal)
  DEFINE_METHOD(ionic_swap_get_proposal_info)
  DEFINE_METHOD(ionic_swap_accept_proposal)
  DEFINE_METHOD(assets_whitelist_get)
  DEFINE_METHOD(assets_whitelist_add)
  DEFINE_METHOD(assets_whitelist_remove)
  DEFINE_METHOD(deploy_asset)
  DEFINE_METHOD(emit_asset)
  DEFINE_METHOD(update_asset)
  DEFINE_METHOD(burn_asset)
  DEFINE_METHOD(send_ext_signed_asset_tx)
  DEFINE_METHOD(attach_asset_descriptor)
  DEFINE_METHOD(transfer_asset_ownership)
  DEFINE_METHOD(mw_get_wallets)
  DEFINE_METHOD(mw_select_wallet)
  DEFINE_METHOD(sign_message)
  DEFINE_METHOD(encrypt_data)
  DEFINE_METHOD(decrypt_data)
  // DEFINE_METHOD(proxy_to_daemon)

} // namespace margelo::nitro::zano
