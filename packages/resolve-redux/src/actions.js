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

export const sendCommandRequest = (command, aggregateId, aggregateName, payload) => ({
  type: SEND_COMMAND_REQUEST,
  command,
  aggregateId,
  aggregateName,
  payload
})

export const sendCommandSuccess = (command, aggregateId, aggregateName, payload) => ({
  type: SEND_COMMAND_SUCCESS,
  command,
  aggregateId,
  aggregateName,
  payload
})

export const sendCommandFailure = (
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

export const subscibeTopic = (appId, topicName, topicId) => ({
  type: SUBSCRIBE_TOPIC,
  appId,
  topicName,
  topicId
})

export const unsubscibeTopic = (appId, topicName, topicId) => ({
  type: UNSUBSCRIBE_TOPIC,
  appId,
  topicName,
  topicId
})

export const connectViewModel = (viewModelName, aggregateIds) => ({
  type: CONNECT_VIEWMODEL,
  viewModelName,
  aggregateIds
})

export const disconnectViewModel = (viewModelName, aggregateIds) => ({
  type: DISCONNECT_VIEWMODEL,
  viewModelName,
  aggregateIds
})

export const loadViewModelStateRequest = (viewModelName, aggregateIds) => ({
  type: LOAD_VIEWMODEL_STATE_REQUEST,
  viewModelName,
  aggregateIds
})

export const loadViewModelStateSuccess = (viewModelName, aggregateIds, state) => ({
  type: LOAD_VIEWMODEL_STATE_SUCCESS,
  viewModelName,
  aggregateIds,
  state
})

export const loadViewModelStateFailure = (viewModelName, aggregateIds, error) => ({
  type: LOAD_VIEWMODEL_STATE_FAILURE,
  viewModelName,
  aggregateIds,
  error
})

export const dropViewModelState = (viewModelName, aggregateIds) => ({
  type: DROP_VIEWMODEL_STATE,
  viewModelName,
  aggregateIds
})

export const connectReadModel = (
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

export const disconnectReadModel = (
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

export const loadReadModelStateRequest = (
  readModelName,
  resolverName,
  resolverArgs
) => ({
  type: LOAD_READMODEL_STATE_REQUEST,
  readModelName,
  resolverName,
  resolverArgs
})

export const loadReadModelStateSuccess = (
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

export const loadReadModelStateFailure = (
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

export const applyReadModelDiff = (
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

export const dropReadModelState = (readModelName, resolverName, resolverArgs) => ({
  type: DROP_READMODEL_STATE,
  readModelName,
  resolverName,
  resolverArgs
})

export const hotModuleReplacement = () => ({
  type: HOT_MODULE_REPLACEMENT,
  hotModuleReplacementId: uuid()
})
