import React from 'react'
import { Route, Redirect, Switch } from 'react-router'

const NotFound = (
  <Route
    render={props => {
      console.log(props)
      if (props.staticContext) {
        props.staticContext.statusCode = 404
      }
      return null
    }}
  />
)

const Routes = props => {
  const { path, component: Component, routes, exact, redirectTo } = props

  if (redirectTo) {
    return (
      <Switch>
        <Redirect from={path} to={redirectTo} />
        {NotFound}
      </Switch>
    )
  }

  return routes ? (
    <Route
      path={path}
      exact={exact}
      render={props => {
        const content = (
          <Switch>
            {routes.map((route, index) => (
              <Routes key={index} {...route} />
            ))}
            {NotFound}
          </Switch>
        )
        return Component ? <Component {...props}>{content}</Component> : content
      }}
    />
  ) : (
    <Switch>
      <Route path={path} exact={exact} component={Component} />
      {NotFound}
    </Switch>
  )
}

export default Routes
