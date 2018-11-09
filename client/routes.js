import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import { Home } from './components'

class Routes extends Component {

  render() {
    return (
      <Home />
    )
  }
}

export default withRouter(Routes)

