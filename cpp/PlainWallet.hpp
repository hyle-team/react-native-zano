#pragma once

#include "HybridPlainWalletSpec.hpp"
#include <jsi/jsi.h>

namespace margelo::nitro::zano {

class PlainWallet : public HybridPlainWalletSpec {
public:
  PlainWallet() : HybridObject(TAG) {
  }

public:
#define PROXY_METHOD(return_type, name, ...) return_type##Return name(FOR_EACH(PRINT_PARAM, __VA_ARGS__)) override;
#define PROXY_ASYNC_METHOD(return_type, name, ...) std::shared_ptr<Promise<return_type##Return>> name(FOR_EACH(PRINT_PARAM, __VA_ARGS__)) override;
#define SYNC_CALL_METHOD(return_type, name, ...) return_type##Return name(FOR_EACH(PRINT_PARAM, __VA_ARGS__)) override;

#include "PlainWalletTypes.hpp"

#include "PlainWalletCodegen.hpp"
};

} // namespace margelo::nitro::zano
