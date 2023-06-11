import { configureStore } from '@reduxjs/toolkit'
import appControls from './appControls'
// import userAuth from './userAuth'

export default configureStore({
  reducer: {
    appControls,
    // userAuth,
  },
  devTools: process.env.NODE_ENV !== 'production',
})