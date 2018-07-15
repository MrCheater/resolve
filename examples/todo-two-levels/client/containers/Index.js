import React from 'react'
import { connect } from 'react-redux'
import { connectViewModel, connectStaticBasedUrls } from 'resolve-redux'
import { bindActionCreators } from 'redux'
import { NavLink } from 'react-router-dom'
import {
  ListGroup,
  ListGroupItem,
  Form,
  Button,
  Image,
  FormControl
} from 'react-bootstrap'

const viewModelName = 'Lists'

const StaticBasedImage = connectStaticBasedUrls(['src'])(Image)

export const Index = ({ lists, createList, removeList }) => {
  const placeholder = 'New List'
  const createListFunc = () => {
    createList(`${Date.now()}`, {
      title: newList.value === '' ? placeholder : newList.value
    })
    newList.value = ''
  }

  let newList

  return (
    <div className="example-wrapper">
      <h1>To-Do Lists</h1>

      <ListGroup className="example-list">
        {lists.map(({ id, title }) => (
          <ListGroupItem key={id}>
            <NavLink to={`/${id}`}>{title}</NavLink>
            <StaticBasedImage
              className="example-close-button"
              src="/close-button.png"
              onClick={() => removeList(id)}
            />
          </ListGroupItem>
        ))}
      </ListGroup>

      <Form inline className="example-form">
        <FormControl
          className="example-form-control"
          type="text"
          placeholder={placeholder}
          inputRef={element => (newList = element)}
          onKeyPress={event => {
            if (event.charCode === 13) {
              event.preventDefault()
              createListFunc()
            }
          }}
        />
        <Button
          className="example-button"
          bsStyle="success"
          onClick={() => {
            createListFunc()
          }}
        >
          Add List
        </Button>
      </Form>
    </div>
  )
}

const mapStateToOptions = () => {
  return {
    viewModelName,
    aggregateIds: '*'
  }
}

const mapStateToProps = (state, { data }) => {
  return {
    lists: data
  }
}

const mapDispatchToProps = (dispatch, { aggregateActions }) =>
  bindActionCreators(aggregateActions, dispatch)

export default connectViewModel(mapStateToOptions)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Index)
)