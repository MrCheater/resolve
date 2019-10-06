export default () => () => {
  return [
    `import aggregates from '$resolve.aggregates'`,
    `import localEntry from 'resolve-runtime/es/local'`,
    ``,
    `localEntry({ aggregates})`
  ].join('\n')
}
