import axios from 'axios'
import history from '../history'

//action types
const ADD_CONCEPT = 'ADD_CONCEPT'

//initial state
const defaultConcepts = []

//action creators
export const addConcept = concept => ({type: ADD_CONCEPT, concept})

//thunk creators
// export const me = () => async dispatch => {
//   try {
//     const res = await axios.get('/auth/me')
//     dispatch(getUser(res.data || defaultUser))
//   } catch (err) {
//     console.error(err)
//   }
// }

//reducer
export default function(state = defaultConcepts, action) {
  switch (action.type) {
    case ADD_CONCEPT:
      return [...state, action.concept]
    default:
      return state
  }
}
