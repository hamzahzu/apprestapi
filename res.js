'use strict';
exports.ok = function(code, message, values, total, stat, res) {
    let data = {};

    if (code == 200) {
        data = {
            'code': code,
            'status': stat,
            'message': message,
            'total': total,
            'values': values,
        };
    } else {
        data = {
            'code': code,
            'status': stat,
            'message': message,
            'values': values,
        };
    }

    res.status(code).json(data);
    res.end();
};

//nested data matakuliah
exports.okNested = function(code, message, values, total, stat, res) {
    const hasil = values.reduce((akumulasi, item) => {
        if (akumulasi[item.nama]) {
            const group = akumulasi[item.nama];
            if (Array.isArray(group.matakuliah)) {
                group.matakuliah.push(item.matakuliah);
            } else {
                group.matakuliah = [group.matakuliah, item.matakuliah];
            }
        } else {
            akumulasi[item.nama] = item;
        }
        return akumulasi;
    }, {});

    let data = {};

    if (code == 200) {
        data = {
            'code': code,
            'status': stat,
            'message': message,
            'total': total,
            'values': hasil,
        };
    } else {
        data = {
            'code': code,
            'status': stat,
            'message': message,
            'values': hasil,
        };
    }

    res.status(code).json(data);
    res.end();
}