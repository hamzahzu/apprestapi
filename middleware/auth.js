const connection = require('../koneksi');
const mysql = require('mysql');
const md5 = require('MD5');
const response = require('../res');
const jwt = require('jsonwebtoken');
const config = require('../config/secret');
const ip = require('ip');

//controller register
exports.registrasi = function(req, res) {
    let post = {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role,
        register_date: new Date()
    }
    console.log(post.email);
    let query = "SELECT email FROM ?? WHERE ?? = ?";
    let table = ["node_mysql.user", "email", post.email];

    query = mysql.format(query, table);

    let code, message, total, stat = '';

    connection.query(query,
        function(error, rows) {
            if (error) {
                console.log(error);
                code = 500;
                stat = "error";
                message = error.sqlMessage;
                response.ok(code, message, rows, total, stat, res);
            } else {
                if (rows.length == 0) {
                    let query = "INSERT INTO ?? SET ?";
                    let table = ["node_mysql.user"];

                    query = mysql.format(query, table);
                    connection.query(query, post, function(error, rows) {
                        if (error) {
                            console.log(error);
                            code = 500;
                            stat = "error";
                            message = error.sqlMessage;
                            response.ok(code, message, rows, total, stat, res);
                        } else {
                            code = 200;
                            stat = "sucess";
                            message = "Successfully added new user data";
                            total = rows.length;
                            response.ok(code, message, rows, total, stat, res);
                            //response.ok("Successfully added new user data", res);
                        }
                    });
                } else {
                    code = 501;
                    stat = "error";
                    message = "E-mail registered!";
                    response.ok(code, message, rows, total, stat, res);
                    //response.ok("E-mail registered!", res);
                }
            }
        })
}