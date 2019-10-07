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

export default mergeInputMixin
