package com.margelo.nitro.hyleteam.reactnativezano
  
import com.facebook.proguard.annotations.DoNotStrip

@DoNotStrip
class ReactNativeZano : HybridReactNativeZanoSpec() {
  override fun multiply(a: Double, b: Double): Double {
    return a * b
  }
}
