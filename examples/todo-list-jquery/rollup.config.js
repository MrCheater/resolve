import resolve from 'rollup-plugin-resolvejs'

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
      resolve({
        aggregates: ['./aggregates/todo.js']
      })
    ],
    external
  }
]
