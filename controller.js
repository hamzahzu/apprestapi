'use strict';

const response = require('./res');
const connection = require('./koneksi');
const conn = require('./koneksi');

exports.index = function(req, res) {
    response.ok("Aplikasi REST API Running!", res)
};

//get all data mahasiswa
exports.getAllMahasiswa = function(req, res) {
    let code, message, total, stat = '';
    connection.query(`SELECT * FROM node_mysql.mahasiswa`,
        function(error, rows, fields) {
            if (error) {
                console.log(error);
                code = 500;
                stat = "error";
                message = error.sqlMessage;
                response.ok(code, message, rows, total, stat, res);
            } else {
                code = 200;
                stat = "sucess";
                message = "Sucess get all data mahasiswa";
                total = rows.length;
                response.ok(code, message, rows, total, stat, res);
            }
        });
};

//get one data mahasiswa
exports.getById = function(req, res) {
    let id = req.params.id;
    let code, message, total, stat = '';
    connection.query(`SELECT * FROM node_mysql.mahasiswa WHERE id_mahasiswa = ${id}`,
        function(error, rows, fields) {
            if (error) {
                console.log(error);
                code = 500;
                stat = "error";
                message = error.sqlMessage;
                response.ok(code, message, rows, total, stat, res);
            } else {
                if (rows.length > 0) {
                    code = 200;
                    stat = "sucess";
                    message = "Sucess get data mahasiswa";
                    total = rows.length;
                    response.ok(code, message, rows, total, stat, res);
                } else {
                    code = 500;
                    stat = "error";
                    message = "ID mahasiswa is not exist";
                    response.ok(code, message, rows, total, stat, res);
                }
            }

        });
};

//post data mahasiswa
exports.postMahasiswa = function(req, res) {
    let nim = req.body.nim;
    let nama = req.body.nama;
    let jurusan = req.body.jurusan;
    let code, message, total, stat = '';
    let data = {};

    connection.query(`SELECT * FROM node_mysql.mahasiswa WHERE nim = ${nim}`,
        function(error, rows, fields) {
            if (error) {
                console.log(error);
                code = 500;
                stat = "error";
                message = error.sqlMessage;
                response.ok(code, message, rows, total, stat, res);
            } else {
                if (rows.length > 0) {
                    code = 501;
                    stat = "error";
                    message = "NIM mahasiswa is exist";
                    total = rows.length;
                    response.ok(code, message, rows, total, stat, res);
                } else {
                    connection.query(`INSERT INTO node_mysql.mahasiswa (nim, nama, jurusan) VALUES ('${nim}','${nama}','${jurusan}')`,
                        function(error, rows, fields) {
                            if (error) {
                                console.log(error);
                                code = 500;
                                stat = "error";
                                message = error.sqlMessage;
                                response.ok(code, message, rows, total, stat, res);
                            } else {
                                data = {
                                    'nim': nim,
                                    'nama': nama,
                                    'jurusan': jurusan
                                };

                                code = 200;
                                stat = "sucess";
                                message = "Sucess insert data mahasiswa";
                                total = rows.length;
                                response.ok(code, message, data, total, stat, res);
                            }
                        });
                }
            }

        });
};