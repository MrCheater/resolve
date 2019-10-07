import getConfig from './get-config'
import composeMixins from './compose-mixins'

import {
  virtualMixin,
  externalMixin,
  manualChunksMixin,
  mergeInputMixin,
  generatePackageJsonMixin,
  wrapInputMixin
} from './mixins'

export function resolveCloudEntry(options) {
  const config = getConfig(options)

  return composeMixins({ name: 'resolvejs/cloud-entry' }, [
    mergeInputMixin(config, {
      'cloud-entry': '$resolve.cloud-entry'
    }),
    virtualMixin(config),
    externalMixin(config),
    manualChunksMixin(config),
    generatePackageJsonMixin(config)
  ])
}

export function resolveLocalEntry(options) {
  const config = getConfig(options)

  return composeMixins({ name: 'resolvejs/local-entry' }, [
    mergeInputMixin(config, {
      'local-entry': '$resolve.local-entry'
    }),
    virtualMixin(config),
    externalMixin(config),
    manualChunksMixin(config)
  ])
}

export function resolveClient(options) {
  const config = getConfig(options)

  return composeMixins({ name: 'resolvejs/local-entry' }, [
    wrapInputMixin(config),
    virtualMixin(config)
  ])
}
