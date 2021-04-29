const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

app.use(express.json())
app.use(express.urlencoded())

app.get('/', (req, res) => {
  res.send('test')
})

const authRoute = require('./routes/auth')
const coursesRoute = require('./routes/courses')
const studentRoute = require('./routes/student')

app.use('/auth', authRoute)
app.use('/courses', coursesRoute)
app.use('/student', studentRoute)

app.listen(5000,()=> console.log('API running on port 5000'))