import node from 'rollup-plugin-node-resolve';
import resolve from 'rollup-plugin-resolvejs';
import commonjs from 'rollup-plugin-commonjs';

import packageJson from './package.json';

const external = [
  ...Object.keys(packageJson.dependencies || {}),
  ...Object.keys(packageJson.peerDependencies || {})
];

export default [
  {
    input: {
      'local-entry': '$resolve.local-entry',
      'aggregates': '$resolve.aggregates'
    },
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        sourcemap: true
      }
    ],
    plugins: [
      // node({}),
      // commonjs({}),
      resolve({
        aggregates: [
          './aggregates/todo.js'
        ]
      })
    ],
    external
  }
];
