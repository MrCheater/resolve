import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import Routes from './routes'
import Providers from './providers'
import { Route } from 'react-router'

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
        <Route
          render={props => {
            console.log('!!!!!!!!!!!!!!!!!')
            console.log(props)
            if (props.staticContext) {
              props.staticContext.statusCode = 404
            }
            return null
          }}
        />
        <ConnectedRouter history={history}>

          <Routes routes={routes} />
        </ConnectedRouter>
      </Providers>
    )
  }
}

export default AppContainer
