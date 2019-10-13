import resolve from './resolve'

const getConfig = ({ aggregates, ...other }) => {
  return {
    ...other,
    aggregates: aggregates.map(aggregate => resolve(aggregate))
  }
}

export default getConfig
