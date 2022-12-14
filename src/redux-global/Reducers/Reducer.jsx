import { createReducer } from '@reduxjs/toolkit'

const initialState = {
  email: '',
  password: '',
  username: '',
  name: '',
}

const userProfile = createReducer({
  email: (state, action) => {
    state.email = action.payload
  },
  password: (state, action) => {
    state.password = action.payload
  },
  username: (state, action) => {
    state.username = action.payload
  },
  name: (state, action) => {
    state.name = action.payload
  },
})
export default userProfile
