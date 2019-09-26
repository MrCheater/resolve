import {
  TODO_LIST_CREATED,
  TODO_LIST_RENAMED,
  TODO_LIST_REMOVED,
  TODO_ITEM_CREATED,
  TODO_ITEM_TOGGLED,
  TODO_ITEM_REMOVED
} from '../event-types'

export const name = 'Todo'

export const projection = {
  Init: () => ({}),
  [TODO_LIST_CREATED]: (state, { timestamp }) => ({
    ...state,
    createdAt: timestamp
  }),
  [TODO_LIST_REMOVED]: () => ({})
}

export const commands = {
  createList: (state, { payload: { name } }) => {
    if (state.createdAt) {
      throw new Error('Todo List already exists')
    }
    if (!name) {
      throw new Error(`The "name" field is required`)
    }

    return {
      type: TODO_LIST_CREATED,
      payload: { name }
    }
  },
  renameList: (state, { payload: { name } }) => {
    if (!state.createdAt) {
      throw new Error('Todo List does not exist')
    }

    if (!name) {
      throw new Error(`The "name" field is required`)
    }

    return {
      type: TODO_LIST_RENAMED,
      payload: { name }
    }
  },
  removeList: state => {
    if (!state.createdAt) {
      throw new Error('Todo List does not exist')
    }

    return {
      type: TODO_LIST_REMOVED
    }
  },
  createItem: (state, { payload: { id, text } }) => {
    if (!state.createdAt) {
      throw new Error('Todo List does not exist')
    }

    if (!id) {
      throw new Error(`The "id" field is required`)
    }
    if (!text) {
      throw new Error(`The "text" field is required`)
    }

    return {
      type: TODO_ITEM_CREATED,
      payload: { id, text }
    }
  },
  toggleItem: (state, { payload: { id } }) => {
    if (!state.createdAt) {
      throw new Error('Todo List does not exist')
    }

    if (!id) {
      throw new Error(`The "id" field is required`)
    }

    return {
      type: TODO_ITEM_TOGGLED,
      payload: { id }
    }
  },
  removeItem: (state, { payload: { id } }) => {
    if (!state.createdAt) {
      throw new Error('Todo List does not exist')
    }

    if (!id) {
      throw new Error(`The "id" field is required`)
    }

    return {
      type: TODO_ITEM_REMOVED,
      payload: { id }
    }
  }
}
