import React from 'react'
import { StyleSheet } from 'react-native'
import { Footer, FooterTab, Form, Input, Item, Label } from 'native-base'
import uuid from 'uuid/v4'

const styles = StyleSheet.create({
  footer: {
    height: 80
  },
  label: {
    color: '#fff',
    marginBottom: 5
  },
  input: {
    color: '#000',
    backgroundColor: '#fff'
  }
})

class ShoppingListCreator extends React.PureComponent {
  state = {
    text: ''
  }

  updateText = text => {
    this.setState({
      text
    })
  }

  createShoppingList = () => {
    this.props.createShoppingList(uuid(), { name: this.state.text })
    this.setState({
      text: ''
    })
  }

  render() {
    return (
      <Footer style={styles.footer}>
        <FooterTab>
          <Form>
            <Item stackedLabel>
              <Label style={styles.label}>Shopping list name:</Label>
              <Input
                style={styles.input}
                value={this.state.text}
                onChangeText={this.updateText}
                onSubmitEditing={this.createShoppingList}
                returnKeyType="done"
                returnKeyLabel="done"
              />
            </Item>
          </Form>
        </FooterTab>
      </Footer>
    )
  }
}

export default ShoppingListCreator
