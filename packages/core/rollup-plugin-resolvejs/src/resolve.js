import path from 'path'
import Module from 'module'

import { BUILD_ID } from './constants'

const resolve = (query, { safe, fallback } = {}) => {
  const fromDirectory = process.cwd()

  const fromFile = path.join(fromDirectory, `__noop__${BUILD_ID}.js`)

  try {
    return Module._resolveFilename(query, {
      id: fromFile,
      filename: fromFile,
      paths: Module._nodeModulePaths(fromDirectory)
    })
  } catch (error) {
    if (fallback) {
      return resolve(fallback, { safe })
    } else if (safe) {
      return null
    } else {
      throw error
    }
  }
}

export default resolve
