export const UserActions = {
    CREATE_USER: 'CREATE_USER',
    LOGIN_USER: 'LOGIN_USER',
    LOGOUT_USER: 'LOGOUT_USER',
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
    console.log("UserActions");
    return { type: UserActions.LOGOUT_USER }
}