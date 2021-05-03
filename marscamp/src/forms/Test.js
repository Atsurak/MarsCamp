import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { makeStyles, Grid, TextField, MenuItem } from '@material-ui/core'
import QuestionCard from '../components/QuestionCard'
import {SaveOutlined} from '@material-ui/icons'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { Card, CardContent, CardHeader} from '@material-ui/core';
import { AddCircleOutlineOutlined } from '@material-ui/icons';

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
  const [tests,setTests] = useState([]);
  const userToken = JSON.parse(localStorage.getItem('token'))[0];
  const utype = userToken.user_type === 'STUDENT'? 0 : (userToken.user_type==='FACULTY'? 1 : -1 );
  const course_id = userToken.course_id;
  const user_id = userToken.registration_no;
  const [contentid,setContent]= useState('');

  


 /////
    const [question,setQuestion] = useState();
    const [optionA,setOptionA] = useState();
    const [optionB,setOptionB] = useState();
    const [optionC,setOptionC] = useState();
    const [optionD,setOptionD] = useState();
    const [key,setKey] = useState();
    const [questionError,setQuestionError] = useState(false);
    const [optionAError,setOptionAError] = useState(false);
    const [optionBError,setOptionBError] = useState(false);
    const [optionCError,setOptionCError] = useState(false);
    const [optionDError,setOptionDError] = useState(false);
    const [keyError,setKeyError] = useState(false);

    const handleQuesSubmit = (e) => {

        e.preventDefault();
        console.log('meetooo')
        const content_id = contentid;

        if(question ===''){
            setQuestionError(true);
        }
        if(optionA === ''){
            setOptionAError(true);
        }
        if(optionB === ''){
            setOptionBError(true);
        }
        if(optionC === ''){
            setOptionCError(true);
        }
        if(optionD === ''){
            setOptionDError(true);
        }
        if(key === ''){
            setKeyError(true);
        }
        let choices = optionA + '#' + optionB + '#' + optionC + '#' +optionD + '#'+key ;
        console.log(question,choices,course_id);
        if(question&&optionA&&optionB&&optionC&&optionD&&key){
            fetch('http://localhost:5000/question/add',{
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({question, choices, course_id, content_id})
                //body: JSON.stringify({question,optionA,optionB,optionC,optionD,key})
            }).then((res) => update)
        }
        
    }




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
   fetch('http://localhost:5000/content/get?course_id='+course_id+'&type=test')
    .then(res => res.json())
    .then(data => setTests(data))

  }, [])
  
  const update = async(id) =>{
    console.log('update called')
    await fetch('http://localhost:5000/question/get/'+id)
      .then(res => res.json())
      .then(data => setQuestions(data))
  }

  const handleformSubmit = (e) =>{
    e.preventDefault();
    console.log('i ran');
  }

  const handleChange = async (id) =>{
      console.log('i ran');
      setContent(id);
      update(id);
  }

  return (
    <div>
      <Typography >Choose an Existing test to add Questions or add a new test</Typography>
        <div>
            <TextField
                id ="type"
                select
                fullWidth
                required
                color="secondary"
                label = "choose forum"
            >
                { tests.map( test=> (
                    <MenuItem key={test.content_id} value={test.content_id} onClick = {()=>{handleChange(test.content_id)}}>{test.title}</MenuItem>
                ))}
            </TextField>
        </div>

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
          {questions.map(ques=>(
              <div key={ques.question_id} >
                  <Grid item xs={12}>
                      <QuestionCard question={ques}/>
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
          <div>

            <Card elevation={1}>
                <CardHeader 
                 title = 'Enter a new Question'
                 />
                <CardContent>
                    <Typography variant="body2">
                        <form onSubmit={handleQuesSubmit}>
                            <TextField className={classes.field}
                            onChange={(e) => setQuestion(e.target.value)}
                            label="Question"
                            variant="outlined"
                            color="secondary"
                            required
                            fullWidth
                            error = {questionError}
                            />
                            <TextField className={classes.field}
                            onChange={(e) => setOptionA(e.target.value)}
                            label="Option A"
                            variant="outlined"
                            color="secondary"
                            required
                            error = {optionAError}
                            />
                            <TextField className={classes.field}
                            onChange={(e) => setOptionB(e.target.value)}
                            label="Option B"
                            variant="outlined"
                            color="secondary"
                            required
                            error = {optionBError}
                            />
                            <TextField className={classes.field}
                            onChange={(e) => setOptionC(e.target.value)}
                            label="Option C"
                            variant="outlined"
                            color="secondary"
                            required
                            error = {optionCError}
                            />
                            <TextField className={classes.field}
                            onChange={(e) => setOptionD(e.target.value)}
                            label="Option D"
                            variant="outlined"
                            color="secondary"
                            required
                            error = {optionDError}
                            />
                            <TextField className={classes.field}
                            onChange={(e) => setKey(e.target.value)}
                            label="Key"
                            variant="outlined"
                            color="secondary"
                            required
                            error = {keyError}
                            />
                            <Button 
                              style = {{marginTop:10}}
                              color="secondary"
                              variant="outlined"
                              startIcon = {<AddCircleOutlineOutlined/>}
                              type="Submit"
                              >
                              Add Question
                            </Button>
                        </form>
                    </Typography>
                </CardContent>
            </Card>
        </div>

      </div>
    </div>
  )
}