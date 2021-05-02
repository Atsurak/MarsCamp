const express = require('express')
const router = express()
const mysql = require('mysql')
const pool = require('../scripts/mysql')

router.post('/add', (req, res) => {
    const { question, choices, course_id } = req.body
    pool.getConnection(function(error, mclient){
        if (error){
            console.log(error)
            res.status(400).send('CONN_ERR')
        }

        var sql = 'SELECT LAST_INSERT_ID(content_id) FROM course_content'
        var content_id
        mclient.query(sql, function(err, result){
            if(err){
                console.log(err)
                res.status(400).send('MYSQL_ERR')
            } else {
                content_id = result[result.length-1]['LAST_INSERT_ID(content_id)']
            }
        })

        var sql = `INSERT INTO questions (question, choices, course_id, content_id) VALUES (?, ?, ?, ?)`
        mclient.query(sql, [question, choices, course_id, content_id], function(err, result){
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

router.get('/get/:id', (req, res) => {
    pool.getConnection(function(error, mclient){
        if (error){
            console.log(error)
            res.status(400).send('CONN_ERR')
        }

        var sql = `SELECT * FROM instructor WHERE content_id = ?`
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