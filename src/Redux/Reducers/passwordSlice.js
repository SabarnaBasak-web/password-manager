import { createSlice } from '@reduxjs/toolkit'
import { decryptText } from '../../Crypto/CryptoConfig';

const initialState = {
  list: [],
  loading: true,
}

export const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    fetchData: (state, action) => {
      const data = action.payload;
      const updatedData = data.map(item => {
        const { password, ...rest } = item;
        const decrptPassword = decryptText(password);
        return { ...rest, password: decrptPassword };
      });
      return {
        ...state,
        list: updatedData,
        loading: false
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { fetchData } = passwordSlice.actions

export default passwordSlice.reducer