const connection = require('../koneksi');
const mysql = require('mysql');
//const md5 = require('MD5');
const response = require('../res');
const jwt = require('jsonwebtoken');
const config = require('../config/secret');
const ip = require('ip');
const customResponse = require('../response');

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
                    return res.status(401).send({ code: 401, error: true, message: 'E-mail registered!' });
                }
            }
        })
}

exports.login = function(req, res) {
    let post = {
        password: req.body.password,
        email: req.body.email
    }

    let code, message, total, stat = '';

    let query = "SELECT * FROM  ?? WHERE ?? = ? AND ?? =? ";
    let table = ["node_mysql.user", "password", md5(post.password), "email", post.email];

    query = mysql.format(query, table);

    connection.query(query,
        function(error, rows) {
            if (error) {
                console.log(error);
                code = 500;
                stat = "error";
                message = error.sqlMessage;
                response.ok(code, message, rows, total, stat, res);
            } else {
                if (rows.length == 1) {
                    let token = jwt.sign({ rows }, config.secret, {
                        expiresIn: 1440 //25 minutes
                    });
                    id_user = rows[0].id;

                    let data = {
                        id_user: id_user,
                        access_token: token,
                        ip_address: ip.address()
                    }

                    let query = "INSERT INTO ?? SET ?";
                    let table = ["node_mysql.akses_token"];

                    query = mysql.format(query, table);
                    connection.query(query, data, function(error, rows) {
                        if (error) {
                            console.log(error);
                            code = 500;
                            stat = "error";
                            message = error.sqlMessage;
                            response.ok(code, message, rows, total, stat, res);
                        } else {
                            res.json({
                                success: true,
                                message: "JWT tokens are generated!",
                                token: token,
                                currUser: data.id_user
                            });
                        }
                    });


                } else {
                    res.json({
                        error: true,
                        message: "E-mail or password incorrect!",
                    });
                }
            }
        })
}

exports.secretPage = function(req, res) {

    return res.json({
        status: 200,
        message: "Success, This page is only for role 2",
    });
}

exports.x_api_key = (Request, Response, next) => {
    const apiKey = Request.headers['x-api-key'];
    // console.log(apiKey)
    if (apiKey !== process.env.X_API_KEY) {
        customResponse.forbidden(Response, 'Your key is invalid');
    } else {
        next();
    }
}