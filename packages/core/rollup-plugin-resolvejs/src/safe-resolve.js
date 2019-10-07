import path from 'path'
import Module from 'module'

import { BUILD_ID } from './constants'

const safeResolve = query => {
  const fromDirectory = process.cwd()

  const fromFile = path.join(fromDirectory, `__noop__${BUILD_ID}.js`)

  const resolveFileName = () =>
    Module._resolveFilename(query, {
      id: fromFile,
      filename: fromFile,
      paths: Module._nodeModulePaths(fromDirectory)
    })

  try {
    return resolveFileName()
  } catch (error) {
    return null
  }
}

export default safeResolve
