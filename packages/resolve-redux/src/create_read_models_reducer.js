import {
  READMODEL_SUBSCRIPTION_DIFF,
  READMODEL_LOAD_INITIAL_STATE,
  READMODEL_DROP_STATE
} from './action_types'
import { applyChanges } from 'diff-json'

function copyResolveSerials(oldState, newState) {
  Object.getOwnPropertyNames(oldState).forEach(key => {
    const propertyDescriptor = Object.getOwnPropertyDescriptor(oldState, key)

    if (
      key.indexOf('resolve-serial:') !== 0 ||
      propertyDescriptor.enumerable ||
      propertyDescriptor.writable
    ) {
      return
    }

    Object.defineProperty(newState, key, propertyDescriptor)
  })
}

function refreshUpdatedObjects(updatedObject, changes, embededKey = '$index') {
  for (const {
    key,
    changes: nextChanges,
    embededKey: nextEmbededKey
  } of changes) {
    const calcKey =
      embededKey !== '$index' && Array.isArray(updatedObject)
        ? updatedObject.reduce(
            (result, value, idx) => (value[embededKey] === key ? idx : result),
            0
          )
        : key

    if (
      updatedObject[calcKey] == null ||
      updatedObject[calcKey].constructor === String ||
      updatedObject[calcKey].constructor === Number ||
      updatedObject[calcKey].constructor === Date
    ) {
      continue
    }

    if (Array.isArray(updatedObject[calcKey])) {
      updatedObject[calcKey] = [...updatedObject[calcKey]]
    } else {
      const nextObject = Object.create(
        Object.getPrototypeOf(updatedObject[calcKey])
      )
      Object.assign(nextObject, updatedObject[calcKey])
      updatedObject[calcKey] = nextObject
    }

    if (Array.isArray(nextChanges)) {
      refreshUpdatedObjects(updatedObject[calcKey], nextChanges, nextEmbededKey)
    }
  }
}

export default function createReadModelsReducer() {
  return (state = {}, action) => {
    switch (action.type) {
      case READMODEL_LOAD_INITIAL_STATE: {
        const { readModelName, resolverName, initialState, serialId } = action
        const nextState = {
          ...state,
          [readModelName]: {
            ...(state[readModelName] || {}),
            [resolverName]: initialState
          }
        }

        copyResolveSerials(state, nextState)
        Object.defineProperty(
          nextState,
          `resolve-serial:${readModelName}:${resolverName}`,
          {
            configurable: true,
            writable: false,
            enumerable: false,
            value: serialId
          }
        )

        return nextState
      }

      case READMODEL_DROP_STATE: {
        const { readModelName, resolverName } = action
        const nextState = {
          ...state,
          [readModelName]: {
            ...(state[readModelName] || {}),
            [resolverName]: null
          }
        }

        copyResolveSerials(state, nextState)
        delete nextState[`resolve-serial:${readModelName}:${resolverName}`]
        delete nextState[readModelName][resolverName]

        return nextState
      }

      case READMODEL_SUBSCRIPTION_DIFF: {
        const { readModelName, resolverName, serialId, diff } = action

        if (
          !state[readModelName] ||
          !state[readModelName].hasOwnProperty(resolverName) ||
          state[`resolve-serial:${readModelName}:${resolverName}`] !== serialId
        ) {
          return state
        }

        const wrappedResolverState = {
          wrap: state[readModelName][resolverName]
        }

        applyChanges(wrappedResolverState, diff)

        refreshUpdatedObjects(wrappedResolverState, diff)

        const nextState = {
          ...state,
          [readModelName]: {
            ...state[readModelName],
            [resolverName]: wrappedResolverState.wrap
          }
        }

        copyResolveSerials(state, nextState)

        return nextState
      }

      default:
        return state
    }
  }
}
