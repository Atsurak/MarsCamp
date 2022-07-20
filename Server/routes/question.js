const express = require('express')
const router = express()
const mysql = require('mysql2')
const pool = require('../scripts/mysql')

router.post('/add', (req, res) => {
    const { question, choices, course_id, content_id } = req.body
    pool.getConnection(function(error, mclient){
        if (error){
            console.log(error)
            res.status(400).send('CONN_ERR')
        }

        
            var sql = `INSERT INTO questions (question, choices, course_id, content_id) VALUES (?, ?, ?, ?)`
            mclient.query(sql, [question, choices, course_id, content_id], function(err2, result2){
            if(err2){
                console.log(err2)
                res.status(400).send('MYSQL_ERR')
            } else {
                console.log(result2)
                res.status(200).send('OK')
            }

        })
        console.log(content_id);

        

        mclient.release()
    })
})

router.get('/get/:id', (req, res) => {
    pool.getConnection(function(error, mclient){
        if (error){
            console.log(error)
            res.status(400).send('CONN_ERR')
        }

        var sql = `SELECT * FROM questions WHERE content_id = ?`
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