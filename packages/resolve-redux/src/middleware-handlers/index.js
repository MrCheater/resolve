import * as ActionTypes from '../action_types'

import sendCommandRequestHandler from './send_command_request_handler'
import sendCommandSuccessHandler from './send_command_success_handler'
import sendCommandFailureHandler from './send_command_failure_handler'
import subscribeTopicHandler from './subscribe_topic_handler'
import unsubscribeTopicHandler from './unsubscribe_topic_handler'
import connectViewmodelHandler from './connect_viewmodel_handler'
import disconnectViewmodelHandler from './disconnect_viewmodel_handler'
import loadViewmodelStateRequestHandler from './load_viewmodel_state_request_handler'
import loadViewmodelStateSuccessHandler from './load_viewmodel_state_success_handler'
import loadViewmodelStateFailureHandler from './load_viewmodel_state_failure_handler'
import dropViewmodelStateHandler from './drop_viewmodel_state_handler'
import connectReadmodelHandler from './connect_readmodel_handler'
import disconnectReadmodelHandler from './disconnect_readmodel_handler'
import loadReadmodelStateRequestHandler from './load_readmodel_state_request_handler'
import loadReadmodelStateSuccessHandler from './load_readmodel_state_success_handler'
import loadReadmodelStateFailureHandler from './load_readmodel_state_failure_handler'
import applyReadmodelDiffHandler from './apply_readmodel_diff_handler'
import dropReadmodelStateHandler from './drop_readmodel_state_handler'
import hotModuleReplacementHandler from './hot_module_replacement_handler'

const middlewareHandlers = {
  [ActionTypes.SEND_COMMAND_REQUEST]: sendCommandRequestHandler,
  [ActionTypes.SEND_COMMAND_SUCCESS]: sendCommandSuccessHandler,
  [ActionTypes.SEND_COMMAND_FAILURE]: sendCommandFailureHandler,
  [ActionTypes.SUBSCRIBE_TOPIC]: subscribeTopicHandler,
  [ActionTypes.UNSUBSCRIBE_TOPIC]: unsubscribeTopicHandler,
  [ActionTypes.CONNECT_VIEWMODEL]: connectViewmodelHandler,
  [ActionTypes.DISCONNECT_VIEWMODEL]: disconnectViewmodelHandler,
  [ActionTypes.LOAD_VIEWMODEL_STATE_REQUEST]: loadViewmodelStateRequestHandler,
  [ActionTypes.LOAD_VIEWMODEL_STATE_SUCCESS]: loadViewmodelStateSuccessHandler,
  [ActionTypes.LOAD_VIEWMODEL_STATE_FAILURE]: loadViewmodelStateFailureHandler,
  [ActionTypes.DROP_VIEWMODEL_STATE]: dropViewmodelStateHandler,
  [ActionTypes.CONNECT_READMODEL]: connectReadmodelHandler,
  [ActionTypes.DISCONNECT_READMODEL]: disconnectReadmodelHandler,
  [ActionTypes.LOAD_READMODEL_STATE_REQUEST]: loadReadmodelStateRequestHandler,
  [ActionTypes.LOAD_READMODEL_STATE_SUCCESS]: loadReadmodelStateSuccessHandler,
  [ActionTypes.LOAD_READMODEL_STATE_FAILURE]: loadReadmodelStateFailureHandler,
  [ActionTypes.APPLY_READMODEL_DIFF]: applyReadmodelDiffHandler,
  [ActionTypes.DROP_READMODEL_STATE]: dropReadmodelStateHandler,
  [ActionTypes.HOT_MODULE_REPLACEMENT]: hotModuleReplacementHandler
}

export default middlewareHandlers
