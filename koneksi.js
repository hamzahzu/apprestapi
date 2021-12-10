var mysql = require('mysql');

//koneksi database
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    db: "node_mysql"
})

conn.connect((err) => {
    if (err) throw err;
    console.log('MySQL terkoneksi');
});

module.exports = conn;