const express = require('express')
const app = express()
app.use(express.urlencoded({extended: false}))
const expressLayouts = require('express-ejs-layouts')
const mysql = require('mysql')
require('dotenv').config()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
const initPassport = require('./scripts/pass-config')
initPassport(
    passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)
const auth = require('./scripts/auth-checks')

// const db = mysql.createConnection({
//     host: process.env.SQL_HOST,
//     user: process.env.SQL_USER,
//     password: process.env.SQL_PASS,
//     database: 'dbmsproj'
// })

// db.connect((err) => {
//     if(err)
//         console.log(err)
//     else
//         console.log('Connected to mySQL')
// })

const indexRouter = require('./routes/index')
const dashboardRouter = require('./routes/dashboard')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

app.use('/', indexRouter)
app.use('/dashboard', dashboardRouter)

const users = []
console.log(users)

app.get('/login', auth.checkNotAuth, (req, res) => {
    res.render('login')
})

app.post('/login', auth.checkNotAuth, passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/register', auth.checkNotAuth, (req, res) => {
    res.render('register')
})

app.post('/register', auth.checkNotAuth, async (req, res) => {
    try {
        const hashedPass = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPass
        })
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }

    console.log(users)
})

app.listen(3000)