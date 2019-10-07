const getConfig = ({ aggregates, ...other }) => {
  return {
    ...other,
    aggregates
  }
}

export default getConfig
