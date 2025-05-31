#include <string>
#include "CoreRpc.hpp"
#include "plain_wallet_api.h"

namespace epee::string_encoding {
  inline std::string base64_encode(const unsigned char *bytes_to_encode, size_t in_len);
  inline std::string base64_decode(std::string const &encoded_string);
}

#define DEFINE_METHOD(method) std::shared_ptr<Promise<std::string>> CoreRpc::method(const std::string &params) { \
    return Promise<std::string>::async([&]() { \
      std::stringstream request, json; \
      request << "{ \"jsonrpc\": \"2.0\", \"id\": " << next_id() << ", \"method\": \"" << #method << "\", \"params\": \"" << params << "\" }"; \
      json << "{ \"uri\": \"/json_rpc\", \"base64_body\": " << this->base64_encode(request.str()) << " }"; \
      return plain_wallet::sync_call("proxy_to_daemon", 0, json.str()); \
    }); \
  }

namespace margelo::nitro::zano {

  uint64_t CoreRpc::next_id() {
    if (_next_id == std::numeric_limits<decltype(_next_id)>::max()) {
      _next_id = 0;
    }
    return _next_id++;
  }

  std::string CoreRpc::base64_encode(const std::string &data) {
    return epee::string_encoding::base64_encode((unsigned char const*)data.data(), data.size());
  }

  std::string CoreRpc::base64_decode(std::string const &data) {
    return epee::string_encoding::base64_decode(data);
  }

  DEFINE_METHOD(getblockcount);
  DEFINE_METHOD(on_getblockhash);
  DEFINE_METHOD(getblocktemplate);
  DEFINE_METHOD(submitblock);
  DEFINE_METHOD(submitblock2);
  DEFINE_METHOD(getlastblockheader);
  DEFINE_METHOD(getblockheaderbyhash);
  DEFINE_METHOD(getblockheaderbyheight);
  DEFINE_METHOD(get_alias_details);
  DEFINE_METHOD(get_alias_by_address);
  DEFINE_METHOD(get_alias_reward);
  DEFINE_METHOD(get_est_height_from_date);
  DEFINE_METHOD(find_outs_in_recent_blocks);
  DEFINE_METHOD(get_blocks_details);
  DEFINE_METHOD(get_tx_details);
  DEFINE_METHOD(search_by_id);
  DEFINE_METHOD(getinfo);
  DEFINE_METHOD(get_out_info);
  DEFINE_METHOD(get_multisig_info);
  DEFINE_METHOD(get_all_alias_details);
  DEFINE_METHOD(get_aliases);
  DEFINE_METHOD(get_pool_txs_details);
  DEFINE_METHOD(get_pool_txs_brief_details);
  DEFINE_METHOD(get_all_pool_tx_list);
  DEFINE_METHOD(get_pool_info);
  DEFINE_METHOD(getrandom_outs);
  DEFINE_METHOD(getrandom_outs1);
  DEFINE_METHOD(getrandom_outs3);
  DEFINE_METHOD(get_votes);
  DEFINE_METHOD(get_asset_info);
  DEFINE_METHOD(get_assets_list);
  DEFINE_METHOD(decrypt_tx_details);
  DEFINE_METHOD(get_main_block_details);
  DEFINE_METHOD(get_alt_block_details);
  DEFINE_METHOD(get_alt_blocks_details);
  DEFINE_METHOD(reset_transaction_pool);
  DEFINE_METHOD(remove_tx_from_pool);
  DEFINE_METHOD(get_current_core_tx_expiration_median);
  DEFINE_METHOD(marketplace_global_get_offers_ex);
  DEFINE_METHOD(validate_signature);

} // namespace margelo::nitro::zano
