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
import {useDispatch, useSelector} from "react-redux"

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { app } from '../Firebase/FirebaseConfig';
import { LoginUser } from '../Redux/actions';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TextFieldCSS = {style : {
  padding : "4px 8px",
  fontSize : "1.3vw"
}}
const ListItemCSS = {
  fontSize:"1.5vw",
  fontFamily: "Fredoka"
}
const UpdateUser = ({state}) => {
    const options = useMemo(() => countryList().getData(), [])
    const db = getFirestore(app)
    const dispatch = useDispatch();
    

    const UserKeys = ['Name','Contact','Github','LinkedIn','Skills','City']
    const Id = useSelector((state) => state.UserId)
    // const UserCreds = useSelector((state)=> state.UserReducer);
    const [UserInfo, setUserInfo] = useState(useSelector((state)=> state.UserReducer))
    const [Works, setWorks] = useState(UserInfo.work)
    const [WorkState, setWorkState] = useState("")
    const [Education, setEducation] = useState(UserInfo.education)
    const [EducationState, setEducationState] = useState("")
    const [TypeState, setTypeState] = useState("")
    const [DialogState, setDialogState] = useState(false)

    const KeyChange = (e) => {
      setUserInfo({...UserInfo,[e.target.name]:e.target.value})
    }

    const HandleClose = () => {
        state.setUpdateDialog(false)
    }
    
    const UpdateWorkAndEducation = () => {
      console.log("Update work and education running :" , Works, Education)
      //update the work and education array 
      const Obj = {...UserInfo};
      Obj.work = Works;
      Obj.education = Education;
      return Obj
    }

    const HandleSubmit = async (e) => {
      e.preventDefault()
      try {
        
        //write the code to update the database , user state and localStorage
        const fin = UpdateWorkAndEducation();
        const UserDoc = doc(db,"users",Id)
        const UpdateUser = await updateDoc(UserDoc , fin);
        // console.log(UpdateUser.data())
        localStorage.setItem('user',JSON.stringify(fin))
        LoginUser({valid:true},dispatch)
        state.setUpdateDialog(false)
      } catch (error) {
        console.log(error)
      }
    }
    
    const UpdateElement = (e) => {
      if(TypeState==="work"){
        setWorkState(e.target.value)
      } 
      else if(TypeState==="education"){
        setEducationState(e.target.value)
      } 
    }

    const AddElement = (e) => {
      e.preventDefault()
      if(TypeState==="work"){
        const flag = WorkState
        setWorks([...Works,flag])
        setWorkState("")
      } 
      else if(TypeState==="education"){
        const flag = EducationState
        setEducation([...Education,flag])
        setEducationState("")
      } 
      setDialogState(false)
    }

    const DeleteElement = (index,type) => {
      if(type==="work"){
        setWorks(Works.filter((e,i)=>  i != index))
      }
      else if(type==="education"){
        setEducation(Education.filter((e,i)=> i!=index))
      }
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
          </Toolbar>
        </AppBar>
        <List>
          {
            UserKeys.map((element,index)=> {
              return (<UpdateUserList item={element} key={index} User={{UserInfo,setUserInfo}}  KeyChange={KeyChange}/>)})
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
              value={UserInfo.country}
              inputProps={TextFieldCSS}
              onChange={KeyChange}
              name="country"
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
              <div
              style={{
                display:"flex",
                flexDirection:"column",
                justifyContent : "space-between"
              }}
              
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
                          <IconButton onClick={()=>{DeleteElement(i,"work")}}>
                          <ClearIcon/>
                          </IconButton>                           
                          </div>
                      )
                    })
                  }
                </List>
                </div>
                <Button variant="contained" style={{
                  fontSize : "0.8vw",
                  width : "fit-content",
                  margin : "4px auto"
                }}
                onClick={()=>{
                  setTypeState("work");
                  setDialogState(true);
                }}
                >
                  Add Work/Project
                </Button>
              </div>
              <div
                style={{
                  display:"flex",
                  flexDirection:"column",
                  justifyContent : "space-between"
                }}
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
                          <IconButton onClick={()=>{DeleteElement(i,"education")}}>
                          <ClearIcon/>
                          </IconButton>                           
                          </div>
                      )
                    })
                  }
                </List>
                </div>
                <Button variant="contained"
                  style={{
                    fontSize : "0.8vw",
                    width : "fit-content",
                    margin : "4px auto"
                  }}
                  onClick={()=>{
                    setTypeState("education")
                    setDialogState(true)
                  }}
                >
                Add Education
                </Button>
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
              value={UserInfo.description}
              onChange={KeyChange}
              name="description"
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

      <Dialog open={DialogState}>
        <DialogTitle>Get In Touch</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {TypeState==="work"?"Enter your work : ":"Enter your education : "}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            type="text"
            fullWidth
            variant="standard"
            value={TypeState==="work"?WorkState:EducationState}
            onChange={UpdateElement}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setDialogState(false)}}>Cancel</Button>
          <Button onClick={AddElement}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default UpdateUser;
