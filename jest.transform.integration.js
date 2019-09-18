const babelrc = {
  ...require('@internal/helpers').getBabelConfig({
    moduleType: 'cjs',
    moduleTarget: 'server'
  })
}

babelrc.plugins = [
  ...babelrc.plugins,
  [
    'babel-plugin-module-resolver',
    {
      root: [__dirname],
      alias: {
        "resolve-readmodel-base": "./packages/adapters/readmodel-adapters/resolve-readmodel-base/src/index.js",
        "resolve-readmodel-lite": "./packages/adapters/readmodel-adapters/resolve-readmodel-lite/src/index.js",
        "resolve-snapshot-postgresql-serverless": "./packages/adapters/snapshot-adapters/resolve-snapshot-postgresql-serverless/src/index.js",
        "resolve-storage-base": "./packages/adapters/storage-adapters/resolve-storage-base/src/index.js",
        "resolve-storage-lite": "./packages/adapters/storage-adapters/resolve-storage-lite/src/index.js",
        "resolve-command": "./packages/core/resolve-command/src/index.js",
        "resolve-es": "./packages/core/resolve-es/src/index.js",
        "resolve-query": "./packages/core/resolve-query/src/index.js",
        "resolve-runtime/lib/common/utils": "./packages/core/resolve-runtime/src/common/utils",
        "resolve-scripts": "./packages/core/resolve-scripts/src/index.js",
        "resolve-testing-tools": "./packages/core/resolve-testing-tools/src/index.js",
      }
    }
  ]
]

module.exports = require('babel-jest').createTransformer(babelrc)
