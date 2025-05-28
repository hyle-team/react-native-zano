#include <jni.h>
#include "hyleteam_reactnativezanoOnLoad.hpp"

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM* vm, void*) {
  return margelo::nitro::hyleteam_reactnativezano::initialize(vm);
}
