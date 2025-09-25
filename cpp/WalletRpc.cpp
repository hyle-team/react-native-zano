#include "WalletRpc.hpp"
#include "plain_wallet_api.h"
#include <limits>

namespace margelo::nitro::zano {

uint64_t WalletRpc::next_id() {
  if (_next_id == std::numeric_limits<decltype(_next_id)>::max()) {
    _next_id = 0;
  }
  return _next_id++;
}

#define WALLET_METHOD(name)                                                                                                                          \
  std::string WalletRpc::name(double instance_id, const std::string &params) {                                                                       \
    std::stringstream json;                                                                                                                          \
    json << "{ \"jsonrpc\": \"2.0\", \"id\": " << next_id() << ", \"method\": \"" << #name << "\", \"params\": " << params << " }";                  \
    return plain_wallet::invoke(static_cast<plain_wallet::hwallet>(instance_id), json.str());                                                        \
  }
#define WALLET_ASYNC_METHOD(name)                                                                                                                    \
  std::shared_ptr<Promise<std::string>> WalletRpc::name(double instance_id, const std::string &params) {                                             \
    return Promise<std::string>::async([instance_id, params]() {                                                                                     \
      std::stringstream json;                                                                                                                        \
      json << "{ \"jsonrpc\": \"2.0\", \"id\": " << next_id() << ", \"method\": \"" << #name << "\", \"params\": " << params << " }";                \
      return plain_wallet::invoke(static_cast<plain_wallet::hwallet>(instance_id), json.str());                                                      \
    });                                                                                                                                              \
  }
#include "WalletRpcCodegen.hpp"

} // namespace margelo::nitro::zano
