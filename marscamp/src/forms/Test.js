import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { makeStyles, Grid } from '@material-ui/core'
import QuestionCard from '../components/QuestionCard'
import {SaveOutlined } from '@material-ui/icons'
import NewQuestion from '../components/NewQuestion'

const useStyles = makeStyles({
  field: {
    marginTop: 40,
    marginBottom: 20,
    display: 'block',
  },
  sub : {
    marginTop : 20,
    marginBottom : 20,
  }
})

export default function Test() {
  const classes = useStyles();
  const timeStamp = new Date();
  const [questions,setQuestions] = useState([]);

  useEffect(() => {
    update()
  }, [])
  
  const update = async() =>{
    console.log('update called')
    await fetch('http://localhost:5000/content/get?course_id=<course id here>&type=TEST')
      .then(res => res.json())
      .then(data => setQuestions(data))
  }

  return (
    <div>
      <Typography
        variant="h6" 
        color="textSecondary"
        component="h2"
        gutterBottom
        
      >
       Questions
      </Typography>
      
      <form noValidate autoComplete="off">
          {questions.map(question=>(
              <div key={question.id} >
                  <Grid item xs={12}>
                      <QuestionCard question={question}/>
                   </Grid>
              </div>
          ))}
        <div>
         <Button className={classes.sub}
          color="secondary"
          variant="contained"
          type = "Submit"
          startIcon = {<SaveOutlined/>}
          >
            Save
          </Button>
        </div>
      </form>
      <div>
        <NewQuestion  update={update}/>
      </div>
    </div>
  )
}