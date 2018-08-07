import { actionTypes } from 'resolve-redux'

const { SEND_COMMAND_SUCCESS } = actionTypes

const optimisticShoppingListsMiddleware = store => next => action => {
  if (
    action.type === SEND_COMMAND_SUCCESS &&
    action.commandType === 'createList'
  ) {
    store.dispatch({
      type: 'OPTIMISTIC_CREATE_SHOPPING_LIST',
      payload: {
        id: action.aggregateId,
        name: action.payload.name
      }
    })
  }

  next(action)
}

export default optimisticShoppingListsMiddleware
