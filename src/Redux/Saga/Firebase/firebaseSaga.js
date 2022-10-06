import { call, put } from 'redux-saga/effects';
import { getDocs, collection, doc, updateDoc, deleteDoc, setDoc } from 'firebase/firestore';

import { database } from '../../../firebase/firebaseConfig';
import { fetchData } from '../../Reducers/passwordSlice';
import { encryptText } from '../../../Crypto/CryptoConfig';

// function related to firestore 
const getAllPasswords = async (id) => {
    const data = [];
    const querySnapshot = await getDocs(collection(database, "password-lists"));
    querySnapshot.forEach(doc => {
        if (doc.data().userId === id) data.push(doc.data());
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

const createPasswordEntry = async ({ url, password, username, description, id }) => {
    const newEntryRef = doc(collection(database, "password-lists"));
    const encryptedPassword = encryptText(password);
    const createData = {
        url: url,
        id: newEntryRef.id,
        password: encryptedPassword,
        username: username,
        description: description,
        userId: id
    }
    return await setDoc(newEntryRef, createData);
}

export function* fetchAllPasswordsSaga({ payload }) {
    try {
        let result = yield call(() => {
            return getAllPasswords(payload);
        });
        yield put(fetchData(result))
    }
    catch (error) {
        console.warn("Error", error);
    }
}


export function* updateDetails({ payload }) {

    const { id, ...rest } = payload;
    try {
        yield call(() => updatePasswordDetail(rest));
        yield fetchAllPasswordsSaga({ payload: id });
    } catch (error) {
        console.warn("Some Error occured");
    }
}

export function* deleteEntry({ payload }) {
    const { id, docId } = payload;
    try {
        yield call(() => deletePasswordEntry(docId))
        yield fetchAllPasswordsSaga({ payload: id });
    } catch (err) {
        console.warn("Error", err)
    }
}

export function* createEntry({ payload }) {
    try {
        yield call(() => createPasswordEntry(payload))
        yield fetchAllPasswordsSaga({ payload: payload.id });
    } catch (err) {
        console.warn('Error', err);
    }
}




