#include "ReactNativeZano.hpp"
#include "plain_wallet_api.h"

#ifdef __ANDROID__
  // Android Headers
#elif __APPLE__
  #include "ReactNativeZano-Swift.h"
#endif

namespace margelo::nitro::zano {

std::string ReactNativeZano::init(const std::string& ip, const std::string& port, double log_level) {
  std::string working_dir = ::ReactNativeZano::getCWDPath();
  return plain_wallet::init(ip, port, working_dir, log_level);
}
std::string ReactNativeZano::reset() { return plain_wallet::reset(); }
std::string ReactNativeZano::set_log_level(double log_level) { return plain_wallet::set_log_level(static_cast<int>(log_level)); }
std::string ReactNativeZano::get_version() { return plain_wallet::get_version(); }
std::string ReactNativeZano::get_wallet_files() { return plain_wallet::get_wallet_files(); }
std::string ReactNativeZano::get_export_private_info(const std::string& target_dir) { return plain_wallet::get_export_private_info(target_dir); }
std::string ReactNativeZano::delete_wallet(const std::string& file_name) { return plain_wallet::delete_wallet(file_name); }
std::string ReactNativeZano::get_address_info(const std::string& addr) { return plain_wallet::get_address_info(addr); }

std::string ReactNativeZano::get_appconfig(const std::string& encryption_key) { return plain_wallet::get_appconfig(encryption_key); }
std::string ReactNativeZano::set_appconfig(const std::string& conf_str, const std::string& encryption_key) { return plain_wallet::set_appconfig(conf_str, encryption_key); }
std::string ReactNativeZano::generate_random_key(double length) { return plain_wallet::generate_random_key(static_cast<uint64_t>(length)); }
std::string ReactNativeZano::get_logs_buffer() { return plain_wallet::get_logs_buffer(); }
std::string ReactNativeZano::truncate_log() { return plain_wallet::truncate_log(); }
std::string ReactNativeZano::get_connectivity_status() { return plain_wallet::get_connectivity_status(); }

std::string ReactNativeZano::open(const std::string& path, const std::string& password) { return plain_wallet::open(path, password); }
std::string ReactNativeZano::restore(const std::string& seed, const std::string& path, const std::string& password, const std::string& seed_password) { return plain_wallet::restore(seed, path, password, seed_password); }
std::string ReactNativeZano::generate(const std::string& path, const std::string& password) { return plain_wallet::generate(path, password); }
std::string ReactNativeZano::get_opened_wallets() { return plain_wallet::get_opened_wallets(); }

std::string ReactNativeZano::get_wallet_status(double instance_id) { return plain_wallet::get_wallet_status(static_cast<int64_t>(instance_id)); }
std::string ReactNativeZano::close_wallet(double instance_id) { return plain_wallet::close_wallet(static_cast<int64_t>(instance_id)); }
std::string ReactNativeZano::invoke(double instance_id, const std::string& params) { return plain_wallet::invoke(static_cast<int64_t>(instance_id), params); }
std::shared_ptr<Promise<std::string>> ReactNativeZano::call(const std::string& method_name, double instance_id, const std::string& params) {
  return Promise<std::string>::async([method_name, instance_id, params]() {
    return plain_wallet::sync_call(method_name, static_cast<uint64_t>(instance_id), params);
  });
}

//cake wallet api extension
bool ReactNativeZano::is_wallet_exist(const std::string& path) { return plain_wallet::is_wallet_exist(path); }
std::string ReactNativeZano::get_wallet_info(double instance_id) { return plain_wallet::get_wallet_info(static_cast<int64_t>(instance_id)); }
std::string ReactNativeZano::reset_wallet_password(double instance_id, const std::string& password) { return plain_wallet::reset_wallet_password(static_cast<int64_t>(instance_id), password); }
double ReactNativeZano::get_current_tx_fee(double priority) { return static_cast<double>(plain_wallet::get_current_tx_fee(static_cast<uint64_t>(priority))); }

} // namespace margelo::nitro::zano
