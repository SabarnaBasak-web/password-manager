import {AES, Utf8} from "jscrypto/es6";

export const encryptText = (password)=>{
    const encryptText = AES.encrypt(password,process.env.REACT_APP_SECRET_SALT).toString();
    return encryptText    
}

export const decryptText = (encryptText)=>{
    return AES.decrypt(encryptText,process.env.REACT_APP_SECRET_SALT).toString(Utf8);
}