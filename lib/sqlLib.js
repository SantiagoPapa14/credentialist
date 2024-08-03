const mysql = require('mysql2');
const encrypter = require('./encryptionLib');

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