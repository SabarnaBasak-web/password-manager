import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { call, put } from 'redux-saga/effects';
import { setUserCreated, setErrorMsg, setUser } from "../../Reducers/UserSlice";


// functions related to user creation and login to the app
const createUserAccount = async ({ userEmail, password }) => {
    const auth = getAuth();
    const response = await createUserWithEmailAndPassword(auth, userEmail, password);
    const user = response.user;
    return !!user.uid;
}

const signInUserAccount = async ({ userEmail, password }) => {
    const auth = getAuth();
    const response = await signInWithEmailAndPassword(auth, userEmail, password);
    const user = response.user;
    return user.email;
}
// User signIn and signUp 
export function* signUpUser({ payload }) {
    try {
        let result = yield call(() => createUserAccount(payload));
        yield put(setUserCreated(result));
    } catch (err) {
        console.warn('Error', err);
        yield put(setErrorMsg('Unable to create account'));
    }
}

export function* signInUser({ payload }) {
    try {
        let result = yield call(() => signInUserAccount(payload));
        yield put(setUser(result));
    } catch (err) {
        console.warn('Error', err);
        yield put(setErrorMsg('Unable to logging account'));
    }
}