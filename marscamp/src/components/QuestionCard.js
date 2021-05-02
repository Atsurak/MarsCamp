import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Typography} from '@material-ui/core';
import {FormControl, RadioGroup, Radio, FormControlLabel, FormLabel} from '@material-ui/core';


export default function QuestionCard({ question}) {
  //const classes = useStyles(note);
  const [option,setOption] = useState([]);
  const choices = question.choices.split('#');

  return (
    <div>
      <Card elevation={1}>
        <CardHeader
          title={question.question}
        />
        <CardContent>
          <Typography variant="body2">
            <form>
              <FormControl>
                <FormLabel>Choose Your Option</FormLabel>
              </FormControl>
              <RadioGroup aria-label="quiz" name="quiz" value={option[question.question_id]} onChange={(e)=> setOption(e.target.value)}>
                  <FormControlLabel value="A" control={<Radio />} label={choices[0]} />
                  <FormControlLabel value="B" control={<Radio />} label={choices[1]} />
                  <FormControlLabel value="C" control={<Radio />} label={choices[2]} />
                  <FormControlLabel value="D" control={<Radio />} label={choices[3]} />
              </RadioGroup>
            </form>
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}