import React from 'react'
import { connect } from 'react-redux'
import { Container, Image, Input, Card, Button } from 'semantic-ui-react'
import { fetchInputs, fetchPredictions, addUrl, confirmConcept } from '../store/reducer'
import { ConceptCard, Flagger } from './index'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      urlInput: '',
      alertStatus: 'none'
    }
  }

  componentDidMount() {
    this.props.getUrls()
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    this.props.addUrl(this.state.urlInput)
    this.props.getPredictions(this.state.urlInput)
    this.setState({
      urlInput: ''
    })
  }

  render() {
    return (
    <Container textAlign='center'>
      <Flagger status={this.state.alertStatus} />
      <form onSubmit={this.handleSubmit}>
        <Input
          fluid
          placeholder='upload an image...'
          type="text"
          name="imageUrl"
          value={this.state.urlInput}
          onChange={evt => this.setState({ urlInput: evt.target.value })}
        />
        <Button
          type="submit"
          content="upload"
          align='center'
        />
      </form>
      <br />
      {this.props.imageUrl.length > 0 &&
            <Image
              src={this.props.imageUrl}
              size='medium'
              rounded
              centered
            />
      }
      <br />
      <form>
      <Card.Group itemsPerRow={3}>
          {this.props.predictedConcepts.length > 0 &&
            this.props.predictedConcepts.map(concept => {
                return (
                  <Card key={concept.id} textAlign='center'>
                    <ConceptCard concept={concept} status={this.state.alertStatus} />
                  </Card>
                )
            })
          }
      </Card.Group>
      {this.props.predictedConcepts.length > 0 && this.state.alertStatus === 'success' &&
        <Button
            type="submit"
            content="help me learn!"
            align='center'
        />
      }
      </form>
    </Container>
    )
  }
}

const mapState = ({predictedConcepts, imageUrl, prevInputs}) => ({predictedConcepts, imageUrl, prevInputs})

const mapDispatch = dispatch => {
  return {
    getUrls: () => {dispatch(fetchInputs())},
    getPredictions: url => {dispatch(fetchPredictions(url))},
    addUrl: url => dispatch(addUrl(url)),
    confirmConcept: () => dispatch(confirmConcept())
  }
}

export default connect(mapState, mapDispatch)(Home)
