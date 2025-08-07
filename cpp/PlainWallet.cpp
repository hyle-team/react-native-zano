#include "PlainWallet.hpp"
#include "plain_wallet_api.h"

#define NO_MACRO(WHAT, X)
#define FE_1(WHAT, X, ...) WHAT(X)
#define FE_2(WHAT, X, ...) WHAT(X),FE_1(WHAT, __VA_ARGS__)
#define FE_3(WHAT, X, ...) WHAT(X),FE_2(WHAT, __VA_ARGS__)
#define FE_4(WHAT, X, ...) WHAT(X),FE_3(WHAT, __VA_ARGS__)
#define FE_5(WHAT, X, ...) WHAT(X),FE_4(WHAT, __VA_ARGS__)
#define FE_GET_MACRO(_0, _1,_2,_3,_4,_5,NAME,...) NAME
#define FOR_EACH(action, ...) \
  FE_GET_MACRO(__VA_ARGS__,FE_5,FE_4,FE_3,FE_2,FE_1, NO_MACRO)(action,__VA_ARGS__)

#define PRINT_CAST_IMPL(type, name) type##ParamCast(name)
#define PRINT_CAST(param) PRINT_CAST_IMPL param

#define PRINT_PARAM_IMPL(type, name) type##Param name
#define PRINT_PARAM(param) PRINT_PARAM_IMPL param

#define DEFINE_PROXY_METHOD(return_type, name, ...)                                                                                                  \
  return_type##Return PlainWallet::name(FOR_EACH(PRINT_PARAM, __VA_ARGS__)) {                                                                        \
    return return_type##ReturnCast(plain_wallet::name(FOR_EACH(PRINT_CAST, __VA_ARGS__)));                                                           \
  }
#define DEFINE_PROXY_ASYNC_METHOD(return_type, name, ...)                                                                                            \
  std::shared_ptr<Promise<return_type##Return>> PlainWallet::name(FOR_EACH(PRINT_PARAM, __VA_ARGS__)) {                                              \
    return Promise<return_type##Return>::async([=]() { return return_type##ReturnCast(plain_wallet::name(FOR_EACH(PRINT_CAST, __VA_ARGS__))); });    \
  }
#define DEFINE_SYNC_CALL_METHOD(return_type, name, ...)                                                                                              \
  return_type##Return PlainWallet::name(FOR_EACH(PRINT_PARAM, __VA_ARGS__)) {                                                                    \
    return return_type##ReturnCast(plain_wallet::sync_call(#name, 0, FOR_EACH(PRINT_CAST, __VA_ARGS__)));                                            \
  }

#define StringReturn std::string
#define StringReturnCast(expression) expression
#define StringParam const std::string &
#define StringParamCast(expression) expression

#define BoolReturn bool
#define BoolReturnCast(expression) expression

#define IntReturn double
#define IntReturnCast(expression) expression

#define DoubleParam double
#define DoubleParamCast(expression) expression

#define SizeParam double
#define SizeParamCast(expression) expression

#define HWalletParam double
#define HWalletParamCast(expression) static_cast<plain_wallet::hwallet>(expression)

#define ZanoLogLevelParam ZanoLogLevel
#define ZanoLogLevelParamCast(expression) static_cast<int>(expression)

#define ZanoPriorityParam ZanoPriority
#define ZanoPriorityParamCast(expression) static_cast<int>(expression)

namespace margelo::nitro::zano {
  DEFINE_PROXY_ASYNC_METHOD(String, init, (String, host), (String, port), (String, working_dir), (ZanoLogLevel, log_level), )
  DEFINE_PROXY_METHOD(String, reset, )
  DEFINE_PROXY_METHOD(String, set_log_level, (ZanoLogLevel, log_level), )
  DEFINE_PROXY_METHOD(String, get_version, )
  DEFINE_PROXY_ASYNC_METHOD(String, get_wallet_files, )
  DEFINE_PROXY_ASYNC_METHOD(String, get_export_private_info, (String, target_dir), )
  DEFINE_PROXY_METHOD(String, delete_wallet, (String, file_name), )
  DEFINE_PROXY_METHOD(String, get_address_info, (String, addr), )

  DEFINE_PROXY_METHOD(String, get_appconfig, (String, encryption_key), )
  DEFINE_PROXY_METHOD(String, set_appconfig, (String, conf_str), (String, encryption_key), )
  DEFINE_PROXY_METHOD(String, generate_random_key, (Size, length), )
  DEFINE_PROXY_ASYNC_METHOD(String, get_logs_buffer, )
  DEFINE_PROXY_ASYNC_METHOD(String, truncate_log, )
  DEFINE_PROXY_METHOD(String, get_connectivity_status, )

  DEFINE_PROXY_ASYNC_METHOD(String, open, (String, path), (String, password), )
  DEFINE_PROXY_ASYNC_METHOD(String, restore, (String, seed), (String, path), (String, password), (String, seed_password), )
  DEFINE_PROXY_ASYNC_METHOD(String, generate, (String, path), (String, password), )
  DEFINE_PROXY_ASYNC_METHOD(String, get_opened_wallets, )

  DEFINE_PROXY_METHOD(String, get_wallet_status, (HWallet, instance_id), )
  DEFINE_PROXY_ASYNC_METHOD(String, close_wallet, (HWallet, instance_id), )

  // cake wallet api extension
  DEFINE_PROXY_METHOD(Bool, is_wallet_exist, (String, path), )
  DEFINE_PROXY_METHOD(String, get_wallet_info, (HWallet, instance_id), )
  DEFINE_PROXY_METHOD(String, reset_wallet_password, (HWallet, instance_id), (String, password), )
  DEFINE_PROXY_METHOD(Int, get_current_tx_fee, (ZanoPriority, priority), )

  DEFINE_SYNC_CALL_METHOD(String, get_seed_phrase_info, (String, params), )
  DEFINE_SYNC_CALL_METHOD(String, reset_connection_url, (String, address), )

} // namespace margelo::nitro::zano
