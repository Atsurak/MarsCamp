const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const mysql = require('mysql')
require('dotenv').config()

const db = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASS,
    database: 'dbmsproj'
})

db.connect((err) => {
    if(err)
        console.log(err)
    else
        console.log('Connected to mySQL')
})

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

app.use('/', indexRouter)

app.listen(3000)