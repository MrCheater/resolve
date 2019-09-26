import path from 'path';

const PREFIX = `\0virtual:`;


export default function virtual({
  aggregates
}) {
  console.log(aggregates)

  const modules = {
    '$resolve.aggregates': [
      ...aggregates.map(
        (aggregatePath, aggregateIndex) => `import { name as aggregate_name_${
          aggregateIndex
        }, projection as aggregate_projection_${
          aggregateIndex
        }, commands as aggregate_commands_${
          aggregateIndex
        } } from ${
          JSON.stringify(path.join(
            process.cwd(),
            aggregatePath
          ))
        }`
      ),
      ``,
      `export default [`,
      aggregates.map(
        (aggregatePath, aggregateIndex) => `{ name: aggregate_name_${
          aggregateIndex
        }, projection: aggregate_projection_${
          aggregateIndex
        }, commands: aggregate_commands_${
          aggregateIndex
        }}`
      ).join(','),
      `]`
    ].join('\n'),
    '$resolve.local-entry': [
      `import aggregates from '$resolve.aggregates'`,
      ``,
      `export { aggregates }`
    ].join('\n')
  }

  const resolvedIds = new Map();

  Object.keys(modules).forEach(id => {
    resolvedIds.set(path.resolve(id), modules[id]);
  });

  return {
    name: 'resolvejs',

    resolveId(id, importer) {
      if (id in modules) {
        console.log(PREFIX + id)
        return PREFIX + id;
      }

      if (importer) {
        if (importer.startsWith(PREFIX)) importer = importer.slice(PREFIX.length);
        const resolved = path.resolve(path.dirname(importer), id);
        if (resolvedIds.has(resolved)) return PREFIX + resolved;
      }
    },

    load(id) {
      if (id.startsWith(PREFIX)) {
        id = id.slice(PREFIX.length);

        return id in modules ? modules[id] : resolvedIds.get(id);
      }
    }
  };
}
