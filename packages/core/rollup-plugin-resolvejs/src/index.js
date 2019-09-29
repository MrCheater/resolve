import path from 'path'

import getConfig from './get-config'
import getVirtualModules from './virtual'

const PREFIX = `\0virtual:`

export default function plugin(options) {
  const config = getConfig(options)

  const virtualModules = getVirtualModules(config)

  const resolvedIds = new Map()

  for (let id in virtualModules) {
    if (!virtualModules.hasOwnProperty(id)) {
      continue
    }
    resolvedIds.set(path.resolve(id), virtualModules[id])
  }

  return {
    name: 'resolvejs',

    resolveId(id, importer) {
      if (id in virtualModules) {
        return PREFIX + id
      }

      if (importer) {
        const resolved = path.resolve(
          path.dirname(
            importer.startsWith(PREFIX)
              ? importer.slice(PREFIX.length)
              : importer
          ),
          id
        )
        if (resolvedIds.has(resolved)) {
          return PREFIX + resolved
        }
      }
    },

    async load(id) {
      if (id.startsWith(PREFIX)) {
        const resolvedId = id.slice(PREFIX.length)

        return resolvedId in virtualModules
          ? await virtualModules[resolvedId]
          : resolvedIds.get(resolvedId)
      }
    }
  }
}
