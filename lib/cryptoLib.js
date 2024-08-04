const CryptoJS = require('crypto-js');

//#region AES

// Function to encrypt a text
export function encrypt(text, masterKey) {
    const keyHash = CryptoJS.SHA256(masterKey).toString(CryptoJS.enc.Hex).slice(0, 32);
    const key = CryptoJS.enc.Hex.parse(keyHash);
    const iv = CryptoJS.enc.Hex.parse('0102030405060708090a0b0c0d0e0f10');
    const encrypted = CryptoJS.AES.encrypt(text, key, { iv: iv });
    return encrypted.toString();
}
  
// Function to decrypt a text
export function decrypt(encryptedText, masterKey) {
    const keyHash = CryptoJS.SHA256(masterKey).toString(CryptoJS.enc.Hex).slice(0, 32);
    const key = CryptoJS.enc.Hex.parse(keyHash);
    const iv = CryptoJS.enc.Hex.parse('0102030405060708090a0b0c0d0e0f10');
    const decrypted = CryptoJS.AES.decrypt(encryptedText, key, { iv: iv });
    return decrypted.toString(CryptoJS.enc.Utf8);
}
  
  //#endregion