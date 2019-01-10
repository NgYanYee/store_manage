var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	post: '3306',
	password: '123456',
    database: 'store_manage'
});

module.exports = connection;

