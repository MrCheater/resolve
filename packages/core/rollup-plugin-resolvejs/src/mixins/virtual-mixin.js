import path from 'path'

import getVirtualModules from '../virtual'
import { PREFIX } from '../constants'

const virtualMixin = config => {
  const virtualModules = getVirtualModules()

  const resolvedIds = new Map()

  for (let id in virtualModules) {
    if (!virtualModules.hasOwnProperty(id)) {
      continue
    }

    resolvedIds.set(path.resolve(id), virtualModules[id])
  }

  return {
    resolveId(idAndQuery, importer) {
      const id = idAndQuery.replace(/\?.*/, '')

      if (id in virtualModules) {
        return PREFIX + idAndQuery
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

    async load(idAndQuery) {
      if (idAndQuery.startsWith(PREFIX)) {
        const [, id, , query = '{}'] = idAndQuery.match(/^([^?]*)(\?(.+))?$/)

        const resolvedId = id.slice(PREFIX.length)

        return resolvedId in virtualModules
          ? (await virtualModules[resolvedId])(config, JSON.parse(query))
          : resolvedIds.get(resolvedId)
      }
    }
  }
}

export default virtualMixin
