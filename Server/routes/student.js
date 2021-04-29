const express = require('express')
const router = express()
const mysql = require('mysql')
const pool = require('../scripts/mysql')

router.post('/enroll', (req, res) => {
    const { course, student } = req.body
    pool.getConnection(function(error, mclient){
        if (error){
            console.log(error)
            res.status(400).send('CONN_ERR')
        }

        var sql = `INSERT INTO student (user_id, course_id) VALUES (\"${student}\", \"${course}\")`
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

router.post('/unenroll', (req, res) => {
    const { course, student } = req.body
    pool.getConnection(function(error, mclient){
        if (error){
            console.log(error)
            res.status(400).send('CONN_ERR')
        }

        var sql = `DELETE FROM student WHERE user_id = ? AND course_id = ?`
        mclient.query(sql, [student, course], function(err, result){
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

module.exports = router