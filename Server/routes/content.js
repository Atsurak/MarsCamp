const express = require('express')
const router = express()
const mysql = require('mysql2')
const pool = require('../scripts/mysql')

router.post('/add', (req, res) => {
    let { content, user_id, course_id, title, type, file_path } = req.body

    console.log(typeof(file_path))
    pool.getConnection(function(error, mclient){
        if (error){
            console.log(error)
            res.status(400).send('CONN_ERR')
        }
        
        if(file_path===undefined)
            file_path=null;
        
        var sql = `INSERT INTO course_content (content, user_id, course_id, title, content_type, file_path) VALUES (?, ?, ?, ?, ?, ?)`
        mclient.query(sql, [content, user_id, course_id, title, type, file_path], function(err, result){
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

        var sql = `SELECT * FROM course_content WHERE course_id = ?`
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

router.get('/get', (req, res) => {
    const { course_id, type } = req.query
    console.log(course_id, type)
    pool.getConnection(function(error, mclient){
        if (error){
            console.log(error)
            res.status(400).send('CONN_ERR')
        }
        var sql = `SELECT * FROM course_content WHERE course_id = ? AND content_type = ?`
        mclient.query(sql, [course_id, type], function(err, result){
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