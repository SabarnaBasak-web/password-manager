import { call, put, takeEvery } from 'redux-saga/effects';
import { getDocs, collection, doc, updateDoc, deleteDoc, setDoc } from 'firebase/firestore';
import { database } from '../../firebase/firebaseConfig';
import { fetchData } from '../Reducers/counterSlice';
import { firebaseActions } from './firebaseActions';
import { encryptText } from '../../Crypto/CryptoConfig';

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
    console.log("CreatePassword", url, password, username, description)
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
        console.log("Data", result);
        yield put(fetchData(result))
    }
    catch (error) {
        console.log("Error", error);
    }
}


export function* updateDetails({ payload }) {
    console.log("Update details", payload);
    try {
        const result = yield call(() => updatePasswordDetail(payload));
        console.log("Result", result);
        yield fetchAllPasswordsSaga();
    } catch (error) {
        console.log("Some Error occured");
    }
}

export function* deleteEntry({ payload }) {
    console.log("DocId", payload);
    try {
        const result = yield call(() => deletePasswordEntry(payload))
        console.log("Result", result);
        yield fetchAllPasswordsSaga();
    } catch (err) {
        console.log("Error", err)
    }
}

export function* createEntry({payload}){
    try{
        console.log("Payload", payload);
        yield call(()=> createPasswordEntry(payload))
        yield fetchAllPasswordsSaga();
    }catch(err){
        console.log('Error', err);
    }
}

export default function* rootSaga() {
    yield takeEvery(firebaseActions.FETCH_ALL_PASSWORDS, fetchAllPasswordsSaga);
    yield takeEvery(firebaseActions.UPDATE_A_PASSWORD, updateDetails);
    yield takeEvery(firebaseActions.DELETE_A_PASSWORD, deleteEntry)
    yield takeEvery(firebaseActions.CREATE_A_PASSWORD, createEntry)
}
