import path from 'path'

import { PREFIX } from '../constants'

const manualChunksMixin = ({ aggregates }) => {
  return {
    options(opts) {
      const manualChunks = id => {
        if (id === `${PREFIX}$resolve.aggregates`) {
          return `resolve/aggregates/index`
        }
        if (aggregates.includes(id)) {
          return `resolve/aggregates/${path.parse(id).name}`
        }
        if (id.startsWith(PREFIX)) {
          return `resolve/${id.slice(PREFIX.length)}`
        }
      }

      return {
        ...opts,
        manualChunks
      }
    }
  }
}

export default manualChunksMixin
