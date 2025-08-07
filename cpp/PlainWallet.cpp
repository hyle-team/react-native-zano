#include "PlainWallet.hpp"
#include "plain_wallet_api.h"

namespace margelo::nitro::zano {
  #define PROXY_METHOD(return_type, name, ...)                                                                                                  \
    return_type##Return PlainWallet::name(FOR_EACH(PRINT_PARAM, __VA_ARGS__)) {                                                                        \
      return return_type##ReturnCast(plain_wallet::name(FOR_EACH(PRINT_CAST, __VA_ARGS__)));                                                           \
    }
  #define PROXY_ASYNC_METHOD(return_type, name, ...)                                                                                            \
    std::shared_ptr<Promise<return_type##Return>> PlainWallet::name(FOR_EACH(PRINT_PARAM, __VA_ARGS__)) {                                              \
      return Promise<return_type##Return>::async([=]() { return return_type##ReturnCast(plain_wallet::name(FOR_EACH(PRINT_CAST, __VA_ARGS__))); });    \
    }
  #define SYNC_CALL_METHOD(return_type, name, ...)                                                                                              \
    return_type##Return PlainWallet::name(FOR_EACH(PRINT_PARAM, __VA_ARGS__)) {                                                                    \
      return return_type##ReturnCast(plain_wallet::sync_call(#name, 0, FOR_EACH(PRINT_CAST, __VA_ARGS__)));                                            \
    }

  #include "PlainWalletCodeTypes.hpp"

  #include "PlainWalletCodeGen.hpp"

} // namespace margelo::nitro::zano
