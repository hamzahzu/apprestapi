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


    res.json(data);
    res.end();
};