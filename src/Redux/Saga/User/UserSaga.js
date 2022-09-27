import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { call, put } from 'redux-saga/effects';
import { setUserCreated, setErrorMsg } from "../../Reducers/UserSlice";


// functions related to user creation and login to the app
const createUserAccount = async ({ userEmail, password }) => {
    const auth = getAuth();
    const response = await createUserWithEmailAndPassword(auth, userEmail, password);
    const user = response.user;
    console.log("[FirebaseSaga] user ", user);
    return !!user.uid;
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