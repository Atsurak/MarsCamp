const express = require('express')
const router = express()
const mysql = require('mysql')
const pool = require('../scripts/mysql')

router.post('/subject', (req, res) => {
    const { user_id, course_id } = req.body
    pool.getConnection(function(error, mclient){
        if (error){
            console.log(error)
            res.status(400).send('CONN_ERR')
        }

        var sql = `UPDATE instructor SET course_id = ? approval = FALSE WHERE user_id = ?`
        mclient.query(sql, [course_id, user_id], function(err, result){
            if(err){
                console.log(err)
                res.status(400).send('MYSQL_ERR')
            } else {
                console.log(result)
                res.status(200).send('OK')
            }
        })

        mclient.release()
    })
})

router.post('/approve', (req, res) => {
    const { user_id } = req.body
    pool.getConnection(function(error, mclient){
        if (error){
            console.log(error)
            res.status(400).send('CONN_ERR')
        }

        var sql = `UPDATE instructor SET approval = TRUE WHERE user_id = ?`
        mclient.query(sql, [user_id], function(err, result){
            if(err){
                console.log(err)
                res.status(400).send('MYSQL_ERR')
            } else {
                console.log(result)
                res.status(200).send('OK')
            }
        })

        mclient.release()
    })
})

router.get('/get', (req, res) => {
    pool.getConnection(function(error, mclient){
        if (error){
            console.log(error)
            res.status(400).send('CONN_ERR')
        }

        var sql = `SELECT * FROM instructor`
        mclient.query(sql, function(err, result){
            if(err){
                console.log(err)
                res.status(400).send('MYSQL_ERR')
            } else {
                console.log(result)
                res.json(result)
            }
        })

        mclient.release()
    })
})

router.get('/get/:id', (req, res) => {
    pool.getConnection(function(error, mclient){
        if (error){
            console.log(error)
            res.status(400).send('CONN_ERR')
        }

        var sql = `SELECT * FROM instructor WHERE user_id = ?`
        mclient.query(sql, [req.params.id], function(err, result){
            if(err){
                console.log(err)
                res.status(400).send('MYSQL_ERR')
            } else {
                console.log(result)
                res.json(result)
            }
        })

        mclient.release()
    })
})

router.get('/getunapp', (req, res) => {
    pool.getConnection(function(error, mclient){
        if (error){
            console.log(error)
            res.status(400).send('CONN_ERR')
        }

        var sql = `SELECT instructor.approval, instructor.user_id, instructor.course_id, instructor.faculty_id, users.first_and_last_name, courses.course_title, courses.course_desc, courses.difficulty FROM instructor INNER JOIN users ON instructor.user_id = users.registration_no INNER JOIN courses ON instructor.course_id = courses.course_id WHERE instructor.approval = FALSE`
        mclient.query(sql, function(err, result){
            if(err){
                console.log(err)
                res.status(400).send('MYSQL_ERR')
            } else {
                console.log(result)
                res.json(result)
            }
        })

        mclient.release()
    })
})

module.exports = router