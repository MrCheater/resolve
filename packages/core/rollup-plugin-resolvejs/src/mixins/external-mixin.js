import resolve from '../resolve'

const externalMixin = () => {
  const regExpRelativeNodeModule = /(?!^resolve-runtime(\/.*)?$)^(@[a-zA-Z0-9._-]+\/)?([a-zA-Z0-9._-]+)(\/.*)?$/
  const regExpAbsoluteNodeModule = /^.*\/node_modules\//

  return {
    options(opts) {
      const originalExternal = opts.external
      const external = id => {
        if (typeof originalExternal === 'function' && originalExternal(id)) {
          return true
        }

        if (Array.isArray(originalExternal) && originalExternal.includes(id)) {
          return true
        }

        const resolvedPath = resolve(id, { safe: true })

        if (resolvedPath === null) {
          return false
        }

        return regExpRelativeNodeModule.test(
          id.replace(regExpAbsoluteNodeModule, '')
        )
      }

      opts.external = external

      return opts
    }
  }
}

export default externalMixin
