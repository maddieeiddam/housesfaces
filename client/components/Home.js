import React from 'react'
import { connect } from 'react-redux'
import { Container, Image, Input, Card, Button } from 'semantic-ui-react'
import { fetchInputs, fetchPredictions, addUrl, confirmConcept, train } from '../store/reducer'
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

  checkURL(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) !== null);
  }

  handleSubmit = evt => {
    evt.preventDefault()
    if (this.checkURL(this.state.urlInput)) {
      this.props.addUrl(this.state.urlInput)
      this.props.getPredictions(this.state.urlInput)
      if (this.props.prevInputs.includes(this.props.imageUrl)) {
        this.setState({
          urlInput: '',
          alertStatus: 'failure'
        })
      } else {
        this.setState({
          urlInput: '',
          alertStatus: 'success'
        })
      }
    } else {
      this.setState({
        urlInput: '',
        alertStatus: 'failure'
      })
    }
  }

  onTrain = evt => {
    evt.preventDefault()
    this.setState({
      alertStatus: 'trained'
    })
    this.props.trainModel()
  }

  render() {
    return (
    <Container align='center'>
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
      <Card.Group itemsPerRow={3}>
          {this.props.predictedConcepts.length > 0 &&
            this.props.predictedConcepts.map(concept => {
                return (
                  <Card key={concept.id} align='center'>
                    <ConceptCard
                      concept={concept}
                      status={this.state.alertStatus}
                    />
                  </Card>
                )
            })
          }
      </Card.Group>
      {this.props.confirmedConcepts.length > 0 &&
        <div>
          <br />
          <Button
              type="submit"
              content="train"
              align='center'
              onClick={this.onTrain}
            />
        </div>
      }
    </Container>
    )
  }
}

const mapState = ({predictedConcepts, imageUrl, prevInputs, confirmedConcepts}) => ({predictedConcepts, imageUrl, prevInputs, confirmedConcepts})

const mapDispatch = dispatch => {
  return {
    getUrls: () => {dispatch(fetchInputs())},
    getPredictions: url => {dispatch(fetchPredictions(url))},
    addUrl: url => dispatch(addUrl(url)),
    confirmConcept: () => dispatch(confirmConcept()),
    trainModel: () => dispatch(train())
  }
}

export default connect(mapState, mapDispatch)(Home)
