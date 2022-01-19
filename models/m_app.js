//const { resolve } = require('path');
require('dotenv').config();
const mySql = require('../koneksi');
const axios = require('axios');
const qs = require('qs');

exports.getNested = (req) => {
    return new Promise((resolve, reject) => {
        const username = req.username;
        const res = {};
        const tempActivity = [];
        console.log(username);
        mySql.getConnection(function(err, connection) {
            if (err) {
                console.log('error query m_app.cekDeliverVisiprima: ' + err);
                reject(err.message);
            } else {
                const sql = `select user_id, user_username from user where user_username = ? limit 1`;
                connection.query(sql, [username], function(error, results, fields) {
                    console.log(results);
                    //connection.release();
                    if (error) {
                        console.log('error query m_app.cekDeliverVisiprima: ' + error);
                        reject(error.message);
                    } else {
                        //console.log(results[0].user_username);
                        if (results.length > 0) {
                            let data = results;
                            const sql2 = `select * from activity where users = ? and date(tanggal) = '2021-12-25' limit 2`;
                            connection.query(sql2, [results[0].user_username], function(error1, results1, fields1) {
                                connection.release();
                                // res['agent'] = results[0];
                                res.agent12 = results[0].user_username
                                if (error1) {
                                    console.log('error query m_app.cekDeliverVisiprimaDetail: ' + error1);
                                    reject(error1.message);
                                } else {
                                    results1.map(e => {
                                        const activity = {
                                            tanggal: e.tanggal,
                                            keterangan: e.keterangan
                                        };
                                        tempActivity.push(activity)
                                    })
                                    console.log(tempActivity)
                                    res.detail_activity = tempActivity
                                    resolve(res);
                                }
                            });
                        } else {
                            reject(false);
                        }
                    }
                });
            }
        });
    })
}

exports.cekDeliverVisiprima = (req) => {
    const cekDeliv = new Promise((resolve, reject) => {
        const username = req.username;
        const res = {};
        //console.log(username);

        mySql.getConnection(function(err, connection) {
            if (err) {
                console.log('error query m_app.cekDeliverVisiprima: ' + err);
                reject(err.message);
            } else {
                const sql = `select user_id from user where user_username = ? limit 1`;
                connection.query(sql, [username], function(error, results, fields) {
                    //console.log(results); 
                    connection.release();
                    if (error) {
                        console.log('error query m_app.cekDeliverVisiprima: ' + error);
                        reject(error.message);
                    } else {
                        /* console.log(results[0].user_id);
                        return false; */
                        //console.log(results.length);

                        if (results.length > 0) {
                            let id_user = results[0].user_id;

                            const config = {
                                method: 'get',
                                url: 'https://tpn1-order.tokopandai.id/api/v1/cek-delivery?id_agent=' + id_user + '&status=AA&is_flag=0',
                                headers: {
                                    'app-id': 'topan',
                                    'app-secret': process.env.APP_SECRET_DELIVERY,
                                    'Content-Type': 'application/json',
                                    'token': process.env.API_TOKEN
                                },
                                data: '',
                                responseType: 'json',
                                responseEncoding: 'utf8',
                                xsrfCookieName: 'XSRF-TOKEN',
                                xsrfHeaderName: 'X-XSRF-TOKEN',
                                timeout: 60000
                            };
                            axios(config)
                                .then(function(response) {
                                    //console.log(response.data.total_data);
                                    if (response.data.total_data > 0) {
                                        res['status'] = 200;
                                        res['message'] = true;
                                        resolve(res);
                                        //resolve(results[0].kode_gerai);
                                    } else {
                                        res['status'] = 200;
                                        res['message'] = false;
                                        reject(res);
                                    }
                                })
                                .catch(function(error) {
                                    console.log(error);
                                });
                            //resolve(results[0].kode_gerai);
                        } else {
                            //console.log('error query m_app.cekDeliverVisiprima: ');
                            const resErr = {};
                            resErr['status'] = 500;
                            resErr['message'] = 'agent not found';
                            reject(resErr);
                            //reject(false);
                        }

                    }
                });
            }
        });

    });

    return cekDeliv;
}