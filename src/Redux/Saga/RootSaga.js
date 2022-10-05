import { all, takeEvery } from 'redux-saga/effects';
import { firebaseActions } from './Firebase/firebaseActions';
import { UserActions } from './User/UserActions';
import { fetchAllPasswordsSaga, updateDetails, deleteEntry, createEntry } from './Firebase/firebaseSaga';
import { signUpUser, signInUser, logout } from './User/UserSaga';

export default function* rootSaga() {
    yield all([takeEvery(firebaseActions.FETCH_ALL_PASSWORDS, fetchAllPasswordsSaga),
    yield takeEvery(firebaseActions.UPDATE_A_PASSWORD, updateDetails),
    yield takeEvery(firebaseActions.DELETE_A_PASSWORD, deleteEntry),
    yield takeEvery(firebaseActions.CREATE_A_PASSWORD, createEntry),
    yield takeEvery(UserActions.CREATE_USER, signUpUser),
    yield takeEvery(UserActions.LOGIN_USER, signInUser),
    yield takeEvery(UserActions.LOGOUT_USER, logout)
    ])
}