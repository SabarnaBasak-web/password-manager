export const firebaseActions = {
    FETCH_ALL_PASSWORDS: 'FETCH_ALL_PASSWORDS',
    CREATE_A_PASSWORD: 'CREATE_A_PASSWORD',
    UPDATE_A_PASSWORD: 'UPDATE_A_PASSWORD',
    DELETE_A_PASSWORD: 'DELETE_A_PASSWORD',
}

export const updateDetails = (payload) => ({
    type: firebaseActions.UPDATE_A_PASSWORD,
    payload,
});

export const deletePasswordEntry = (payload) => ({
    type: firebaseActions.DELETE_A_PASSWORD,
    payload,
});

export const createPasswordEntry = (payload) => ({
    type: firebaseActions.CREATE_A_PASSWORD,
    payload,
});
