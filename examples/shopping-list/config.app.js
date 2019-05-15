const appConfig = {
  routes: 'client/routes.js',
  staticDir: 'static',
  distDir: 'dist',
  redux: {
    reducers: {
      optimisticShoppingLists: 'client/reducers/optimistic-shopping-lists.js'
    },
    middlewares: ['client/middlewares/optimistic-shopping-lists-middleware.js']
  },
  aggregates: [
    {
      name: 'ShoppingList',
      commands: 'common/aggregates/shopping-list.commands.js',
      projection: 'common/aggregates/shopping-list.projection.js'
    }
  ],
  viewModels: [
    {
      name: 'ShoppingList',
      projection: 'common/view-models/shopping-list.projection.js'
    }
  ],
  readModels: [
    {
      name: 'ShoppingLists',
      projection: 'common/read-models/shopping-lists.projection.js',
      resolvers: 'common/read-models/shopping-lists.resolvers.js',
      connectorName: 'default'
    }
  ],
  apiHandlers: [
    {
      path: 'shopping-lists.json',
      controller: 'common/api-handlers/shopping-lists.js',
      method: 'GET'
    }
  ]
}

export default appConfig
