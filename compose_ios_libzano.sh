#!/bin/zsh

platforms=( )
framework_args=( )
rm -rf lib/ios/libzano.xcframework
mkdir -p lib/ios

platform=ios-arm64
arch=arm64
rm -rf lib/ios/$platform
mkdir lib/ios/$platform
libtool -static -o lib/ios/$platform/libzano.a \
  -arch_only $arch \
  ./libraries/_install_ios/lib/thirdparty/libboost.xcframework/$platform/libboost.a \
  ./libraries/_install_ios/lib/thirdparty/openssl/libssl.xcframework/$platform/libssl.a \
  ./libraries/_install_ios/lib/thirdparty/openssl/libcrypto.xcframework/$platform/libcrypto.a \
  ./libraries/_install_ios/lib/libcurrency_core.a.xcframework/$platform/libcurrency_core.a \
  ./libraries/_install_ios/lib/libcommon.a.xcframework/$platform/libcommon.a \
  ./libraries/_install_ios/lib/libcrypto_.a.xcframework/$platform/libcrypto_.a \
  ./libraries/_install_ios/lib/libz.a.xcframework/$platform/libz.a \
  ./libraries/_install_ios/lib/libwallet.a.xcframework/$platform/libwallet.a
platforms+=$platform
framework_args+=-library
framework_args+=lib/ios/$platform/libzano.a
framework_args+=-headers
framework_args+=./libraries/_install_android/include/

platform=ios-arm64_x86_64-simulator
rm -rf lib/ios/$platform
mkdir lib/ios/$platform
libtool -static -o lib/ios/$platform/libzano.a \
  ./libraries/_install_ios/lib/thirdparty/libboost.xcframework/$platform/libboost.a \
  ./libraries/_install_ios/lib/thirdparty/openssl/libssl.xcframework/$platform/libssl.a \
  ./libraries/_install_ios/lib/thirdparty/openssl/libcrypto.xcframework/$platform/libcrypto.a \
  ./libraries/_install_ios/lib/libcurrency_core.a.xcframework/$platform/libcurrency_core.a \
  ./libraries/_install_ios/lib/libcommon.a.xcframework/$platform/libcommon.a \
  ./libraries/_install_ios/lib/libcrypto_.a.xcframework/$platform/libcrypto_.a \
  ./libraries/_install_ios/lib/libz.a.xcframework/$platform/libz.a \
  ./libraries/_install_ios/lib/libwallet.a.xcframework/$platform/libwallet.a
platforms+=$platform
framework_args+=-library
framework_args+=lib/ios/$platform/libzano.a
framework_args+=-headers
framework_args+=./libraries/_install_android/include/

xcodebuild -create-xcframework ${framework_args[@]} -output lib/ios/libzano.xcframework
for platform in ${platforms[@]}; do
  rm -rf lib/ios/$platform
done
