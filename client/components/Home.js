import React from 'react'
import { connect } from 'react-redux'
import { Container, Image, Input, Grid } from 'semantic-ui-react'
import { predict, listInputs } from '../../server/clarifai/app'
import { ConceptCard, Button } from './index'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputs: [], //array of all imageUrls already in the model
      imageUrl: '',
      uploadedImage: '',
      conceptArr: [],
      alertStatus: 'none'
    }
  }

  async componentDidMount() {
    const inputs = await listInputs()
    this.setState({
      inputs: inputs
    })
  }

  handleSubmit = async (evt) => {
    evt.preventDefault()
    const { imageUrl } = this.state
    const concepts = await predict(imageUrl)
    concepts.forEach(concept => {
      const conceptInfo = {
        id: concept.id,
        name: concept.name,
        value: concept.value * 100
      }
      this.setState(prevState => ({
        conceptArr: [...prevState.conceptArr, conceptInfo],
        uploadedImage: imageUrl,
        imageUrl: ''
      }))
    })
  }

  handleClick = (evt) => {
    console.log(evt)
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
          value={this.state.imageUrl}
          onChange={evt => this.setState({ [evt.target.name]: evt.target.value })}
        />
        <Button
          type="submit"
          content="Upload"
          align='center'
        />
      </form>
      <br />
      <Grid relaxed columns={4}>
        <Grid.Column>
          <Image
            src={this.state.uploadedImage}
            size='medium'
            rounded
            centered
          />
        </Grid.Column>
        {this.state.conceptArr.map(concept => {
          if (this.state.conceptArr.indexOf(concept) < 3) {
            return (
              <Grid.Column key={concept.id}>
                <ConceptCard concept={concept} handleClick={this.handleClick}/>
              </Grid.Column>
            )
          }
        })}
      </Grid>
    </Container>
    )
  }
}

// const mapState = state => {
//   return {
//     concepts: state.concepts
//   }
// }

export default Home
