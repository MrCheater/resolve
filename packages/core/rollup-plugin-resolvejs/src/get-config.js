import path from 'path'

const getConfig = ({ aggregates, ...other }) => {
  const cwd = process.cwd()

  return {
    ...other,
    aggregates: aggregates.map(aggregatePath => path.join(cwd, aggregatePath))
  }
}

export default getConfig
