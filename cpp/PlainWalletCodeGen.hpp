#define NO_MACRO(WHAT, X)
#define FE_1(WHAT, X, ...) WHAT(X)
#define FE_2(WHAT, X, ...) WHAT(X), FE_1(WHAT, __VA_ARGS__)
#define FE_3(WHAT, X, ...) WHAT(X), FE_2(WHAT, __VA_ARGS__)
#define FE_4(WHAT, X, ...) WHAT(X), FE_3(WHAT, __VA_ARGS__)
#define FE_5(WHAT, X, ...) WHAT(X), FE_4(WHAT, __VA_ARGS__)
#define FE_6(WHAT, X, ...) WHAT(X), FE_5(WHAT, __VA_ARGS__)
#define FE_GET_MACRO(_0, _1, _2, _3, _4, _5, _6, NAME, ...) NAME
#define FOR_EACH(action, ...) FE_GET_MACRO(__VA_ARGS__, FE_6, FE_5, FE_4, FE_3, FE_2, FE_1, NO_MACRO)(action, __VA_ARGS__)

#define PRINT_CAST_IMPL(type, name) type##ParamCast(name)
#define PRINT_CAST(param) PRINT_CAST_IMPL param

#define PRINT_PARAM_IMPL(type, name) type##Param name
#define PRINT_PARAM(param) PRINT_PARAM_IMPL param

#define PRINT_NAMES_IMPL(type, name) name
#define PRINT_NAMES(param) PRINT_NAMES_IMPL param

PROXY_ASYNC_METHOD(String, init, (String, host), (String, port), (String, working_dir), (ZanoLogLevel, log_level), )
PROXY_METHOD(String, reset, )
PROXY_METHOD(String, set_log_level, (ZanoLogLevel, log_level), )
PROXY_METHOD(String, get_version, )
PROXY_ASYNC_METHOD(String, get_wallet_files, )
PROXY_ASYNC_METHOD(String, get_export_private_info, (String, target_dir), )
PROXY_METHOD(String, delete_wallet, (String, file_name), )
PROXY_METHOD(String, get_address_info, (String, addr), )

PROXY_METHOD(String, get_appconfig, (String, encryption_key), )
PROXY_METHOD(String, set_appconfig, (String, conf_str), (String, encryption_key), )
PROXY_METHOD(String, generate_random_key, (Size, length), )
PROXY_ASYNC_METHOD(String, get_logs_buffer, )
PROXY_ASYNC_METHOD(String, truncate_log, )
PROXY_METHOD(String, get_connectivity_status, )

PROXY_ASYNC_METHOD(String, open, (String, path), (String, password), )
PROXY_ASYNC_METHOD(String, restore, (String, seed), (String, path), (String, password), (String, seed_password), )
PROXY_ASYNC_METHOD(String, generate, (String, path), (String, password), )
PROXY_ASYNC_METHOD(String, get_opened_wallets, )

PROXY_ASYNC_METHOD(String, get_wallet_status, (HWallet, instance_id), )
PROXY_ASYNC_METHOD(String, close_wallet, (HWallet, instance_id), )

// cake wallet api extension
PROXY_METHOD(Bool, is_wallet_exist, (String, path), )
PROXY_ASYNC_METHOD(String, get_wallet_info, (HWallet, instance_id), )
PROXY_METHOD(String, reset_wallet_password, (HWallet, instance_id), (String, password), )
PROXY_METHOD(Int, get_current_tx_fee, (ZanoPriority, priority), )

SYNC_CALL_METHOD(String, get_seed_phrase_info, (String, params), )
SYNC_CALL_METHOD(String, reset_connection_url, (String, address), )

#undef NO_MACRO
#undef FE_1
#undef FE_2
#undef FE_3
#undef FE_4
#undef FE_5
#undef FE_GET_MACRO
#undef FOR_EACH

#undef StringReturn
#undef StringReturnCast
#undef StringParam
#undef StringParamCast

#undef BoolReturn
#undef BoolReturnCast

#undef IntReturn
#undef IntReturnCast

#undef DoubleParam
#undef DoubleParamCast

#undef SizeParam
#undef SizeParamCast

#undef HWalletParam
#undef HWalletParamCast

#undef ZanoLogLevelParam
#undef ZanoLogLevelParamCast

#undef ZanoPriorityParam
#undef ZanoPriorityParamCast

#undef PRINT_CAST_IMPL
#undef PRINT_CAST

#undef PRINT_PARAM_IMPL
#undef PRINT_PARAM

#undef PROXY_ASYNC_METHOD
#undef PROXY_METHOD
#undef SYNC_CALL_METHOD
