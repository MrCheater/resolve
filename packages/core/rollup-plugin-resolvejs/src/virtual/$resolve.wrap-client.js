export default (config, { customerClientEntry }) => {
  return [
    `import wrapClient from "$resolve.client-wrapper"`,
    `import customerClientEntry from ${JSON.stringify(customerClientEntry)}`,
    ``,
    `export default wrapClient(customerClientEntry)`
  ].join('\n')
}
