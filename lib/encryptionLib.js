const crypto = require('crypto');

const masterPassword = 'your_master_password';
const salt = crypto.randomBytes(16);
const key = crypto.scryptSync(masterPassword, salt, 32);

function encryptPassword(password) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    const encrypted = Buffer.concat([cipher.update(password, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();
    return { iv, encrypted, tag };
}

function decryptPassword(encryptedData) {
    const { iv, encrypted, tag } = encryptedData;
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(tag);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString('utf8');
}