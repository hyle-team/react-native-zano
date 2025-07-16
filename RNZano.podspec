require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "RNZano"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "16.6" }
  s.source       = { :git => "https://github.com/hyle-team/react-native-zano.git", :tag => "#{s.version}" }

  s.source_files = [
    "cpp/**/*.{hpp,cpp}",
    "ios/**/*.{m,mm,swift}",
  ]
  s.vendored_frameworks = ['lib/ios/libzano.xcframework']

  s.pod_target_xcconfig = {
    # C++ compiler flags, mainly for folly.
    "GCC_PREPROCESSOR_DEFINITIONS" => "$(inherited) FOLLY_NO_CONFIG FOLLY_CFG_NO_COROUTINES"
  }

  s.dependency 'React-jsi'
  s.dependency 'React-callinvoker'

  load 'nitrogen/generated/ios/RNZano+autolinking.rb'
  add_nitrogen_files(s)

  install_modules_dependencies(s)
end
