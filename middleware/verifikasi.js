const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function verifikasi() {
    return function(req, res, next) {
        let roles = req.body.role;

        //cek authorization header

        let tokenWithBearer = req.headers.authorization;
        if (tokenWithBearer) {
            let token = tokenWithBearer.split(' ')[1];
            //verifikasi
            jwt.verify(token, config.secret, function(err, decoded) {
                if (err) {
                    return res.status(401).send({ auth: false, message: 'Unregistered Tokens' });
                } else {
                    if (roles == 2) {
                        req.auth = decoded;
                        next();
                    } else {
                        return res.status(401).send({ auth: false, message: 'Failed to authorize your ROLE' });
                    }
                }
            });
        } else {
            return res.status(401).send({ auth: false, message: 'Tokens is not exist!' });
        }
    }
}

module.exports = verifikasi;