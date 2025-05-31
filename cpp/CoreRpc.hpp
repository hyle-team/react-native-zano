#pragma once

#include "HybridCoreRpcSpec.hpp"
#include <jsi/jsi.h>

#define DECLARE_METHOD(name) std::shared_ptr<Promise<std::string>> name(const std::string &params) override

namespace margelo::nitro::zano {

class CoreRpc : public HybridCoreRpcSpec
{
public:
  CoreRpc() : HybridObject(TAG) {}

private:
  uint64_t _next_id = 0;
  uint64_t next_id();

public:
  std::string base64_encode(const std::string &data) override;
  std::string base64_decode(const std::string &data) override;

  DECLARE_METHOD(getblockcount);
  DECLARE_METHOD(on_getblockhash);
  DECLARE_METHOD(getblocktemplate);
  DECLARE_METHOD(submitblock);
  DECLARE_METHOD(submitblock2);
  DECLARE_METHOD(getlastblockheader);
  DECLARE_METHOD(getblockheaderbyhash);
  DECLARE_METHOD(getblockheaderbyheight);
  DECLARE_METHOD(get_alias_details);
  DECLARE_METHOD(get_alias_by_address);
  DECLARE_METHOD(get_alias_reward);
  DECLARE_METHOD(get_est_height_from_date);
  DECLARE_METHOD(find_outs_in_recent_blocks);
  DECLARE_METHOD(get_blocks_details);
  DECLARE_METHOD(get_tx_details);
  DECLARE_METHOD(search_by_id);
  DECLARE_METHOD(getinfo);
  DECLARE_METHOD(get_out_info);
  DECLARE_METHOD(get_multisig_info);
  DECLARE_METHOD(get_all_alias_details);
  DECLARE_METHOD(get_aliases);
  DECLARE_METHOD(get_pool_txs_details);
  DECLARE_METHOD(get_pool_txs_brief_details);
  DECLARE_METHOD(get_all_pool_tx_list);
  DECLARE_METHOD(get_pool_info);
  DECLARE_METHOD(getrandom_outs);
  DECLARE_METHOD(getrandom_outs1);
  DECLARE_METHOD(getrandom_outs3);
  DECLARE_METHOD(get_votes);
  DECLARE_METHOD(get_asset_info);
  DECLARE_METHOD(get_assets_list);
  DECLARE_METHOD(decrypt_tx_details);
  DECLARE_METHOD(get_main_block_details);
  DECLARE_METHOD(get_alt_block_details);
  DECLARE_METHOD(get_alt_blocks_details);
  DECLARE_METHOD(reset_transaction_pool);
  DECLARE_METHOD(remove_tx_from_pool);
  DECLARE_METHOD(get_current_core_tx_expiration_median);
  DECLARE_METHOD(marketplace_global_get_offers_ex);
  DECLARE_METHOD(validate_signature);
};

#undef DECLARE_METHOD

} // namespace margelo::nitro::zano
