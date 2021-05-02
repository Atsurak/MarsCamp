import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import DeleteOutlined from '@material-ui/icons/DeleteOutlined'
import { makeStyles } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import { yellow, green, pink, blue, brown, orange } from '@material-ui/core/colors'
import Action from '../components/Action'
import { Link, useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  avatar: {
    backgroundColor: (note) => {
      if (note.content_type === 'material') {
        return yellow[700]
      }
      if (note.content_type === 'announcement') {
        return green[500]
      }
      if (note.content_type === 'test') {
        return pink[500]
      }
      return orange[500]
    },
  }
})

export default function PostCard({ note, handleDelete }) {
  const classes = useStyles(note);
  const history = useHistory();
  const userToken = JSON.parse(localStorage.getItem('token'))[0];
  const utype = userToken.user_type === 'STUDENT'? 0 : (userToken.user_type==='FACULTY'? 1 : -1 );

  return (
    <div>
      <Card elevation={1}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {note.title[0].toUpperCase()}
            </Avatar>}
          title={note.title}
          subheader={note.user_id}
        />
        <CardContent onClick={()=>{history.push('/course')}}>
            <Typography variant="body2" color="textSecondary">
            { note.content} 
            {note.file_path?<a href={"../../public/Server/"+note.file_path.substring(12)} download >File</a>: null}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}