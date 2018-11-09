import React from 'react'
import { Button } from 'semantic-ui-react'
import { addWithConcept } from '../../server/clarifai/app'

class myButton extends React.Component {
  constructor() {
    super()
    this.state = {
      conceptArr: []
    }
  }

  handleClick = () => {
    if (this.props.content === 'yes') {
      const conceptInfo = {id: this.props.concept, value: true}
      this.setState(prevState => {
        console.log('PREV STATE', prevState)
        return ({ conceptArr: [...prevState.conceptArr, conceptInfo]})
      })
    } else if (this.props.content === 'no') {
      const conceptInfo = {id: this.props.concept, value: false}
      this.setState(prevState => {
        console.log('PREV STATE', prevState)
        return ({ conceptArr: [...prevState.conceptArr, conceptInfo]})
      })
    }
    console.log(this.state.conceptArr)
  }

  render () {
    return (
    <Button
      content={this.props.content}
      onClick={this.handleClick} />
    )
  }
}

export default myButton
