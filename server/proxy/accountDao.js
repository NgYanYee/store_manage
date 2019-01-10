var conn = require('./conn');

exports.register = function (data, callback) {
    conn.query(`
        INSERT INTO user (userId, userName, password ) 
        VALUES(?,?,?)
    `, [data.userId, data.userName, data.password], callback)
}
exports.login = function (data, callback) {
    conn.query(`
        SELECT * FROM user WHERE userId = ? AND password = ?
    `, [data.userId, data.password], callback)
}

exports.getUserById = function (data, callback) {
    conn.query(`
        SELECT userId, userName from user WHERE userId = ?
    `, [data.userId], callback)
}