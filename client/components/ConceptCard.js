import React from 'react'
import { connect } from 'react-redux'
import { Menu, Dropdown, Button } from 'semantic-ui-react'
import { confirmConcept } from '../store/reducer'

const options = [
  {key: 1, text: 'yes',       value: 'yes'      },
  {key: 2, text: 'no',        value: 'no'       },
  {key: 3, text: 'not sure',  value: 'not sure' }
]

class ConceptCard extends React.Component {
  constructor() {
    super()
    this.state = {
      status: '',
      disabledButton: false
    }
  }

  handleSubmit = evt => {
    evt.preventDefault()
    let setVal
    if (this.state.status === 'yes') setVal = true
    else if (this.state.status === 'no') setVal = false
    this.setState({disabledButton: true})
    const conceptObj = {
      id: this.props.concept.name,
      value: setVal
    }
    this.props.confirmConcept(conceptObj)
  }

  handleChange = evt => {
    this.setState({
      status: evt.target.innerText
    })
  }

  render () {
    if (this.state.disabledButton) {
      return (
        <div>
          <p>Thank you!</p>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoLQnPvsOiPDucMZn6Ou_LUr_YBHjC76uIoTfnzQOy7V9LBIrd" />
          <p>Hit the train button when you're finished!</p>
        </div>
      )
    } else {
      return (
        <div>
          <h5>I am {(this.props.concept.value * 100).toFixed(4)}% sure this picture is a</h5>
          <h2>{this.props.concept.name}</h2>
          {this.props.status === 'success' &&
            <form onSubmit={this.handleSubmit}>
              <h5>Is this picture a {this.props.concept.name}?</h5>
              <Menu compact>
                <Dropdown
                  placeholder='Select...'
                  options={options}
                  onChange={this.handleChange}
                />
              </Menu>
              <br />
              <Button
              type="submit"
              content="help me learn!"
              align='center'
              disabled={this.state.disabledButton}
              />
            </form>
          }
        </div>
      )
    }
  }
}

const mapDispatch = dispatch => {
  return {
    confirmConcept: conceptObj => dispatch(confirmConcept(conceptObj))
  }
}

export default connect(null, mapDispatch)(ConceptCard)
