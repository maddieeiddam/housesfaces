import { listInputs, predict, addWithConcept, trainModel } from '../../server/clarifai/app'

//initial state
const initialState = {
  imageUrl: '',
  confirmedConcepts: [],
  predictedConcepts: [],
  prevInputs: [],

}

//action types
const ADD_URL = 'ADD_URL'
const CONFIRM_CONCEPT = 'CONFIRM_CONCEPT'
const GET_INPUTS = 'GET_INPUTS'
const GET_PREDICTIONS = 'GET_PREDICTIONS'
const TRAIN_MODEL = 'TRAIN'

//action creators
export const addUrl = url => {
  return {type: ADD_URL, url}
}
export const confirmConcept = conceptObj => {
  return {type: CONFIRM_CONCEPT, conceptObj}
}

export const train = () => {
  console.log('IN ACTION CREATOR')
  return {type: TRAIN_MODEL}
}

const getInputs = inputs => ({type: GET_INPUTS, inputs})
const getPredictions = predArr => ({type: GET_PREDICTIONS, predArr})

//thunk creators
export const fetchInputs = () => async dispatch => {
  const inputs = await listInputs()
  dispatch(getInputs(inputs))
}

export const fetchPredictions = url => async dispatch => {
  const predArr = await predict(url)
  dispatch(getPredictions(predArr))
}

//reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_URL:
      return {...state, imageUrl: action.url}
    case CONFIRM_CONCEPT:
      return {...state, confirmedConcepts: [...state.confirmedConcepts, action.conceptObj]}
    case GET_INPUTS:
      return {...state, prevInputs: action.inputs}
    case GET_PREDICTIONS:
      return {...state, predictedConcepts: action.predArr}
    case TRAIN_MODEL:
      addWithConcept(state.imageUrl, state.confirmedConcepts)
      trainModel()
      return state
    default:
      return state
  }
}
