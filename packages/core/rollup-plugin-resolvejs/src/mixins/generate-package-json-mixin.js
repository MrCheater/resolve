import generatePackageJson from 'rollup-plugin-generate-package-json'

const generatePackageJsonMixin = () => {
  const { generateBundle } = generatePackageJson({
    baseContents: {
      name: 'cloud-entry',
      dependencies: {},
      private: true
    }
  })

  return { generateBundle }
}

export default generatePackageJsonMixin
