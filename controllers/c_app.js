'use strict';

const response = require('../res');
const connection = require('../koneksi');
const customResponse = require('../response');
const model = require('../models/m_app');

exports.index = function(req, res) {
    response.ok("Aplikasi REST API Running!", res)
};

exports.cekDeliveryVisiprima = async(request, response) => {
    try {
        //console.log("aaa");
        const username = request.query.user;
        const getDeliv = await model.cekDeliverVisiprima({ username: username });
        //console.log(getDeliv);
        //return false;

        customResponse.ok(response, 'Mengambil flag Visiprima', getDeliv.message);
    } catch (error) {
        //console.log(error);
        if (error === "kosong") {
            customResponse.badRequest(response, 'Data agent kosong');
        } else {
            console.log(error.status);
            //customResponse.serverError(response, error);
            if(error.status == 200){
                
                customResponse.ok(response, 'Mengambil flag Visiprima', error.message);
            }else{
                
                customResponse.badRequest(response, error.message);
            }
        }
    }
}

exports.nestedArray = async(request, response) => {
    try {
        //console.log("aaa");
        const username = request.query.user;
        const getNested = await model.getNested({ username: username });
        //console.log(getDeliv);
        //return false;

        customResponse.ok(response, 'Mengambil flag Visiprima', getNested);
    } catch (error) {
        //console.log(error);
        if (error === "kosong") {
            customResponse.badRequest(response, 'Data agent kosong');
        } else {
            console.log(error.status);
            //customResponse.serverError(response, error);
            if(error.status == 200){
                
                customResponse.ok(response, 'Mengambil flag Visiprima', error.message);
            }else{
                
                customResponse.badRequest(response, error.message);
            }
        }
    }
}