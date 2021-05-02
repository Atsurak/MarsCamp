const express = require('express')
const router = express()
const mysql = require('mysql')
const pool = require('../scripts/mysql')

router.post('/add', (req, res) => {
    const { content, user_id, course_id } = req.body
    pool.getConnection(function(error, mclient){
        if (error){
            console.log(error)
            res.status(400).send('CONN_ERR')
        }

        var sql = `INSERT INTO feedback (content, user_id, course_id) VALUES (?, ?, ?)`
        mclient.query(sql, [content, user_id, course_id], function(err, result){
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
    let course_id = req.params.id
    pool.getConnection(function(error, mclient){
        if (error){
            console.log(error)
            res.status(400).send('CONN_ERR')
        }

        var sql = `SELECT * FROM feedback WHERE course_id = ?`
        mclient.query(sql, [course_id], function(err, result){
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