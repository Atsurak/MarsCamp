const express = require('express')
const app = express()
const port =  process.env.PORT || 5000;
const cors = require('cors')
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) => {
  res.send('test')
})

const authRoute = require('./routes/auth')
const coursesRoute = require('./routes/courses')
const studentRoute = require('./routes/student')
const instructorRoute = require('./routes/instructor')
const feedbackRoute = require('./routes/feedback')
const contentRoute = require('./routes/content')
const questionRoute = require('./routes/question.js')

app.use('/auth', authRoute)
app.use('/courses', coursesRoute)
app.use('/student', studentRoute)
app.use('/instructor',instructorRoute)
app.use('/feedback',feedbackRoute)
app.use('/content',contentRoute)
app.use('/question',questionRoute)

app.listen(port,()=> console.log(`App Listening on ${port}`))