import Foundation

struct TODO: Error {}

class PlatformUtils: HybridPlatformUtilsSpec {
  public func get_working_directory() throws -> String {
    let fileManager = FileManager.default
    let docsDir = try! fileManager.url(for: .documentDirectory, in: .userDomainMask, appropriateFor: nil, create: true)
    return docsDir.path
  }

  public func get_downloads_directory() throws -> String {
    let fileManager = FileManager.default
    let downloadsDir = try! fileManager.url(for: .downloadsDirectory, in: .userDomainMask, appropriateFor: nil, create: true)
    return downloadsDir.path
  }
}
