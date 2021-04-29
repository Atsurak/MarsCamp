const express = require('express')
const router = express()
const mysql = require('mysql')
const pool = require('../scripts/mysql')
const bcrypt = require('bcrypt')

router.get('/login', (req, res) => {
    const { email, pwd } = req.query
    pool.getConnection(function (error, mclient){
        if(error){
            console.log(error)
            res.status(400).send('CONN_ERR')
        }
        var sql = 'SELECT email, pwd, user_type FROM users WHERE email = ?'
        mclient.query(sql, [email], async function(err, result){
            if (err){
                console.log(err)
                res.status(400).send('MYSQL_ERR')
            }
            else if(result.length!=0){
                if(await (bcrypt.compare(pwd, result[0].pwd))){
                    var sql_getinf
                    if (result[0].user_type==='ADMIN'){
                        sql_getinf = 'SELECT users.registration_no, users.phone_no, users.email, users.first_and_last_name, users.user_type FROM users WHERE email = ?'
                    } else if (result[0].user_type==='FACULTY'){
                        sql_getinf = 'SELECT users.registration_no, users.phone_no, users.email, users.first_and_last_name, users.user_type, instructor.course_id FROM instructor INNER JOIN users ON instructor.user_id = users.registration_no WHERE users.email = ?'
                    } else if (result[0].user_type==='STUDENT'){
                        sql_getinf = 'SELECT users.registration_no, users.phone_no, users.email, users.first_and_last_name, users.user_type, student.course_id FROM student INNER JOIN users ON student.user_id = users.registration_no WHERE users.email = ?'
                    }
                    mclient.query(sql_getinf, [email], function(err, result){
                        if (err){
                            console.log(err)
                        }
                        else{
                            res.json(result)
                        }
                    })
                } else{
                    res.send("PWD_NO_MATCH")
                }
            } else if (result.length==0){
                res.send("USER_NOT_FOUND")
            }
        })
        mclient.release()
    })
})

router.post('/signup', async (req, res) => {

    const { reg_no, ph_no, email, name, user_type, courses, pwd } = req.body

    const pwd_hashed = await bcrypt.hash(pwd, 10)
    
    pool.getConnection( function(error, mclient) {
        if (error){
            console.log(error)
            res.status(400).send('CONN_ERR')
        }
        var sql = `INSERT INTO users (registration_no, phone_no, email, first_and_last_name, user_type, pwd) VALUES (\"${reg_no}\", \"${ph_no}\", \"${email}\", \"${name}\", \"${user_type}\", \"${pwd_hashed}\")`
            mclient.query(sql, function (err, result) {
                if (err){
                    console.log(err)
                    res.status(400).send('MYSQL_ERR')
                }
                else if(!err){
                    console.log(result)
                    if(user_type==='FACULTY'){
                        sql = `INSERT INTO instructor (approval, user_id) VALUES (false, \"${reg_no}\")`
                        mclient.query(sql, (err, result) => {
                            if (err){
                                console.log(err)
                            }
                            else
                            console.log(result)
                        })
                    }
                    res.status(200).send('OK')
                }
            })
        mclient.release()
    })
})

module.exports = router

// await fetch('http://localhost:5000/auth/signup', {method: 'POST', headers: { 'Content-Type': 'application/json'}, body: JSON.stringify({reg_no: , ph_no: , email: , name: , user_type: , pwd: , courses: (array for student only)})})