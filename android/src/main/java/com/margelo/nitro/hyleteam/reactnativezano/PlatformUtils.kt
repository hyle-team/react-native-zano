package com.margelo.nitro.hyleteam.reactnativezano

import android.os.Environment
import com.facebook.proguard.annotations.DoNotStrip
import com.margelo.nitro.NitroModules

@DoNotStrip
class PlatformUtils : HybridPlatformUtilsSpec() {
  private val applicationContext = NitroModules.applicationContext

  override fun get_working_directory(): String {
    return applicationContext?.filesDir?.absolutePath ?: ""
  }

  override fun get_downloads_directory(): String {
    return Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS).absolutePath
  }
}
