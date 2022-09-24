import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: [],
  loading: true,
  user: {},
  error: '',
}

export const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    fetchData: (state, action) => {
      return {
        list: action.payload,
        loading: false
      }
    },
    setUser: (state, action) => {
      return {
        user: action.payload
      }
    },
    setErrorMsg: (state, action) => {
      return {
        error: action.payload
      }
    },
    getUser: (state) => {
      return state.user;
    },
    getErrorMsg: (state) => {
      return state.error;
    }
  },
})

// Action creators are generated for each case reducer function
export const { fetchData, setUser, setErrorMsg } = passwordSlice.actions

export default passwordSlice.reducer