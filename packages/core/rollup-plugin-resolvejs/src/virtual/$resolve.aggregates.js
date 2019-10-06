export default ({ aggregates }) => {
  return [
    ...aggregates.map(
      (aggregatePath, aggregateIndex) =>
        `import { name as aggregate_name_${aggregateIndex}, projection as aggregate_projection_${aggregateIndex}, commands as aggregate_commands_${aggregateIndex} } from ${JSON.stringify(
          aggregatePath
        )}`
    ),
    ``,
    `export default [`,
    aggregates
      .map(
        (aggregatePath, aggregateIndex) =>
          `{ name: aggregate_name_${aggregateIndex}, projection: aggregate_projection_${aggregateIndex}, commands: aggregate_commands_${aggregateIndex}}`
      )
      .join(','),
    `]`
  ].join('\n')
}
