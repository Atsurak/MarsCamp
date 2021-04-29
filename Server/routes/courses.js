const express = require('express')
const router = express()
const mysql = require('mysql')
const pool = require('../scripts/mysql')

router.post('/add', (req, res) => {
    const { title, description } = req.body
    pool.getConnection(function(error, mclient){
        if (error){
            console.log(error)
            res.status(400).send('CONN_ERR')
        }

        var sql = `INSERT INTO courses (course_title, course_desc) VALUES (\"${title}\", \"${description}\")`
        mclient.query(sql, function(err, result){
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

        var sql = `SELECT * FROM courses`
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

        var sql = `SELECT * FROM courses WHERE course_id = ?`
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

module.exports = router