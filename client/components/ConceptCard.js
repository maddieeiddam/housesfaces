import React from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'

const options = [
  {key: 1, text: 'yes',       value: 'yes'      },
  {key: 2, text: 'no',        value: 'no'       },
  {key: 3, text: 'not sure',  value: 'not sure' }
]

class ConceptCard extends React.Component {

  render () {
    return (
      <div>
        <h4>I am {(this.props.concept.value * 100).toFixed(4)}% sure this picture is a</h4>
        <h1>{this.props.concept.name}</h1>
        <h4>Is this picture a {this.props.concept.name}?</h4>
          <Menu compact>
            <Dropdown fluid placeholder='Select...' options={options} simple item />
          </Menu>
        <br />
        <br />
        <br />
      </div>
    )
  }
}

export default ConceptCard
