import { Button, Card, CardContent, CardHeader, makeStyles, TextField, Typography } from '@material-ui/core';
import { AddCircleOutlineOutlined } from '@material-ui/icons';
import React, { useState } from 'react';

const useStyles = makeStyles({
    field:{
        marginBottom :20,
        display:'block'
    }
})
 
export default function NewQuestion(){
    const classes = useStyles();
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

    const handleSubmit = (e) => {
        e.preventDefault();
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
        if(question&&optionA&&optionB&&optionC&&optionD&&key){
            fetch('http://localhost:8000/questions',{
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({question,optionA,optionB,optionC,optionD,key})
            }).then((res) => console.log('Question added'))
        }
        
    }


    return(
        <div>
            <Card elevation={1}>
                <CardHeader 
                 title = 'Enter a new Question'
                 />
                <CardContent>
                    <Typography variant="body2">
                        <form onSubmit={handleSubmit}>
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

    );

}