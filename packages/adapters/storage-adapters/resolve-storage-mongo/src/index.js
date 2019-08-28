import { MongoClient } from 'mongodb'

import createAdapter from 'resolve-storage-base'

import connect from './connect'
import init from './init'
import loadEvents from './load-events'
import getLatestEvent from './get-latest-event'
import saveEvent from './save-event'
import drop from './drop'
import dispose from './dispose'
import exportStream from './export'
import importStream from './import'

export default createAdapter.bind(null, {
  connect,
  init,
  loadEvents,
  getLatestEvent,
  saveEvent,
  drop,
  dispose,
  export: exportStream,
  import: importStream,
  MongoClient
})
