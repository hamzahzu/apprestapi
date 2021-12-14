'use strict';

module.exports = function(app) {
    var jsonku = require('./controller');

    app.route('/')
        .get(jsonku.index);

    app.route('/getAllMahasiswa')
        .get(jsonku.getAllMahasiswa);

    app.route('/getOneMahasiswa/:id')
        .get(jsonku.getById);

    app.route('/postMahasiswa')
        .post(jsonku.postMahasiswa);

    app.route('/putMahasiswa')
        .put(jsonku.putMahasiswa);

    app.route('/deleteMahasiswa')
        .delete(jsonku.deleteMahasiswa);

    app.route('/get-detail-mahasiswa')
        .get(jsonku.getGroupMatakuliah);
}