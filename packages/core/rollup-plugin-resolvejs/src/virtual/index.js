import fs from 'fs'
import path from 'path'

const isJavaScriptFile = /\.js$/
const isIndex = /index\.js$/

export default () =>
  fs
    .readdirSync(__dirname)
    .filter(
      virtualModulePath =>
        isJavaScriptFile.test(virtualModulePath) &&
        !isIndex.test(virtualModulePath)
    )
    .map(virtualModulePath => ({
      [path.parse(virtualModulePath).name]: import(
        path.join(__dirname, virtualModulePath)
      ).then(({ default: getCode }) => getCode)
    }))
    .reduce((acc, val) => {
      Object.assign(acc, val)
      return acc
    }, {})
