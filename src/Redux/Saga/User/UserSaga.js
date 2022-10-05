import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
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
    console.log("User", user);
    return {
        id: user.uid,
        email: user.email,
        displayName: user.displayName
    }
}

const logoutUser = async () => {
    const auth = getAuth();
    console.log("LogOut User", auth);
    await signOut(auth);
    return true;
}


// Create User handler
export function* signUpUser({ payload }) {
    try {
        let result = yield call(() => createUserAccount(payload));
        yield put(setUserCreated(result));
    } catch (err) {
        console.warn('Error', err);
        yield put(setErrorMsg('Unable to create account'));
    }
}

// Login User handler
export function* signInUser({ payload }) {
    try {
        let result = yield call(() => signInUserAccount(payload));
        yield put(setUser(result));
    } catch (err) {
        console.warn('Error', err);
        yield put(setErrorMsg('Unable to logging account'));
    }
}

// Logout User
export function* logout() {
    try {
        let result = yield call(() => logoutUser());
        if (result) {
            yield put(setUser({}))
        }
    } catch (err) {
        console.warn("Error something went wrong!!");
        yield put(setErrorMsg("Error while logging out "))
    }
}