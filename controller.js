'use strict';

const response = require('./res');
const connection = require('./koneksi');

exports.index = function(req, res) {
    response.ok("Aplikasi REST API Running!", res)
};

//get all data mahasiswa
exports.getAllMahasiswa = function(req, res) {
    connection.query(`SELECT * FROM node_mysql.mahasiswa`,
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok(rows, res)
            }
        });
};

//get one data mahasiswa
exports.getById = function(req, res) {
    let id = req.params.id;
    connection.query(`SELECT * FROM node_mysql.mahasiswa WHERE id_mahasiswa = ${id}`,
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok(rows, res)
            }

        });
};