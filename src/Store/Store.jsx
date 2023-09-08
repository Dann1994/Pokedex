import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './Slices/Counter/Counter'

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
})