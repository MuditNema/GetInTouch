import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TextField } from '@mui/material';
import { useMemo } from 'react';
import countryList from 'react-select-country-list'
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import WorkList from '../components/List/WorkList';
import ClearIcon from '@mui/icons-material/Clear';
import UpdateUserList from '../components/List/UpdateUserList';
import { useEffect } from 'react';

import {useSelector} from "react-redux"



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UpdateUser = ({state}) => {
    const options = useMemo(() => countryList().getData(), [])
    const India = 'India'
    const [UserKeys, setUserKeys] = useState(['Name','Contact','Github','LinkedIn','Skill','City'])

    const UserInfo = useSelector((state)=> state.UserReducer);
    const UserArray =  [UserInfo.name,UserInfo.contact,UserInfo.github,UserInfo.linkedin,UserInfo.skills,UserInfo.city]
    const [Works, setWorks] = useState(UserInfo.work)
    const [Education, setEducation] = useState(UserInfo.education)
    const TextFieldCSS = {style : {
      padding : "4px 8px",
      fontSize : "1.3vw"
    }}
    const ListItemCSS = {
      fontSize:"1.5vw",
      fontFamily: "Fredoka"
    }
    const HandleClose = () => {
        state.setUpdateDialog(false)
    }
    const HandleSubmit = (e) => {
      e.preventDefault()
      //write the code to update the database and the user state and localStorage

      state.setUpdateDialog(false)
    }
    const DeleteElement = (i) => {
      setUserKeys(UserKeys.filter((element,index) => {return index !== i}))
    }
    
  return (
    <div>
      <Dialog
        fullScreen
        open={state.UpdateDialog}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={HandleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Get In Touch
            </Typography>
            <Button autoFocus color="inherit" onClick={HandleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          {
            UserKeys.map((element,index)=> {
              return (<UpdateUserList item={element} key={index} value={UserArray[index]}/>)})
          }
        </List>
        <List>
          <ListItem
          style={{
            width:"80%",
            margin:"auto"
          }}>
            <ListItemText
            disableTypography={true}
            sx={ListItemCSS}
            >
            Country
            </ListItemText>
            <TextField
              select
              defaultValue={India}
              inputProps={TextFieldCSS}
            >
              {options.map((option) => (
                            <MenuItem key={option.label} value={option.label} style={{fontSize : "1.2vw"}}>
                            {option.label}
                            </MenuItem>
                        ))}
            </TextField>
          </ListItem>
          <Divider sx={{width:"90%",margin:"auto"}}/>
          
            <Stack
              sx={ListItemCSS}
              direction="row"
              justifyContent="space-evenly"
              spacing={3}
            >
              <div>
                <Typography
                  sx={{
                    fontSize : "1.5vw",
                    padding : "4px",
                    width:"fit-content",
                    margin : "auto"
                  }}
                >
                  Work Experience/Projects
                </Typography>
                <List>
                  {
                    Works.map((e,i)=>{
                      return (
                        <div
                          key={i}
                            style={{
                              display:"flex",
                              flexDirection:"row"
                            }}
                          >
                          <WorkList style={{margin:"auto",width:"fit-content"}}element={e} index={i}/>
                          <IconButton onClick={()=> DeleteElement(i)}>
                          <ClearIcon/>
                          </IconButton>                           
                          </div>
                      )
                    })
                  }
                </List>

              </div>
              <div>
              <Typography
                  sx={{
                    fontSize : "1.5vw",
                    padding : "4px",
                    width:"fit-content",
                    margin : "auto"
                  }}
                >
                  Education
                </Typography>
                <List>
                  {
                    Education.map((e,i)=>{
                      return (
                        <div
                          key={i}
                            style={{
                              display:"flex",
                              flexDirection:"row"
                            }}
                          >
                          <WorkList style={{margin:"auto",width:"fit-content"}}element={e} index={i}/>
                          <IconButton onClick={()=> DeleteElement(i)}>
                          <ClearIcon/>
                          </IconButton>                           
                          </div>
                      )
                    })
                  }
                </List>
              </div>
            </Stack>
          <Divider sx={{width:"90%",margin:"auto"}}/>
          <Stack>
            <Typography
              style={{
                width : "fit-content",
                fontSize : "1.5vw",
                margin : "5px auto",
                padding : "4px 6px"
              }}
            >Description</Typography>
            <TextField
              type="text"
              multiline={true}
              minRows={4}
              maxRows={4}
              sx={{width:"80%",margin : "auto"}}
              inputProps={TextFieldCSS}
            ></TextField>
          </Stack>
        </List>
      <Button variant="outlined" style={{
        width:"fit-content",
        margin : "16px auto",
        fontSize : "1.3vw",
      }}
      onClick={HandleSubmit}
      >Submit</Button>
      </Dialog>
    </div>
  );
}


export default UpdateUser;
