import sinon from 'sinon'

import createAdapter from '../src/create-adapter'

test('createAdapter should return the correct interface', async () => {
  const connect = sinon.stub()
  const init = sinon.stub()
  const loadEvents = sinon.stub()
  const importStream = sinon.stub()
  const exportStream = sinon.stub()
  const getLatestEvent = sinon.stub()
  const saveEvent = sinon.stub()
  const drop = sinon.stub()
  const dispose = sinon.stub()

  const wrapMethod = sinon
    .stub()
    .callsFake((pool, method) => async (...args) => {
      await method(pool, ...args)
    })
  const db = {
    /* mock */
  }
  const wrapEventFilter = sinon
    .stub()
    .callsFake(func => async (...args) => await func(...args))
  const wrapDispose = sinon
    .stub()
    .callsFake((pool, func) => async (...args) => await func(...args))

  const validateEventFilter = jest.fn()

  const prepare = sinon.stub()
  const options = {}

  const adapter = createAdapter(
    {
      prepare,
      wrapMethod,
      wrapEventFilter,
      wrapDispose,
      validateEventFilter
    },
    {
      connect,
      init,
      loadEvents,
      getLatestEvent,
      saveEvent,
      drop,
      dispose,
      import: importStream,
      export: exportStream,
      db
    },
    options
  )

  await adapter.loadEvents()
  await adapter.getLatestEvent()
  await adapter.saveEvent()
  await adapter.drop()
  await adapter.dispose()
  await adapter.import()
  await adapter.export()

  expect(loadEvents.callCount).toEqual(1)
  expect(getLatestEvent.callCount).toEqual(1)
  expect(saveEvent.callCount).toEqual(1)
  expect(dispose.callCount).toEqual(1)
  expect(drop.callCount).toEqual(1)
  expect(importStream.callCount).toEqual(1)
  expect(exportStream.callCount).toEqual(1)

  expect(wrapMethod.callCount).toEqual(6)
})
