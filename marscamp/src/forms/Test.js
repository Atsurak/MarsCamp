import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { makeStyles, Grid, TextField } from '@material-ui/core'
import QuestionCard from '../components/QuestionCard'
import {SaveOutlined} from '@material-ui/icons'
import NewQuestion from '../components/NewQuestion'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles({
  field: {
    marginTop: 40,
    marginBottom: 20,
    display: 'block',
  },
  sub : {
    marginTop : 20,
    marginBottom : 20,
  },
  title : {
    marginTop : 40,
    marginBottom : 40
  }
})

export default function Test() {
  const classes = useStyles();
  const [questions,setQuestions] = useState([]);
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const type = 'test';
  const userToken = JSON.parse(localStorage.getItem('token'))[0];
  const utype = userToken.user_type === 'STUDENT'? 0 : (userToken.user_type==='FACULTY'? 1 : -1 );
  const course_id = userToken.course_id;
  const user_id = userToken.registration_no;


  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false)
    setDetailsError(false)

    const content = details;

    if (title === '') {
      setTitleError(true)
    }
    if (details === '') {
      setDetailsError(true)
    }
    if (title && details) {
      fetch('http://localhost:5000/content/add', {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({ title, content, user_id, course_id, type})
      });
    } 
  }

  useEffect(() => {
    update()
  }, [])
  
  const update = async() =>{
    console.log('update called')
    await fetch('http://localhost:5000/question/get/'+course_id)
      .then(res => res.json())
      .then(data => setQuestions(data))
  }

  const handleformSubmit = (e) =>{
    e.preventDefault();
    console.log('i ran');
  }

  return (
    <div>

      <div>
      <Typography className={classes.title}
        variant="h6" 
        color="textSecondary"
        component="h2"
        gutterBottom
      >
      Enter the Title and Details of the test and then save this form to Continue
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <TextField className={classes.field}
          onChange={(e) => setTitle(e.target.value)}
          label="Title" 
          variant="outlined" 
          color="secondary" 
          fullWidth
          required
          error={titleError}
        />
        <TextField className={classes.field}
          onChange={(e) => setDetails(e.target.value)}
          label="Message"
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          fullWidth
          required
          error={detailsError}
        />
        <Button
          type="submit" 
          color="secondary" 
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}>
          Save Test Details
        </Button>
      </form>
    </div>
      <Typography
        variant="h6" 
        color="textSecondary"
        component="h2"
        gutterBottom
        className={classes.title}
      >
       Enter Questions for this test one by one
      </Typography>
      
      <form onSubmit={handleformSubmit}>
          {questions.map(question=>(
              <div key={question.question_id} >
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
            Save Test
          </Button>
        </div>
      </form>
      <div>
          <NewQuestion  update={update}/>
      </div>
    </div>
  )
}