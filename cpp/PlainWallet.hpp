#pragma once

#include "HybridPlainWalletSpec.hpp"
#include <jsi/jsi.h>

namespace margelo::nitro::zano {

class PlainWallet : public HybridPlainWalletSpec
{
public:
  PlainWallet() : HybridObject(TAG) {}

public:
  std::shared_ptr<Promise<std::string>> init(const std::string &host, const std::string &port, const std::string &working_dir, ZanoLogLevel log_level) override;
  std::string reset() override;
  std::string set_log_level(ZanoLogLevel log_level) override;
  std::string get_version() override;
  std::string get_wallet_files() override;
  std::string get_export_private_info(const std::string &target_dir) override;
  std::string delete_wallet(const std::string &file_name) override;
  std::string get_address_info(const std::string &addr) override;

  std::string get_appconfig(const std::string &encryption_key) override;
  std::string set_appconfig(const std::string &conf_str, const std::string &encryption_key) override;
  std::string generate_random_key(double lenght) override;
  std::shared_ptr<Promise<std::string>> get_logs_buffer() override;
  std::string truncate_log() override;
  std::string get_connectivity_status() override;

  std::shared_ptr<Promise<std::string>> open(const std::string &path, const std::string &password) override;
  std::shared_ptr<Promise<std::string>> restore(const std::string &seed, const std::string &path, const std::string &password, const std::string &seed_password) override;
  std::shared_ptr<Promise<std::string>> generate(const std::string &path, const std::string &password) override;
  std::shared_ptr<Promise<std::string>> get_opened_wallets() override;

  std::string get_wallet_status(double instance_id) override;
  std::shared_ptr<Promise<std::string>> close_wallet(double instance_id) override;

  bool is_wallet_exist(const std::string &path) override;
  std::string get_wallet_info(double instance_id) override;
  std::string reset_wallet_password(double instance_id, const std::string &password) override;
  double get_current_tx_fee(ZanoPriority priority) override;

  std::string get_seed_phrase_info(const std::string &params) override;
  std::string reset_connection_url(const std::string &address) override;
};

} // namespace margelo::nitro::zano
