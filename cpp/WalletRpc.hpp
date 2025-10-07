#pragma once

#include "HybridWalletRpcSpec.hpp"
#include <jsi/jsi.h>

namespace margelo::nitro::zano {

class WalletRpc : public HybridWalletRpcSpec {
public:
  WalletRpc() : HybridObject(TAG) {
  }

private:
  uint64_t _next_id = 0;
  uint64_t next_id();

public:
#define WALLET_METHOD(name) std::string name(double instance_id, const std::string &params) override;
#define WALLET_ASYNC_METHOD(name) std::shared_ptr<Promise<std::string>> name(double instance_id, const std::string &params) override;
#include "WalletRpcCodeGen.hpp"
};

} // namespace margelo::nitro::zano
