# CHANGELOG

## 3.2.0

#### Native changes

##### Android

- Fix notification content when opening partial inbox items
- Use GMS/HMS `message.sentTime` when creating inbox items
- Log events methods correctly throw when failures are not recoverable
- Improve session control mechanism
- Fix session length
- Fix GMS/HMS token refresh race condition for late configured apps
- Add `InAppBrowser` notification type
- Aliased `WebView` action into `InAppBrowser`, aligning with the notification type
- Ensure listeners are called on the main thread
- Allow non-ASCII header values

##### iOS

- Fix notification content when opening partial inbox items
- Fix marking partial items as read
- Improve ISO date parser
- Add safeguards and warnings for corrupted items in the inbox database
- Log events methods correctly throw when failures are not recoverable
- Improve session control mechanism
- Add `InAppBrowser` notification type
- Aliased `WebView` action into `InAppBrowser`, aligning with the notification type
- Ensure delegate methods are called on the main thread

## 3.1.0

- Include complete remote message information in unknown notification events
- Add `onUnknownNotificationOpened` and `onUnknownNotificationActionOpened` events
- Add permission utility methods

#### Native changes

##### Android

- Include `Accept-Language` and custom `User-Agent` headers
- Allow notification push services to be subclassed
- Add notification attributes to unknown notifications
- Improve `allowedUI` to accurately reflect push capabilities
- Prevent push tokens from being registered immediately after an install

##### iOS

- Include `Accept-Language` and custom `User-Agent` headers
- Improve `allowedUI` to accurately reflect push capabilities
- Rename internal `AnyCodable` to prevent collisions
- Expose unknown notification open events via `notificare(_:didOpenUnknownNotification:)` and `notificare(_:didOpenUnknownAction:for:responseText:)`
- Launch each peer module sequentially to prevent race conditions

## 3.0.1

#### Native changes

##### Android

- Update Gradle build tools
- Use compile-time constant for the SDK version
- Remove unnecessary `BuildConfig` files
- Update dependencies

##### iOS

- Prevent multiple push registration events
- Prevent Apple-processed builds from modifying the SDK version

## 3.0.0

Please check our [migration guide](./MIGRATION.md) before adopting the v3.x generation.
