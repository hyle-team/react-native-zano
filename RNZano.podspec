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
  s.source       = { :git => "https://github.com/hyle-team/zano_mobile.git", :tag => "#{s.version}" }

  s.source_files = ["cpp/*.{hpp,cpp}", "ios/**/*.{h,m,mm,swift}"]

  s.vendored_frameworks = ['lib/ios/libzano.xcframework']

  load 'nitrogen/generated/ios/RNZano+autolinking.rb'
  add_nitrogen_files(s)

  # Use install_modules_dependencies helper to install the dependencies if React Native version >=0.71.0.
  # See https://github.com/facebook/react-native/blob/febf6b7f33fdb4904669f99d795eba4c0f95d7bf/scripts/cocoapods/new_architecture.rb#L79.
  if respond_to?(:install_modules_dependencies, true)
    install_modules_dependencies(s)
  else
    s.dependency "React-Core"
  end

end
