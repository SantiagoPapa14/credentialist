import 'server-only';
const mysql = require('mysql2');
const CryptoJS = require('crypto-js');

//#region SQL

const mysql2Credentials = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    port: process.env.MYSQL_PORT,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}
var pool = mysql.createPool(mysql2Credentials).promise();

export async function selectServicesAndUsernames() {
    const query ='SELECT id, service, username FROM credentials';
    const [rows] = await pool.execute(query);
    return rows;
}

export async function getPassword(service, username) {
    const query = 'SELECT password FROM credentials WHERE service = ? AND username = ?';
    const [rows] = await pool.execute(query, [service, username]);
    return rows;
}

//#endregion

//#region AES

// Function to encrypt a text
export function encrypt(text, masterKey) {
  // Create a 256-bit hash of the master key and use the first 16 bytes (128 bits) for AES-128
  const keyHash = CryptoJS.SHA256(masterKey).toString(CryptoJS.enc.Hex).slice(0, 32);
  const key = CryptoJS.enc.Hex.parse(keyHash);
  
  // Create an initialization vector (IV)
  const iv = CryptoJS.enc.Hex.parse('0102030405060708090a0b0c0d0e0f10');

  // Encrypt the text
  const encrypted = CryptoJS.AES.encrypt(text, key, { iv: iv });
  return encrypted.toString();
  }

// Function to decrypt a text
export function decrypt(encryptedText, masterKey) {
    // Create a 256-bit hash of the master key and use the first 16 bytes (128 bits) for AES-128
    const keyHash = CryptoJS.SHA256(masterKey).toString(CryptoJS.enc.Hex).slice(0, 32);
    const key = CryptoJS.enc.Hex.parse(keyHash);
    
    // Create an initialization vector (IV)
    const iv = CryptoJS.enc.Hex.parse('0102030405060708090a0b0c0d0e0f10');
  
    // Decrypt the text
    const decrypted = CryptoJS.AES.decrypt(encryptedText, key, { iv: iv });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

//#endregion

