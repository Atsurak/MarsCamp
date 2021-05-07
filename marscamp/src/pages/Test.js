import React,{useEffect,useState} from 'react';
import { makeStyles, Button, Grid,Container } from '@material-ui/core';
import {useHistory} from 'react-router';
import {SaveOutlined} from '@material-ui/icons'
import QuestionCard from '../components/QuestionCard'
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
export default function Test(){
    const history = useHistory();
    const classes = useStyles();
    const [questions,setQuestions] = useState([]);
    const userToken = JSON.parse(localStorage.getItem('token'))[0];
    //const utype = userToken.user_type === 'STUDENT'? 0 : (userToken.user_type==='FACULTY'? 1 : -1 );
  
    let id = 1;
    if(history.location.state!==undefined){
        id = history.location.state.id;
    }
    else{
        history.push('/home');   
    }

    const handleformSubmit = (e) =>{
    e.preventDefault();
    console.log('i ran');
    console.log(e.target);
    }

    useEffect(() => {
    fetch('http://localhost:5000/question/get/'+id)
      .then(res => res.json())
      .then(data => setQuestions(data))
    },[id])



    return(
    <Container>
        <div> Working Component {id}</div>
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
            Submit
            </Button>
        </div>
        </form>
    </Container>
    )
}