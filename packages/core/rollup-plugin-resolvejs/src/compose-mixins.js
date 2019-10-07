const composeMixins = (plugin, mixins) => {
  const methodNames = Array.from(
    new Set(
      mixins
        .map(mixin => Object.keys(mixin))
        .reduce((acc, val) => {
          acc.push(...val)
          return acc
        }, [])
    )
  )

  if (methodNames.includes('options')) {
    plugin.options = function(opts) {
      let result = { ...opts, input: {} }

      if (Array.isArray(opts.input)) {
        for (const key of opts.input) {
          result.input[key] = key
        }
      } else if (opts.input.constructor === String) {
        result.input[opts.input] = opts.input
      } else {
        Object.assign(result.input, opts.input)
      }

      for (const { options } of mixins) {
        if (options == null) {
          continue
        }
        const params = options(result)
        for (const key of Object.keys(params)) {
          if (key === 'input') {
            Object.assign(result.input, params.input)
          } else if (result[key] != null && params[key] !== result[key]) {
            throw new Error(`Merge conflict options.${key}`)
          }
          result[key] = params[key]
        }
      }
      return result
    }
  }

  for (const methodName of methodNames) {
    if (methodName === 'options') {
      continue
    }
    for (let mixin of mixins) {
      if (mixin[methodName] == null) {
        continue
      }
      if (plugin[methodName] != null) {
        throw new Error(`Merge conflict plugin.${methodName}`)
      }
      plugin[methodName] = mixin[methodName]
    }
  }

  return plugin
}

export default composeMixins
