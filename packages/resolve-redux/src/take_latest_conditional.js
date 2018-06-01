import { take, cancel, fork } from 'redux-saga/effects'
import stringify from 'json-stable-stringify'

const takeLatestConditional = (actionType, fieldNames, saga, ...args) =>
  fork(function*() {
    let taskMap = {}
    while (true) {
      const action = yield take(actionType)
      const key = stringify(
        fieldNames.reduce((acc, val) => {
          acc[val] = action[val]
          return acc
        }, {})
      )

      if (taskMap[key]) {
        yield cancel(taskMap[key])
      }
      taskMap[key] = yield fork(saga, ...args.concat(action))
    }
  })

export default takeLatestConditional
