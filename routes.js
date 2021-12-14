'use strict';

module.exports = app => {
    let jsonku = require('./controller');

    let router = require("express").Router();

    app.route('/')
        .get(jsonku.index);

    router.get("/getAllMahasiswa", jsonku.getAllMahasiswa);
    router.get("/getOneMahasiswa/:id", jsonku.getById);
    router.post("/postMahasiswa", jsonku.postMahasiswa);
    router.put("/putMahasiswa", jsonku.putMahasiswa);
    router.delete("/deleteMahasiswa", jsonku.deleteMahasiswa);
    router.get("/get-detail-mahasiswa", jsonku.getGroupMatakuliah);

    app.use("/api/v1", router);
}