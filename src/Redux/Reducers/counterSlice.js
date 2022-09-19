import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
  list: [],
  loading: true,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
    fetchData: (state, action)=>{
      console.log("All data", action.payload);
      return {
        list: action.payload,
        loading: false
      }
    } 
  },
})

console.log("Counter slice", counterSlice);
// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, fetchData } = counterSlice.actions

export default counterSlice.reducer