import {
  resolveClient,
  resolveLocalEntry,
  resolveCloudEntry
} from 'rollup-plugin-resolvejs'
import nodeResolve from 'rollup-plugin-node-resolve'

const config = {
  aggregates: ['./aggregates/todo.js']
}

export default [
  {
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        sourcemap: true
      }
    ],
    plugins: [nodeResolve(), resolveLocalEntry(config)]
  },
  {
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        sourcemap: true
      }
    ],
    plugins: [nodeResolve(), resolveCloudEntry(config)]
  },
  {
    input: './client.js',
    output: [
      {
        dir: 'dist',
        name: 'client',
        format: 'iife',
        sourcemap: true
      }
    ],
    plugins: [nodeResolve(), resolveClient(config)]
  }
]
