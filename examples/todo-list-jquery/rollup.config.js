import resolve from 'rollup-plugin-resolvejs'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'

import packageJson from './package.json'

const external = [
  ...Object.keys(packageJson.dependencies || {}),
  ...Object.keys(packageJson.peerDependencies || {})
]

export default [
  {
    input: {
      'local-entry': '$resolve.local-entry'
    },
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        sourcemap: true
      }
    ],
    plugins: [
      json(),
      nodeResolve(),
      commonjs(),
      resolve({
        aggregates: ['./aggregates/todo.js']
      })
    ],
    external
  }
]
