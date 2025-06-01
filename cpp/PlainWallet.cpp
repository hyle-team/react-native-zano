#include "PlainWallet.hpp"
#include "plain_wallet_api.h"

// ...existing code...
#define NO_MACRO(WHAT, X)
#define FE_1(WHAT, X, ...) WHAT(X)
#define FE_2(WHAT, X, ...) WHAT(X),FE_1(WHAT, __VA_ARGS__)
#define FE_3(WHAT, X, ...) WHAT(X),FE_2(WHAT, __VA_ARGS__)
#define FE_4(WHAT, X, ...) WHAT(X),FE_3(WHAT, __VA_ARGS__)
#define FE_5(WHAT, X, ...) WHAT(X),FE_4(WHAT, __VA_ARGS__)
#define FE_GET_MACRO(_0, _1,_2,_3,_4,_5,NAME,...) NAME
#define FOR_EACH(action, ...) \
  FE_GET_MACRO(__VA_ARGS__,FE_5,FE_4,FE_3,FE_2,FE_1, NO_MACRO)(action,__VA_ARGS__)

#define PRINT_CAST_IMPL(type, name, cast) cast
#define PRINT_CAST(param) PRINT_CAST_IMPL param

#define PRINT_PARAM_IMPL(type, name, ...) type name
#define PRINT_PARAM(param) PRINT_PARAM_IMPL param

#define DEFINE_PROXY_METHOD(result, name, ...) result PlainWallet::name(FOR_EACH(PRINT_PARAM, __VA_ARGS__)) { \
  return plain_wallet::name(FOR_EACH(PRINT_CAST, __VA_ARGS__)); \
}
#define DEFINE_PROXY_ASYNC_METHOD(result, name, ...) std::shared_ptr<Promise<result>> PlainWallet::name(FOR_EACH(PRINT_PARAM, __VA_ARGS__)) { \
  return Promise<result>::async([&]() { \
    return plain_wallet::name(FOR_EACH(PRINT_CAST, __VA_ARGS__)); \
  }); \
}

namespace margelo::nitro::zano {

  DEFINE_PROXY_METHOD(std::string, init, (const std::string &, address, address), (const std::string &, working_dir, working_dir), (ZanoLogLevel, log_level, static_cast<int>(log_level)),)
  DEFINE_PROXY_METHOD(std::string, reset,)
  DEFINE_PROXY_METHOD(std::string, set_log_level, (ZanoLogLevel, log_level, static_cast<int>(log_level)),)
  DEFINE_PROXY_METHOD(std::string, get_version,)
  DEFINE_PROXY_METHOD(std::string, get_wallet_files,)
  DEFINE_PROXY_METHOD(std::string, get_export_private_info, (const std::string &, target_dir, target_dir),)
  DEFINE_PROXY_METHOD(std::string, delete_wallet, (const std::string &, file_name, file_name),)
  DEFINE_PROXY_METHOD(std::string, get_address_info, (const std::string &, addr, addr),)

  DEFINE_PROXY_METHOD(std::string, get_appconfig, (const std::string &, encryption_key, encryption_key),)
  DEFINE_PROXY_METHOD(std::string, set_appconfig, (const std::string &, conf_str, conf_str), (const std::string &, encryption_key, encryption_key),)
  DEFINE_PROXY_METHOD(std::string, generate_random_key, (double, length, length),)
  DEFINE_PROXY_ASYNC_METHOD(std::string, get_logs_buffer,)
  DEFINE_PROXY_METHOD(std::string, truncate_log,)
  DEFINE_PROXY_METHOD(std::string, get_connectivity_status,)

  DEFINE_PROXY_METHOD(std::string, open, (const std::string &, path, path), (const std::string &, password, password),)
  DEFINE_PROXY_METHOD(std::string, restore, (const std::string &, seed, seed), (const std::string &, path, path), (const std::string &, password, password), (const std::string &, seed_password, seed_password),)
  DEFINE_PROXY_METHOD(std::string, generate, (const std::string &, path, path), (const std::string &, password, password),)
  DEFINE_PROXY_METHOD(std::string, get_opened_wallets,)

  DEFINE_PROXY_METHOD(std::string, get_wallet_status, (double, instance_id, static_cast<plain_wallet::hwallet>(instance_id)),)
  DEFINE_PROXY_METHOD(std::string, close_wallet, (double, instance_id, static_cast<plain_wallet::hwallet>(instance_id)),)

  // cake wallet api extension
  DEFINE_PROXY_METHOD(bool, is_wallet_exist, (const std::string &, path, path),)
  DEFINE_PROXY_METHOD(std::string, get_wallet_info, (double, instance_id, static_cast<plain_wallet::hwallet>(instance_id)),)
  DEFINE_PROXY_METHOD(std::string, reset_wallet_password, (double, instance_id, static_cast<plain_wallet::hwallet>(instance_id)), (const std::string &, password, password),)
  DEFINE_PROXY_METHOD(double, get_current_tx_fee, (ZanoPriority, priority, static_cast<uint64_t>(priority)),)

  std::string PlainWallet::get_seed_phrase_info(double instance_id, const std::string &params) {
    return plain_wallet::sync_call("get_seed_phrase_info", static_cast<uint64_t>(instance_id), params);
  }

  std::string PlainWallet::reset_connection_url(const std::string &address) {
    return plain_wallet::sync_call("reset_connection_url", 0, address);
  }

} // namespace margelo::nitro::zano
