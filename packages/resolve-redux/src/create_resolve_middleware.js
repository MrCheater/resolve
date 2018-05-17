import createSagaMiddleware from 'redux-saga'

import rootSaga from './root_saga'

const createResolveMiddleware = (isClient) => {
  const saga = isClient ? rootSaga : function*() {}

  const sagaMiddleware = createSagaMiddleware()

  sagaMiddleware.run = sagaMiddleware.run.bind(sagaMiddleware, saga)
  
  return sagaMiddleware
}

export default createResolveMiddleware
