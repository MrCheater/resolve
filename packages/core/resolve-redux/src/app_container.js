import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import Routes from './routes'
import Providers from './providers'

class AppContainer extends React.PureComponent {
  render() {
    const {
      origin,
      rootPath,
      staticPath,
      aggregateActions,
      store,
      history,
      routes
    } = this.props

    return (
      <Providers
        origin={origin}
        rootPath={rootPath}
        staticPath={staticPath}
        aggregateActions={aggregateActions}
        store={store}
      >
        <ConnectedRouter history={history}>
          <Routes routes={routes} />
        </ConnectedRouter>
      </Providers>
    )
  }
}

export default AppContainer
