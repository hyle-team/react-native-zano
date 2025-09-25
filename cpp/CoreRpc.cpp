#include "CoreRpc.hpp"
#include "plain_wallet_api.h"
#include <string>

namespace epee::string_encoding {
inline std::string base64_encode(const unsigned char *bytes_to_encode, size_t in_len);
inline std::string base64_decode(std::string const &encoded_string);
} // namespace epee::string_encoding

namespace margelo::nitro::zano {

uint64_t CoreRpc::next_id() {
  if (_next_id == std::numeric_limits<decltype(_next_id)>::max()) {
    _next_id = 0;
  }
  return _next_id++;
}

std::string CoreRpc::base64_encode(const std::string &data) {
  return epee::string_encoding::base64_encode((unsigned char const *)data.data(), data.size());
}

std::string CoreRpc::base64_decode(std::string const &data) {
  return epee::string_encoding::base64_decode(data);
}

#define CORE_METHOD(name)                                                                                                                            \
  std::shared_ptr<Promise<std::string>> CoreRpc::name(const std::string &params) {                                                                   \
    return Promise<std::string>::async([this, params]() {                                                                                            \
      std::stringstream request, json;                                                                                                               \
      request << "{ \"jsonrpc\": \"2.0\", \"id\": " << next_id() << ", \"method\": \"" << #name << "\", \"params\": " << params << " }";             \
      json << "{ \"uri\": \"/json_rpc\", \"base64_body\": \"" << this->base64_encode(request.str()) << "\" }";                                       \
      return plain_wallet::sync_call("proxy_to_daemon", 0, json.str());                                                                              \
    });                                                                                                                                              \
  }
#include "CoreRpcCodegen.hpp"

} // namespace margelo::nitro::zano
