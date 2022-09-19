import { createSlice } from '@reduxjs/toolkit'

const initialState = {  
  list: [],
  loading: true,
}

export const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    fetchData: (state, action)=>{      
      return {
        list: action.payload,
        loading: false
      }
    } 
  },
})

// Action creators are generated for each case reducer function
export const { fetchData } = passwordSlice.actions

export default passwordSlice.reducer