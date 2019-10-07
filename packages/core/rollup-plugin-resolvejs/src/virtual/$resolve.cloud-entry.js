export default () => {
  return [
    `import aggregates from '$resolve.aggregates'`,
    `import cloudEntry from 'resolve-runtime/es/cloud'`,
    ``,
    `cloudEntry({ aggregates })`
  ].join('\n')
}
