import React from 'react'
import { Button } from './index'

class ConceptCard extends React.Component {

  render () {
    return (
      <div>
        <h4>
          I am {this.props.concept.value}% sure this picture is a {this.props.concept.name}
        </h4>
        <h5>Is this picture a {this.props.concept.name}?</h5>
        <Button type="button" content='yes' concept={this.props.concept.name} />
        <Button type="button" content='no'  concept={this.props.concept.name} />
        <br />
        <br />
        <Button type="button" content='not sure'/>
      </div>
    )
  }
}

export default ConceptCard
