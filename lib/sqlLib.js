const mysql = require('mysql2');

const mysql2Credentials = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    port: process.env.MYSQL_PORT,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}
var pool = mysql.createPool(mysql2Credentials).promise();

async function selectCredentialsByService(service) {
    const query ='SELECT * FROM credentials WHERE service = ?';
    const [rows] = await pool.execute(query, [service]);
    return rows;
}

export async function selectCredentials() {
    console.log(mysql2Credentials);
    const query ='SELECT * FROM credentials';
    const [rows] = await pool.execute(query);
    return rows;
}