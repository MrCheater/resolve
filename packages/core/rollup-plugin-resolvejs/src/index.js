import path from 'path'

import getConfig from './get-config'
import getVirtualModules from './virtual'

const PREFIX = `\0resolvejs:`

const safeResolve = query => {
  try {
    return require.resolve(query)
  } catch (err) {
    return null
  }
}

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

  const regExpRelativeNodeModule = /(?!^resolve-runtime(\/.*)?$)^(@[a-zA-Z0-9._-]+\/)?([a-zA-Z0-9._-]+)(\/.*)?$/
  const regExpAbsoluteNodeModule = /^.*\/node_modules\//

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
    },

    options(opts) {
      const external = id => {
        if (typeof opts.external === 'function' && opts.external(id)) {
          return true
        }

        if (Array.isArray(opts.external) && opts.external.includes(id)) {
          return true
        }

        const resolvedPath = safeResolve(id)

        if (resolvedPath === null) {
          return false
        }

        return regExpRelativeNodeModule.test(
          id.replace(regExpAbsoluteNodeModule, '')
        )
      }

      return Object.assign({}, opts, { external })
    }
  }
}
