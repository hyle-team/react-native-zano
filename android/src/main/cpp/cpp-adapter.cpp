#include <jni.h>
#include "RNZanoOnLoad.hpp"

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM* vm, void*) {
  return margelo::nitro::zano::initialize(vm);
}
