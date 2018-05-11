import uuid from 'uuid/v4'

import {
  SEND_COMMAND_REQUEST,
  SEND_COMMAND_SUCCESS,
  SEND_COMMAND_FAILURE,
  SUBSCRIBE_TOPIC,
  UNSUBSCRIBE_TOPIC,
  CONNECT_VIEWMODEL,
  DISCONNECT_VIEWMODEL,
  LOAD_VIEWMODEL_STATE_REQUEST,
  LOAD_VIEWMODEL_STATE_SUCCESS,
  LOAD_VIEWMODEL_STATE_FAILURE,
  DROP_VIEWMODEL_STATE,
  CONNECT_READMODEL,
  DISCONNECT_READMODEL,
  LOAD_READMODEL_STATE_REQUEST,
  LOAD_READMODEL_STATE_SUCCESS,
  LOAD_READMODEL_STATE_FAILURE,
  APPLY_READMODEL_DIFF,
  DROP_READMODEL_STATE,
  HOT_MODULE_REPLACEMENT
} from './action_types'

const sendCommandRequest = (command, aggregateId, aggregateName, payload) => ({
  type: SEND_COMMAND_REQUEST,
  command,
  aggregateId,
  aggregateName,
  payload
})

const sendCommandSuccess = (command, aggregateId, aggregateName, payload) => ({
  type: SEND_COMMAND_SUCCESS,
  command,
  aggregateId,
  aggregateName,
  payload
})

const sendCommandFailure = (
  command,
  aggregateId,
  aggregateName,
  payload,
  error
) => ({
  type: SEND_COMMAND_FAILURE,
  command,
  aggregateId,
  aggregateName,
  payload,
  error
})

const subscibeTopic = (appId, topicName, topicId) => ({
  type: SUBSCRIBE_TOPIC,
  appId,
  topicName,
  topicId
})

const unsubscibeTopic = (appId, topicName, topicId) => ({
  type: UNSUBSCRIBE_TOPIC,
  appId,
  topicName,
  topicId
})

const connectViewModel = (viewModelName, aggregateIds) => ({
  type: CONNECT_VIEWMODEL,
  viewModelName,
  aggregateIds
})

const disconnectViewModel = (viewModelName, aggregateIds) => ({
  type: DISCONNECT_VIEWMODEL,
  viewModelName,
  aggregateIds
})

const loadViewModelStateRequest = (viewModelName, aggregateIds) => ({
  type: LOAD_VIEWMODEL_STATE_REQUEST,
  viewModelName,
  aggregateIds
})

const loadViewModelStateSuccess = (viewModelName, aggregateIds, state) => ({
  type: LOAD_VIEWMODEL_STATE_SUCCESS,
  viewModelName,
  aggregateIds,
  state
})

const loadViewModelStateFailure = (viewModelName, aggregateIds, error) => ({
  type: LOAD_VIEWMODEL_STATE_FAILURE,
  viewModelName,
  aggregateIds,
  error
})

const dropViewModelState = (viewModelName, aggregateIds) => ({
  type: DROP_VIEWMODEL_STATE,
  viewModelName,
  aggregateIds
})

const connectReadModel = (
  readModelName,
  resolverName,
  resolverArgs,
  isReactive
) => ({
  type: CONNECT_READMODEL,
  readModelName,
  resolverName,
  resolverArgs,
  isReactive
})

const disconnectReadModel = (
  readModelName,
  resolverName,
  resolverArgs,
  isReactive
) => ({
  type: DISCONNECT_READMODEL,
  readModelName,
  resolverName,
  resolverArgs,
  isReactive
})

const loadReadModelStateRequest = (
  readModelName,
  resolverName,
  resolverArgs
) => ({
  type: LOAD_READMODEL_STATE_REQUEST,
  readModelName,
  resolverName,
  resolverArgs
})

const loadReadModelStateSuccess = (
  readModelName,
  resolverName,
  resolverArgs,
  state
) => ({
  type: LOAD_READMODEL_STATE_SUCCESS,
  readModelName,
  resolverName,
  resolverArgs,
  state
})

const loadReadModelStateFailure = (
  readModelName,
  resolverName,
  resolverArgs,
  error
) => ({
  type: LOAD_READMODEL_STATE_FAILURE,
  readModelName,
  resolverName,
  resolverArgs,
  error
})

const applyReadModelDiff = (
  readModelName,
  resolverName,
  resolverArgs,
  diff
) => ({
  type: APPLY_READMODEL_DIFF,
  readModelName,
  resolverName,
  resolverArgs,
  diff
})

const dropReadModelState = (readModelName, resolverName, resolverArgs) => ({
  type: DROP_READMODEL_STATE,
  readModelName,
  resolverName,
  resolverArgs
})

const hotModuleReplacement = () => ({
  type: HOT_MODULE_REPLACEMENT,
  hotModuleReplacementId: uuid()
})

export default {
  sendCommandRequest,
  sendCommandSuccess,
  sendCommandFailure,
  subscibeTopic,
  unsubscibeTopic,
  connectViewModel,
  disconnectViewModel,
  loadViewModelStateRequest,
  loadViewModelStateSuccess,
  loadViewModelStateFailure,
  dropViewModelState,
  connectReadModel,
  disconnectReadModel,
  loadReadModelStateRequest,
  loadReadModelStateSuccess,
  loadReadModelStateFailure,
  applyReadModelDiff,
  dropReadModelState,
  hotModuleReplacement
}
