const express = require('express');
const auth = require('./auth');
const verifikasi = require('./verifikasi');
const router = express.Router();

router.post('/api/v1/register', auth.registrasi);
router.post('/api/v1/login', auth.login);

//alamat yg perlu otorisasi
router.get('/api/v1/secret', verifikasi(), auth.secretPage);

module.exports = router;