import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    userCreated: false,
    error: '',
}

export const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        setUserCreated: (state, action) => {
            return {
                ...state,
                userCreated: action.payload,
            }
        },
        setUser: (state, action) => {
            return {
                ...state,
                user: action.payload
            }
        },
        setErrorMsg: (state, action) => {
            return {
                ...state,
                error: action.payload
            }
        },
        isUserCreated: (state) => {
            return state.userCreated;
        },
        getErrorMsg: (state) => {
            return state.error;
        }
    }
});

// Action creators are generated for each case reducer function
export const { setUserCreated, setErrorMsg } = userSlice.actions

export default userSlice.reducer