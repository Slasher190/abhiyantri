import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../Reducers/Reducer'

const store = configureStore({
  reducer: {
    custom: userReducer,
  },
})
export default store