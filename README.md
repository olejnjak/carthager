# Carthager
Make GitHub releases Carthage binary compatible

## Usage
By using following entry in your Cartfile you can ensure your project uses binary XCFrameworks published in GitHub releases.

```bash
binary "https://<baseURL>/repo/<owner>/<repo>"
```

So for example if you want to use [Facebook SDK](https://github.com/facebook/facebook-ios-sdk) you will use:
```bash
binary "https://<baseURL>/repo/facebook/facebook-ios-sdk" ~> 15.1
```

## Known limitations
Currently it is searched for all release artifacts that have suffix `.xcframework.zip`, if there is more such artifacts the output might be incorrect.
