import { createSlice } from '@reduxjs/toolkit'


export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    counter: [{id: 123, Nombre:'Daniel'}]
  },
  reducers: {
    agreagar: (state) => {
      state.counter.push({id:321, Nombre:'Damian'})
    },
  },
})


export const { agreagar } = counterSlice.actions