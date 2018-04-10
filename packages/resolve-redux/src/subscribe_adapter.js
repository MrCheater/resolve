import socketIOClient from 'socket.io-client'

import { makeLateResolvingPromise } from './util'

export default function subscribeAdapter(origin, rootPath) {
  let onEvent, onDisconnect

  const socket = socketIOClient(origin, { path: `${rootPath}/socket` })

  let latePromise = makeLateResolvingPromise()

  socket.on('event', event => onEvent(JSON.parse(event)))

  socket.on('connect', () => latePromise.resolve(socket.id))

  socket.on('reconnect', () => {
    latePromise = makeLateResolvingPromise(socket.id)
  })

  socket.on('disconnect', reason => {
    latePromise = makeLateResolvingPromise()
    onDisconnect(reason)
  })

  return {
    onEvent(callback) {
      onEvent = callback
    },
    onDisconnect(callback) {
      onDisconnect = callback
    },
    setSubscription({ aggregateIds, types }) {
      socket.emit('setSubscription', {
        ids: aggregateIds, // TODO. Fix server-side
        types
      })
    },
    async getClientId() {
      return await latePromise
    }
  }
}
