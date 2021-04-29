import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  }
})

export default function CreateCourse() {
  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  //const [category, setCategory] = useState('beginner');

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false)
    setDescriptionError(false)

    if (title === '') {
      setTitleError(true)
    }
    if (description === '') {
      setDescriptionError(true)
    }
    if (title && description) {
      fetch('http://localhost:5000/courses/add', {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({ title, description})
      }).then(() => history.push('/'))
    } 
  }

  return (
    <Container size="sm">
      <Typography
        variant="h6" 
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Create a New Course
      </Typography>
      
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField className={classes.field}
          onChange={(e) => setTitle(e.target.value)}
          label="Course Title" 
          variant="outlined" 
          color="secondary" 
          fullWidth
          required
          error={titleError}
        />
        <TextField className={classes.field}
          onChange={(e) => setDescription(e.target.value)}
          label="Course Description"
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          fullWidth
          required
          error={descriptionError}
        />

        {/* <Radio value="hello" />
        <Radio value="goodbye" /> */}

        {/* <FormControl className={classes.field}>
          <FormLabel>Course Category</FormLabel>
          <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
            <FormControlLabel value="beginner" control={<Radio />} label="Beginner" />
            <FormControlLabel value="intermediate" control={<Radio />} label="Intermediate" />
            <FormControlLabel value="advanced" control={<Radio />} label="Advanced" />
            <FormControlLabel value="expert" control={<Radio />} label="Expert" />
          </RadioGroup>
        </FormControl> */}

        <Button
          type="submit" 
          color="secondary" 
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}>
          Submit
        </Button>
      </form>

      
    </Container>
  )
}
