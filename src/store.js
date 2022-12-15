import { createStore } from 'redux'

const initialState = {
  sidebarShow: true,
  email: '',
  password: '',
  username: '',
  name: '',
}

// const userProfile = createReducer({
//   email: (state, action) => {
//     state.email = action.payload
//   },
//   password: (state, action) => {
//     state.password = action.payload
//   },
//   username: (state, action) => {
//     state.username = action.payload
//   },
//   name: (state, action) => {
//     state.name = action.payload
//   },
// })

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    case 'userAuth':
      return { ...state, ...rest }
    case 'register':
      return { ...state, ...rest }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store
