#pragma once

#include "HybridCoreRpcSpec.hpp"
#include <jsi/jsi.h>

namespace margelo::nitro::zano {

class CoreRpc : public HybridCoreRpcSpec {
public:
  CoreRpc() : HybridObject(TAG) {
  }

private:
  uint64_t _next_id = 0;
  uint64_t next_id();

public:
  std::string base64_encode(const std::string &data) override;
  std::string base64_decode(const std::string &data) override;

#define CORE_METHOD(name) std::shared_ptr<Promise<std::string>> name(const std::string &params) override;
#include "CoreRpcCodegen.hpp"
};

#undef DECLARE_METHOD

} // namespace margelo::nitro::zano
