require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))
notificare_version = '4.2.0'

Pod::Spec.new do |s|
  s.name = 'CapacitorNotificareScannables'
  s.version = package['version']
  s.summary = package['description']
  s.license = package['license']
  s.homepage = package['repository']['url']
  s.author = package['author']
  s.source = { :git => package['repository']['url'], :tag => s.version.to_s }
  s.source_files = 'ios/Plugin/**/*.{swift,h,m,c,cc,mm,cpp}'
  s.ios.deployment_target  = '14.0'
  s.dependency 'Capacitor'
  s.dependency 'Notificare/NotificareKit', notificare_version
  s.dependency 'Notificare/NotificareScannablesKit', notificare_version
  s.dependency 'Notificare/NotificareUtilitiesKit', notificare_version
  s.swift_version = '5.1'
end
