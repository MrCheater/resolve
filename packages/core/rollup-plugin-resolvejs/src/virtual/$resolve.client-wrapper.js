export default () => {
  return [
    `import aggregates from '$resolve.aggregates'`,
    ``,
    `const wrapClient = (customerClientEntry) => customerClientEntry({`,
    `  aggregates`,
    `})`,
    ``,
    `export default wrapClient`
  ].join('\n')
}
