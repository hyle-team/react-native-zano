project(RNZano)
cmake_minimum_required(VERSION 3.9.0)

set(PACKAGE_NAME RNZano)
set(CMAKE_VERBOSE_MAKEFILE ON)
set(CMAKE_CXX_STANDARD 20)

# Define C++ library and add all sources
add_library(${PACKAGE_NAME} SHARED src/main/cpp/cpp-adapter.cpp ../cpp/ReactNativeZano.cpp)

# Add Nitrogen specs :)
include(${CMAKE_SOURCE_DIR}/../nitrogen/generated/android/RNZano+autolinking.cmake)

# Set up local includes
include_directories(
  "src/main/cpp"
  "../cpp"
  ${CMAKE_SOURCE_DIR}/../libraries/_libs_android/boost/include
  ${CMAKE_SOURCE_DIR}/../libraries/_libs_android/openssl/include
  ${CMAKE_SOURCE_DIR}/../libraries/_install_android/include
)

find_library(LOG_LIB log)

link_directories(
  ${CMAKE_SOURCE_DIR}/../libraries/_libs_android/boost/${ANDROID_ABI}/lib
)

# Link all libraries together
target_link_libraries(
    ${PACKAGE_NAME}
    ${LOG_LIB}
    android # <-- Android core
    ${CMAKE_SOURCE_DIR}/../libraries/_libs_android/boost/${ANDROID_ABI}/lib/libboost_thread.a
    ${CMAKE_SOURCE_DIR}/../libraries/_libs_android/boost/${ANDROID_ABI}/lib/libboost_system.a
    ${CMAKE_SOURCE_DIR}/../libraries/_libs_android/boost/${ANDROID_ABI}/lib/libboost_filesystem.a
    ${CMAKE_SOURCE_DIR}/../libraries/_libs_android/boost/${ANDROID_ABI}/lib/libboost_timer.a
    ${CMAKE_SOURCE_DIR}/../libraries/_libs_android/boost/${ANDROID_ABI}/lib/libboost_date_time.a
    ${CMAKE_SOURCE_DIR}/../libraries/_libs_android/boost/${ANDROID_ABI}/lib/libboost_chrono.a
    ${CMAKE_SOURCE_DIR}/../libraries/_libs_android/boost/${ANDROID_ABI}/lib/libboost_regex.a
    ${CMAKE_SOURCE_DIR}/../libraries/_libs_android/boost/${ANDROID_ABI}/lib/libboost_serialization.a
    ${CMAKE_SOURCE_DIR}/../libraries/_libs_android/boost/${ANDROID_ABI}/lib/libboost_atomic.a
    ${CMAKE_SOURCE_DIR}/../libraries/_libs_android/boost/${ANDROID_ABI}/lib/libboost_program_options.a
    ${CMAKE_SOURCE_DIR}/../libraries/_libs_android/openssl/${ANDROID_ABI}/lib/libssl.a
    ${CMAKE_SOURCE_DIR}/../libraries/_libs_android/openssl/${ANDROID_ABI}/lib/libcrypto.a
    ${CMAKE_SOURCE_DIR}/../libraries/_install_android/${ANDROID_ABI}/lib/libcurrency_core.a
    ${CMAKE_SOURCE_DIR}/../libraries/_install_android/${ANDROID_ABI}/lib/libcommon.a
    ${CMAKE_SOURCE_DIR}/../libraries/_install_android/${ANDROID_ABI}/lib/libcrypto.a
    ${CMAKE_SOURCE_DIR}/../libraries/_install_android/${ANDROID_ABI}/lib/libz.a
    ${CMAKE_SOURCE_DIR}/../libraries/_install_android/${ANDROID_ABI}/lib/libwallet.a
)
