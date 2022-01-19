'use strict';

module.exports = app => {
    const jsonku = require('./controller');
    const router = require("express").Router();
    const controller = require('./controllers/c_app');
    const auth = require('./middleware/auth');

    app.route('/')
        .get(jsonku.index);

    router.get("/getAllMahasiswa", jsonku.getAllMahasiswa);
    router.get("/getOneMahasiswa/:id", jsonku.getById);
    router.post("/postMahasiswa", jsonku.postMahasiswa);
    router.put("/putMahasiswa", jsonku.putMahasiswa);
    router.delete("/deleteMahasiswa", jsonku.deleteMahasiswa);
    router.get("/get-detail-mahasiswa", jsonku.getGroupMatakuliah);

    router.get("/cek-visiprima", auth.x_api_key, controller.cekDeliveryVisiprima);
    router.get("/nested", auth.x_api_key, controller.nestedArray);

    app.use("/api/v2", router);
}