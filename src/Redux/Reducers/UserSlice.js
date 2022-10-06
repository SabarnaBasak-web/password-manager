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
            if (!action.payload.isError) {
                return {
                    ...state,
                    userCreated: action.payload.isUserCreated,
                }
            } else {
                return {
                    ...state,
                    error: { message: action.payload.message },
                    userCreated: action.payload.isUserCreated
                }
            }
        },
        setUser: (state, action) => {
            return {
                ...state,
                user: { ...action.payload }
            }
        },
        setErrorMsg: (state, action) => {
            return {
                ...state,
                error: action.payload
            }
        },
    }
});

// Action creators are generated for each case reducer function
export const { setUserCreated, setErrorMsg, setUser } = userSlice.actions

export default userSlice.reducer