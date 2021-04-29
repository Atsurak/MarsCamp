import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import DeleteOutlined from '@material-ui/icons/DeleteOutlined'
import { makeStyles } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import { yellow, green, pink, blue } from '@material-ui/core/colors'

const useStyles = makeStyles({
  avatar: {
    backgroundColor: (note) => {
      if (note.category === 'intermediate') {
        return yellow[700]
      }
      if (note.category === 'beginner') {
        return green[500]
      }
      if (note.category === 'expert') {
        return pink[500]
      }
      return green[500]
    },
  }
})

export default function NoteCard({ note, handleDelete }) {
  const classes = useStyles(note)

  return (
    <div>
      <Card elevation={1}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {note.course_title[0].toUpperCase()}
            </Avatar>}
          action={
            <IconButton onClick={() => handleDelete(note.course_id)}>
              <DeleteOutlined />
            </IconButton>
          }
          title={note.course_title}
          // subheader={note.category}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            { note.course_desc}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}