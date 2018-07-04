import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import Splitter from '../components/Splitter'
import * as userActions from '../actions/userActions'

// TODO remove
import { createActions } from 'resolve-redux'
import userCommands from '../../common/aggregates/user.commands'
import storyCommands from '../../common/aggregates/story.commands'
const aggregateActions = {
  ...createActions({
    name: 'user',
    commands: userCommands
  }),
  ...createActions({
    name: 'story',
    commands: storyCommands
  })
}

const Link = styled(NavLink)`
  color: white;

  &.active {
    font-weight: bold;
    text-decoration: underline;
  }
`

const PageAuth = styled.div`
  float: right;
`

const LoginInfo = ({ me }) => (
  <PageAuth>
    {me && me.id ? (
      <div>
        <Link to={`/user/${me.id}`}>{me.name}</Link>
        <Splitter color="white" />
        <Link
          to="/"
          onClick={() =>
            document.getElementById('hidden-form-for-logout').submit()
          }
        >
          logout
        </Link>
        <form method="post" id="hidden-form-for-logout" action="/logout">
          <input type="hidden" name="username" value="null" />
          <input type="hidden" />
        </form>
      </div>
    ) : (
      <Link to="/login">login</Link>
    )}
  </PageAuth>
)

export const mapStateToProps = state => ({
  me: state.jwt
})

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logout: userActions.logout
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginInfo)
