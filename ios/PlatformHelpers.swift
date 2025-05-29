import Foundation

@_expose(Cxx)
public func getCWDPath() -> String {
    let fileManager = FileManager.default
    let docsDir = try! fileManager.url(for: .documentDirectory, in: .userDomainMask, appropriateFor: nil, create: true)
    return docsDir.path
}
