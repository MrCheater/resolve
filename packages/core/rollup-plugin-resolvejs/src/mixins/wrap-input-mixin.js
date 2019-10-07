import safeResolve from '../safe-resolve'

const wrapInputMixin = () => {
  return {
    options(opts) {
      let customerClientEntry = opts.input

      if (Array.isArray(customerClientEntry)) {
        if (customerClientEntry.length === 1) {
          customerClientEntry = customerClientEntry[0]
        }
      } else if (Object(customerClientEntry) === customerClientEntry) {
        const keys = Object.keys(customerClientEntry)
        if (keys.length === 1) {
          customerClientEntry = customerClientEntry[keys[0]]
        }
      }

      if (customerClientEntry == null) {
        throw new Error(
          'You must supply options.input to rollup [rollup-plugin-resolvejs]'
        )
      }
      if (customerClientEntry.constructor !== String) {
        throw new Error(
          'options.input must be a string [rollup-plugin-resolvejs]'
        )
      }

      const resolvedPath = safeResolve(customerClientEntry)

      return {
        ...opts,
        input: `$resolve.wrap-client?${JSON.stringify({
          customerClientEntry:
            resolvedPath == null ? customerClientEntry : resolvedPath
        })}`
      }
    }
  }
}

export default wrapInputMixin
