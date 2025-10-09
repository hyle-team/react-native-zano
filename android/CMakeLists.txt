project(RNZano)
cmake_minimum_required(VERSION 3.9.0)

set(PACKAGE_NAME RNZano)
set(CMAKE_VERBOSE_MAKEFILE ON)
set(CMAKE_CXX_STANDARD 20)

# Define C++ library and add all sources
add_library(
    ${PACKAGE_NAME}
    SHARED
    src/main/cpp/cpp-adapter.cpp
    ../cpp/PlainWallet.cpp
    ../cpp/WalletRpc.cpp
    ../cpp/CoreRpc.cpp
)

# Add Nitrogen specs :)
include(${CMAKE_SOURCE_DIR}/../nitrogen/generated/android/RNZano+autolinking.cmake)

# Set up local includes
include_directories(
  "src/main/cpp"
  "../cpp"
  ${CMAKE_SOURCE_DIR}/../libraries/include
)

find_library(LOG_LIB log)

# Link all libraries together
target_link_libraries(
  ${PACKAGE_NAME}
  ${LOG_LIB}
  android
  # ${CMAKE_SOURCE_DIR}/../libraries/lib/libzano-android-${ANDROID_ABI}.a

  ${CMAKE_SOURCE_DIR}/../libraries/_prebuilts/${ANDROID_ABI}/libboost_atomic.a
  ${CMAKE_SOURCE_DIR}/../libraries/_prebuilts/${ANDROID_ABI}/libboost_chrono.a
  ${CMAKE_SOURCE_DIR}/../libraries/_prebuilts/${ANDROID_ABI}/libboost_date_time.a
  ${CMAKE_SOURCE_DIR}/../libraries/_prebuilts/${ANDROID_ABI}/libboost_filesystem.a
  ${CMAKE_SOURCE_DIR}/../libraries/_prebuilts/${ANDROID_ABI}/libboost_regex.a
  ${CMAKE_SOURCE_DIR}/../libraries/_prebuilts/${ANDROID_ABI}/libboost_serialization.a
  ${CMAKE_SOURCE_DIR}/../libraries/_prebuilts/${ANDROID_ABI}/libboost_system.a
  ${CMAKE_SOURCE_DIR}/../libraries/_prebuilts/${ANDROID_ABI}/libboost_thread.a
  ${CMAKE_SOURCE_DIR}/../libraries/_prebuilts/${ANDROID_ABI}/libboost_timer.a
  ${CMAKE_SOURCE_DIR}/../libraries/_prebuilts/${ANDROID_ABI}/libboost_program_options.a
  ${CMAKE_SOURCE_DIR}/../libraries/_prebuilts/${ANDROID_ABI}/libboost_wserialization.a

  ${CMAKE_SOURCE_DIR}/../libraries/_prebuilts/${ANDROID_ABI}/libssl.a
  ${CMAKE_SOURCE_DIR}/../libraries/_prebuilts/${ANDROID_ABI}/libssl_crypto.a

  ${CMAKE_SOURCE_DIR}/../libraries/_prebuilts/${ANDROID_ABI}/libcurrency_core.a
  ${CMAKE_SOURCE_DIR}/../libraries/_prebuilts/${ANDROID_ABI}/libcommon.a
  ${CMAKE_SOURCE_DIR}/../libraries/_prebuilts/${ANDROID_ABI}/libcrypto.a
  ${CMAKE_SOURCE_DIR}/../libraries/_prebuilts/${ANDROID_ABI}/libwallet.a
  ${CMAKE_SOURCE_DIR}/../libraries/_prebuilts/${ANDROID_ABI}/libz.a
)
