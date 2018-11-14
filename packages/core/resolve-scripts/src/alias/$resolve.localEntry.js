export default () => ({
  code: `
    import serverAssemblies from '$resolve.serverAssemblies'
    import { localEntry } from 'resolve-runtime'

    const initPromise = localEntry(serverAssemblies)

    const handler = async (...args) => {
      const worker = await initPromise
      return await worker(...args)
    }

    export default handler
  `
})