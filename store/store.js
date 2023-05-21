import { configureStore } from '@reduxjs/toolkit'
import appControls from './appControls'

export default configureStore({
  reducer: {
    appControls,
  },
})