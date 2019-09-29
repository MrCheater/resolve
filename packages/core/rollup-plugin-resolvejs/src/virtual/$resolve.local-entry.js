export default () => {
  return [
    `import aggregates from '$resolve.aggregates'`,
    ``,
    `export { aggregates }`
  ].join('\n')
}
