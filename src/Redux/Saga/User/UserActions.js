export const UserActions = {
    CREATE_USER: 'CREATE_USER',
    LOGIN_USER: 'LOGIN_USER',
    LOGOUT_USER: 'LOGOUT_USER',
    UPDATE_PASSWORD: 'UPDATE_PASSWORD',
}

export const signUpUserAction = (payload) => ({
    type: UserActions.CREATE_USER,
    payload
})

export const signInUserAction = (payload) => ({
    type: UserActions.LOGIN_USER,
    payload
})

export const logout = () => {
    return { type: UserActions.LOGOUT_USER }
}

export const updateUserPassword = (payload) => ({
    type: UserActions.UPDATE_PASSWORD,
    payload
})