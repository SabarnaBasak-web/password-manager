export const UserActions = {
    CREATE_USER: 'CREATE_USER'
}

export const signUpUserAction = (payload) => ({
    type: UserActions.CREATE_USER,
    payload
})

