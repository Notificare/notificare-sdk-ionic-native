export enum PermissionGroup {
  LOCATION_WHEN_IN_USE = 'location_when_in_use',
  LOCATION_ALWAYS = 'location_always',
  BLUETOOTH_SCAN = 'bluetooth_scan',
}

export enum PermissionStatus {
  DENIED = 'denied',
  GRANTED = 'granted',
  RESTRICTED = 'restricted',
  PERMANENTLY_DENIED = 'permanently_denied',
}
