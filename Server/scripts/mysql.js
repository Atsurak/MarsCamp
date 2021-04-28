var mysql = require('mysql')
var pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "dbmsproj",
    connectionLimit: 10,
    multipleStatements: true
})

module.exports = pool