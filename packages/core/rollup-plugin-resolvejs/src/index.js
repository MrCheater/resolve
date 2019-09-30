import path from 'path'

import getConfig from './get-config'
import getVirtualModules from './virtual'

const PREFIX = `\0resolvejs:`

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
    },

    options(opts) {
      // const external = [
      //   ...opts.external,
      //   'zeromq',
      //   'zeromq-ng',
      //   ...JSON.parse(process.env.__RESOLVE_PACKAGES__)
      // ]

      const external = id => {
        if (typeof opts.external === 'function' && opts.external(id)) {
          return true
        }

        if (Array.isArray(opts.external) && opts.external.includes(id)) {
          return true
        }

        /**
         * The `id` argument is a resolved path if `rollup-plugin-node-resolve`
         * and `rollup-plugin-commonjs` are included.
         */
        const resolvedPath = safeResolve(id)

        if (resolvedPath === null) {
          return false
        }

        const resolvedDirname = path.dirname(resolvedPath)

        return ids.some(idx => resolvedDirname.startsWith(path.dirname(idx)))
      }

      return Object.assign({}, opts, { external })
    }
  }
}
