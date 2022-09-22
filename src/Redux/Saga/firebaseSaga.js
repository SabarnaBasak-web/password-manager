import { call, put, takeEvery } from 'redux-saga/effects';
import { getDocs, collection, doc, updateDoc, deleteDoc, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { database } from '../../firebase/firebaseConfig';
import { fetchData, setUser, setErrorMsg } from '../Reducers/passwordSlice';
import { firebaseActions } from './firebaseActions';
import { encryptText } from '../../Crypto/CryptoConfig';

// functions related to user creation and login to the app
const createUserAccount = async ({ userEmail, password }) => {
    const auth = getAuth();
    const response = await createUserWithEmailAndPassword(auth, userEmail, password);
    const user = response.user;
    return user;
}

// function related to firestore 
const getAllPasswords = async () => {
    const data = [];
    const querySnapshot = await getDocs(collection(database, "password-lists"));
    querySnapshot.forEach(doc => {
        data.push(doc.data());
    })
    return data;
}

const updatePasswordDetail = async ({ docId, updateText, type }) => {
    const docRef = doc(database, "password-lists", `${docId}`);
    if (updateText && type) {
        if (type === 'password') {
            updateText = encryptText(updateText);
        }
        await updateDoc(docRef, {
            [`${type}`]: updateText
        })
    }
}

const deletePasswordEntry = async (docId) => {
    return await deleteDoc(doc(database, "password-lists", docId));
}

const createPasswordEntry = async ({ url, password, username, description }) => {
    const newEntryRef = doc(collection(database, "password-lists"));
    const encryptedPassword = encryptText(password);
    const createData = {
        url: url,
        id: newEntryRef.id,
        password: encryptedPassword,
        username: username,
        description: description,
    }
    return await setDoc(newEntryRef, createData);
}

export function* fetchAllPasswordsSaga() {
    try {
        let result = yield call(() => {
            return getAllPasswords();
        });
        yield put(fetchData(result))
    }
    catch (error) {
        console.warn("Error", error);
    }
}


export function* updateDetails({ payload }) {
    try {
        yield call(() => updatePasswordDetail(payload));
        yield fetchAllPasswordsSaga();
    } catch (error) {
        console.warn("Some Error occured");
    }
}

export function* deleteEntry({ payload }) {
    try {
        yield call(() => deletePasswordEntry(payload))
        yield fetchAllPasswordsSaga();
    } catch (err) {
        console.warn("Error", err)
    }
}

export function* createEntry({ payload }) {
    try {
        yield call(() => createPasswordEntry(payload))
        yield fetchAllPasswordsSaga();
    } catch (err) {
        console.warn('Error', err);
    }
}

// User signIn and signUp 
export function* signUpUser({ payload }) {
    try {
        let result = yield call(() => createUserAccount(payload));
        yield put(setUser(result));
    } catch (err) {
        console.warn('Error', err);
        yield put(setErrorMsg('Unable to create account'));
    }
}

export default function* rootSaga() {
    yield takeEvery(firebaseActions.FETCH_ALL_PASSWORDS, fetchAllPasswordsSaga);
    yield takeEvery(firebaseActions.UPDATE_A_PASSWORD, updateDetails);
    yield takeEvery(firebaseActions.DELETE_A_PASSWORD, deleteEntry);
    yield takeEvery(firebaseActions.CREATE_A_PASSWORD, createEntry);
    yield takeEvery(firebaseActions.CREATE_USER, signUpUser);
}
