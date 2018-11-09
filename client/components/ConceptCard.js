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
        <h5>I am {(this.props.concept.value * 100).toFixed(4)}% sure this picture is a</h5>
        <h2>{this.props.concept.name}</h2>
        {this.props.status === 'success' &&
          <div>
            <h5>Is this picture a {this.props.concept.name}?</h5>
            <Menu compact>
              <Dropdown placeholder='Select...' options={options} />
            </Menu>
          </div>
        }
      </div>
    )
  }
}

export default ConceptCard
