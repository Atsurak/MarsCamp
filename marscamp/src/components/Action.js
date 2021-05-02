import React, { useState } from 'react';
import {DeleteOutlined} from '@material-ui/icons';
import { IconButton, Button } from '@material-ui/core';
import Student from '../actions/Student';
import Faculty from '../actions/Faculty';
import Admin from '../actions/Admin';
 
export default function Action({utype,note}){

    if(utype===0){
      return <Student note={note} utype={utype}/>}
    else if (utype===-1){
      return <Admin note={note} utype={utype}/>}
    else{
      return <Faculty note={note} utype={utype}/>}

}