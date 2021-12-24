const { resolve } = require('path');
const mySql = require('../koneksi');

exports.cekDeliverVisiprima = (req) => {
    return new Promise((resolve, reject) => {
        const username = req.username;
        //console.log(username);
        mySql.getConnection(function(err, connection) {
            if (err) {
                console.log('error query m_app.cekDeliverVisiprima: ' + err);
                reject(err.message);
            } else {
                const sql = `SELECT * FROM mahasiswa WHERE nama = ?`;
                connection.query(sql, [username], function(error, results, fields) {
                    //console.log(results);
                    connection.release();
                    if (error) {
                        console.log('error query m_app.cekDeliverVisiprima: ' + error);
                        reject(error.message);
                    } else {
                        //console.log("xxxxx");
                        if (results.length > 0) {
                            resolve(true);
                        } else {
                            reject(false);
                        }
                    }
                });
            }
        });
    })
}