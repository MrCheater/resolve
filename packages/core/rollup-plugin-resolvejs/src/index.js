import path from 'path'
import generatePackageJson from 'rollup-plugin-generate-package-json'

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

const virtualMixin = (config, customVirtualModules) => {
  const virtualModules = {
    ...getVirtualModules(config),
    ...customVirtualModules
  }

  const resolvedIds = new Map()

  for (let id in virtualModules) {
    if (!virtualModules.hasOwnProperty(id)) {
      continue
    }
    resolvedIds.set(path.resolve(id), virtualModules[id])
  }

  return {
    resolveId(id, importer) {
      console.log(this)

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

        const resolvedPath = safeResolve(id)

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

export function resolveCloudEntry(options) {
  const config = getConfig(options)

  // const { generateBundle } = generatePackageJson({
  //   baseContents: {
  //     name: 'cloud-entry',
  //     dependencies: {},
  //     private: true
  //   }
  // })

  return {
    name: 'resolvejs/cloud-entry',
    //generateBundle,
    ...virtualMixin(config),
    ...externalMixin(config)
  }
}

const mergeInputMixin = (config, input) => {
  return {
    options(opts) {
      return {
        ...opts,
        input
      }
    }
  }
}

const replaceInputMixin = (config, input) => {
  return {
    options(opts) {
      if (input == null) {
        throw new Error(
          'You must supply options.input to rollup [rollup-plugin-resolvejs]'
        )
      }
      if (input.constructor !== String) {
        throw new Error(
          'options.input must be a string [rollup-plugin-resolvejs]'
        )
      }
      return {
        ...opts,
        input: `${input}?query=${JSON.stringify({
          customerClientEntry: opts.input
        })}`
      }
    }
  }
}

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
    replaceInputMixin(config, '$resolve.customer-client-entry'),
    virtualMixin(config, {
      '$resolve.customer-client-entry': [
        `import wrapClient from "$resolve.client"`,
        `import customerClientEntry from ${JSON.stringify(options.input)}`,
        ``,
        `export default wrapClient(customerClientEntry)`
      ].join('\n')
    })
  ])
}
