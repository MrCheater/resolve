import resolve from 'rollup-plugin-resolvejs'
import nodeResolve from 'rollup-plugin-node-resolve'

import packageJson from './package.json'

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
      nodeResolve(),
      resolve({
        aggregates: ['./aggregates/todo.js']
      })
    ],
    external: [
      ...Object.keys(packageJson.dependencies || {}),
      ...Object.keys(packageJson.peerDependencies || {})
    ]
  }
]
