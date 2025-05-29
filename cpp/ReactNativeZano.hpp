#pragma once

#include "HybridReactNativeZanoSpec.hpp"
#include <jsi/jsi.h>
#include <string>

namespace margelo::nitro::zano {

class ReactNativeZano : public HybridReactNativeZanoSpec {
public:
  ReactNativeZano(): HybridObject(TAG) { }

public:
  std::string init_zano(const std::string& ip, const std::string& port, const std::string& working_folder, double log_level) override;
};

} // namespace margelo::nitro::zano
