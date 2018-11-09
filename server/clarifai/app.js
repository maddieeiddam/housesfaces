const Clarifai = require('clarifai')

const apiKey = '0ad45f3b24f948a5bc02e8dc2473866b'
const modelId = 'housesfaces'
const modelVersion = '09380999d48a4aed986a24a13b3dbc18'
const appId = 'fdabe17e26bb4a2dad0327f7cf9d084c'
const versionId = 'bf12c55c0343456097e460098b1ef2b3'

const app = new Clarifai.App({apiKey: apiKey})

//get predictions for a url input from general model
export const predict = async (url) => {
  const model = await app.models.initModel({id: 'housesfaces'})
  const response = await model.predict(url)
  const concepts = response.outputs[0].data.concepts
  return concepts
}

//providing training data to housesfaces
export const addWithConcept = async (url, conceptArr) => {
  try {
    const output = await app.inputs.create(
      { url: url,  concepts: conceptArr }
    )
    return output
  } catch (err) { console.log(err)}
}

//return all urls that have already been uploaded
export const listInputs = async () => {
  try {
    const inputs = await app.inputs.list({page: 1, perPage: 20})
    return inputs.rawData.map(input => {
      return input.data.image.url
    })
  } catch (err) { console.log(err)}
}

// create model: already run, no need to run again
const createModel = async () => {
  const model = await app.models.create(
    "housesfaces",
    [
      {"id": "house"},
      {"id": "face"},
      {"id": "houseface"}
    ]
  )
}

//train model on already uploaded inputs
export const trainModel = async () => {
  try {
    const trainedModel = await app.models.train({id: 'housesfaces' })
  } catch (err) { console.log(err)}
}

