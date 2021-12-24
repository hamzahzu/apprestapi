require('dotenv').config();
const mysql = require('mysql')

let mysqlConnection = mysql.createPool({

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: 100,
    queueLimit: 30,
    waitForConnection: true,
    acquireTimeout: 30000 // 30 second
})

module.exports = mysqlConnection;