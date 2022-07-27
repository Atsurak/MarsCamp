const dotenv = require('dotenv').config();
const host = process.env.DBHOST;
const port = process.env.DBPORT;
const user = process.env.DBUSER;
const pwd = process.env.DBPWD;
const schema = process.env.DBSCHEMA;
console.log(host,port,user,pwd,schema)
const mysql = require('mysql2')
const pool = mysql.createPool({
    host: host,
    port : port,
    user: user,
    password: pwd,
    database: schema,
    connectionLimit: 10,
    multipleStatements: true
})

module.exports = pool