import {
  SEND_COMMAND,
  HOT_MODULE_REPLACEMENT,
  SUBSCRIBE_VIEWMODEL,
  UNSUBSCRIBE_VIEWMODEL,
  CONNECT_READMODEL,
  DISCONNECT_READMODEL
} from './action_types'
import { createOrderedFetch } from './utils'
import actions from './actions'
import defaultSubscribeAdapter from './subscribe_adapter'
import sendCommand from './send_command'
import createActions from './create_actions'
import mockSubscribeAdapter from './mock_subscribe_adapter'
import subscribeViewModel from './subscribe_view_model'
import unsubscribeViewModel from './unsubscribe_view_model'
import connectReadModel from './connect_read_model_handler'
import disconnectReadModel from './unsubscribe_read_model'
import middlewareHandlers from './middleware-handlers'

const REFRESH_TIMEOUT = 1000

const isClient = typeof window !== 'undefined'

export function createResolveMiddleware({
  viewModels = [],
  readModels = [],
  aggregates = [],
  origin,
  rootPath
}) {
  return store => {
    if (!isClient) {
      return next => action => next(action)
    }

    const subscribers = {
      viewModels: {},
      aggregateIds: {}
    }

    const requests = {}
    const readModelSubscriptions = {}
    const orderedFetch = createOrderedFetch()
    const hotModuleReplacementId = undefined

    const mqttClient = createMqttClient({
      store,
      origin,
      rootPath
    })

    const context = {
      origin,
      rootPath,
      mqttClient,
      viewModels,
      readModels,
      aggregates,
      store,
      subscribers,
      requests,
      readModelSubscriptions,
      orderedFetch,
      hotModuleReplacementId
    }

    return next => action => {
      if (action.type in middlewareHandlers) {
        middlewareHandlers[action.type](context, action)
      }
      next(action)
    }
  }
}

export default createResolveMiddleware
