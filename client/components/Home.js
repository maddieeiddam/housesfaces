import React from 'react'
import { connect } from 'react-redux'
import { Container, Image, Input, Grid, Button } from 'semantic-ui-react'
import { fetchInputs, fetchPredictions, addUrl, confirmConcept } from '../store/reducer'
import { ConceptCard } from './index'

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
      <form onSubmit={this.handleSubmit}>
        <Input
          fluid
          placeholder='Upload an image...'
          type="text"
          name="imageUrl"
          value={this.state.urlInput}
          onChange={evt => this.setState({ urlInput: evt.target.value })}
        />
        <Button
          type="submit"
          content="Upload"
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
      <Grid columns={3} centered>
          {this.props.predictedConcepts.length > 0 &&
            this.props.predictedConcepts.map(concept => {
                return (
                  <Grid.Column key={concept.id} textAlign='centered'>
                    <ConceptCard concept={concept} />
                  </Grid.Column>
                )
            })
          }
      </Grid>
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
