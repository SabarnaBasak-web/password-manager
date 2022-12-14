import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updatePassword } from "firebase/auth";
import { call, put } from 'redux-saga/effects';
import { setUserCreated, setErrorMsg, setUser, setPasswordUpdated } from "../../Reducers/UserSlice";


// functions related to user creation and login to the app
const createUserAccount = async ({ userEmail, password }) => {
    try {
        const auth = getAuth();
        const response = await createUserWithEmailAndPassword(auth, userEmail, password);
        const user = response.user;
        return { isError: false, isUserCreated: !!user.uid };
    } catch (error) {
        if (error.message.includes('email-already-in-use'))
            return { isError: true, message: 'Email already in use' }
    }
}

const signInUserAccount = async ({ userEmail, password }) => {
    const auth = getAuth();
    try {
        const response = await signInWithEmailAndPassword(auth, userEmail, password);
        const user = response.user;
        return {
            id: user.uid,
            email: user.email,
            displayName: user.displayName,
            isLoggedIn: true,
        }
    } catch (error) {
        if (error.message.includes('wrong-password'))
            return {
                isLoggedIn: false,
                message: "incorrect username or password",
            }
    }
}

const logoutUser = async () => {
    const auth = getAuth();
    await signOut(auth);
    return true;
}

const updatePasswordHandler = async (newPassword) => {
    const auth = getAuth();
    const user = auth.currentUser;
    try {
        if (user) {
            await updatePassword(user, newPassword);
            return true;
        }

    } catch (error) {
        console.warn('Some error occured', error.message)
        return false;
    }
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
        const { isLoggedIn, ...rest } = result;
        if (isLoggedIn) {
            yield put(setUser(rest));
        } else {
            yield put(setErrorMsg(rest))
        }
    } catch (err) {
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
        yield put(setErrorMsg("Error while logging out "))
    }
}

// update user's password
export function* updateCurrentUserPassword({ payload }) {
    try {
        let result = yield call(() => updatePasswordHandler(payload))
        if (result) {
            console.log("result", result);
            yield put(setPasswordUpdated(result));
        }
    } catch (err) {
        console.warn(err);
    }
}