import { Avatar, Button, FormControl, Grid, Paper, Stack, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles';
import React,{ useState, useMemo } from 'react'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import AddIcon from '@mui/icons-material/Add';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ClearIcon from '@mui/icons-material/Clear';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import {app} from "../Firebase/FirebaseConfig"
import { getAuth, createUserWithEmailAndPassword  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import countryList from 'react-select-country-list'
import WorkList from './List/WorkList';
import EduList from './List/EduList';
import AlertComponent from './AlertComponent';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';
//initializing firebase 

const typoCSS = {
    color : "#3C5658",
    display : "inline",
    fontSize : "2.5vw",
    padding : "2px 12px",
    display :"flex",
    alignItems : "center",
    justifyContent : "center"
}
const gridItemCSS = {
    padding : "0px 5px"
}
const inputStyle = {
    style : {
        fontSize : "1.7vw",
        padding : "4px 8px"
      }
}
const useStyles = makeStyles((theme)=>({
    signupbox :{
        border : "2px solid",
        borderColor : theme.palette.primary.main,
        width: "80%",
        margin : " 3vw auto"
    },
    inputdiv : {
        width : "80%",
        margin : "auto",
        padding : "20px 2px",
        display : "flex",
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "center",
        "@media screen and (max-width : 900px)" : {
            flexDirection : "column",
            padding : "2px 2px"
        }
    }
}))



const Signup = () => {
    const classes =  useStyles();
    //setup to add the country list
    const options = useMemo(() => countryList().getData(), [])
    
    //setting up the signup
    const auth = getAuth(app);
    const db = getFirestore(app);
    const storage = getStorage(app);

    const [PasswordConfirm, setPasswordConfirm] = useState("");
    
    const [ImageURL, setImageURL] = useState({})
    const [TempSRC, setTempSRC] = useState("")
    const [Education, setEducation] = useState([])
    const [EduState, setEduState] = useState(false)
    const [NewEdu, setNewEdu] = useState("");
    const [Works, setWorks] = useState([])
    const [WorkState, setWorkState] = useState(false)
    const [NewWork, setNewWork] = useState("");
    const [UserCreds, setUserCreds] = useState({
        email : "",
        name : "",
        contact : "",
        city : "",
        country : "",
        github : "",
        linkedin : "",
        pricing : 0,
        password : "",
        description : "",
        skills : "",
        profile : "",
        work :[],
        education :[]
    })
    

    const [ErrorHandler, setErrorHandler] = useState({
        email : false,
        name : false,
        contact : false,
        city : false,
        country : false,
        github : false,
        linkedin : false,
        pricing : false,
        password : false,
        description : false,
        skills : false,
        profile : false,
        work : false,
        education : false
    })

    const KeyHandler = (e) => {
        if(e.target.name === "passwordconfirm"){
            setPasswordConfirm(e.target.value)
            return 
        }
        setUserCreds({...UserCreds,[e.target.name]:e.target.value})
    }

    const SetObject = (url,w,e) => {
        const Obj = UserCreds
        Obj.work = w 
        Obj.education = e
        Obj.profile = url
        setUserCreds(Obj);
    }

    const CheckForm = () => {
        let ErrorObj = {
            email : !validator.isEmail(UserCreds.email),
            name : !validator.isLength(UserCreds.name,5,20),
            contact : !validator.isNumeric(UserCreds.contact),
            city : validator.isEmpty(UserCreds.city),
            country : validator.isEmpty(UserCreds.country),
            github : validator.isEmpty(UserCreds.github),
            linkedin : validator.isEmpty(UserCreds.linkedin),
            skills : validator.isEmpty(UserCreds.skills),
            password : !(validator.isStrongPassword(UserCreds.password) && UserCreds.password === PasswordConfirm),
            description : !validator.isLength(UserCreds.description,10,120),
            profile : validator.isEmpty(UserCreds.profile)
        }
        for(const item in ErrorObj){
            if(ErrorObj[item]) return false;
        }
        setErrorHandler(ErrorObj);
        return false;
    }
    const navigate = useNavigate();
    const HandleSubmit = async (e) => {
        e.preventDefault();
        try {
            //Check for possible errors (form validation)
            const IsError =  CheckForm();
            if(IsError){
                return;
            }

            //registering the user
            const User = await createUserWithEmailAndPassword(auth,UserCreds.email,UserCreds.password)
            console.log(User);
            
            
            //uploading profile picture for the user
            const ProfileRef = ref(storage, `Profile/${UserCreds.email}`);
            const UploadTask = await uploadBytesResumable(ProfileRef, ImageURL);
            const url =  await getDownloadURL(ref(storage,`Profile/${UserCreds.email}`))
            //update the profile photo url in the final OBJ
            //add the works and education in the final OBJ
            const work = Works
            const education = Education;
            console.log(work,education)
            SetObject(url,work,education);
            console.log(UserCreds)
            //adding the user info to the database
            const UserDocRef = await addDoc(collection(db,"users"),UserCreds)
            console.log(UserDocRef.id);
            setErrorConsole({...ErrorConsole,message:"Registered successfully".toString(),AlertState:true,e:false})
            navigate('/login')
            setTimeout(() => {
                setErrorConsole({...ErrorConsole,message:"",AlertState:false,e:false});
            }, 5000);
        } catch (error) {
            console.log(error)
            setErrorConsole({...ErrorConsole,message:error.toString(),AlertState:true,e:true})
            setTimeout(() => {
                setErrorConsole({...ErrorConsole,message:"",AlertState:false,e:false});
            }, 5000);
        }
    }
    //image section
    const ImageUpload = async(Obj) => {
        const ProfileRef = ref(storage, `Temp/profile`);
        const UploadTask = await uploadBytesResumable(ProfileRef, Obj);
        const url =  await getDownloadURL(ref(storage,`Temp/profile`))
        setUserCreds({...UserCreds,...{profile:url}})
        console.log(Obj);
        console.log(url);
        setTempSRC(url);
    }

    //work section
    const DeleteWorkItem = (i) => {
        setWorks(Works.filter((e,ind)=>{ return ind!=i}))
    }
    const ToggleWorkDialog = () => {
        setWorkState(!WorkState);
    }
    const AddNewWork = (e) => {
        e.preventDefault();
        const newItem = NewWork;
        setWorks([...Works,newItem])
        setWorkState(false)
        setNewWork("")
    }
    const UpdateNewWork = (e) => {
        setNewWork(e.target.value);
    }

    //education section
    const DeleteEduItem = (i) => {
        setEducation(Education.filter((e,ind)=>{ return ind!=i}))
    }
    const ToggleEduDialog = () => {
        setEduState(!WorkState);
    }
    const AddNewEdu = (e) => {
        e.preventDefault();
        const newItem = NewEdu;
        setEducation([...Education,newItem])
        setEduState(false)
        setNewEdu("")
    }
    const UpdateNewEdu = (e) => {
        setNewEdu(e.target.value);
    }


    const [ErrorConsole, setErrorConsole] = useState({message:"This is message",AlertState:false,e:true})

    
  return (
    <Paper
        elevation={5}
        className={classes.signupbox}
    >
        <AlertComponent message={ErrorConsole.message} AlertState={ErrorConsole.AlertState} e={ErrorConsole.e}  />
        <FormControl>
        <Grid container  item={true}>
            <Grid item 
                root
                sx={gridItemCSS}
                md={6}
                xs={12}
            >
                <div
                    className={classes.inputdiv}
                >
                    <Typography
                        sx={typoCSS}
                    >Email</Typography>
                    <TextField
                        required
                        error={ErrorHandler.email}
                        label = {ErrorHandler.email?"Invalid Email":""}
                        type="email"
                        name="email"
                        autoComplete="current-password"
                        color="primary"
                        size="small"
                        fullWidth
                        sx={{
                            "@media screen and (max-width : 900px)" : {
                                width : "50%"
                            }
                        }}
                        inputProps={inputStyle}
                        value={UserCreds.email}
                        onChange={KeyHandler}
                    >

                    </TextField>
                </div>
            </Grid>
            <Grid item
                sx={gridItemCSS}
                md={6}
                xs={12}
            >
                <div
                    className={classes.inputdiv}
                >
                    <Typography
                        sx={typoCSS}
                    >Name</Typography>
                    <TextField
                        required
                        error={ErrorHandler.name}
                        label = {ErrorHandler.name?"Must be 5 alphabets":""}
                        type="text"
                        name="name"
                        autoComplete="current-password"
                        color="primary"
                        size="small"
                        fullWidth
                        inputProps={inputStyle}
                        sx={{
                            "@media screen and (max-width : 900px)" : {
                                width : "50%"
                            }
                        }}
                        value={UserCreds.name}
                        onChange={KeyHandler}
                    ></TextField>
                </div>
            </Grid>
            <Grid item
                sx={gridItemCSS}
                md={6}
                xs={12}
            >
                <div
                    className={classes.inputdiv}
                >
                    <Typography
                        sx={typoCSS}
                    >Contact</Typography>
                    <TextField
                        required
                        type="text"
                        name="contact"
                        error={ErrorHandler.contact}
                        label = {ErrorHandler.contact?"Must be 10 digits":""}
                        autoComplete="current-password"
                        color="primary"
                        size="small"
                        fullWidth
                        inputProps={inputStyle}
                        sx={{
                            "@media screen and (max-width : 900px)" : {
                                width : "50%"
                            }
                        }}
                        value={UserCreds.contact}
                        onChange={KeyHandler}
                    ></TextField>
                </div>
                <div
                    className={classes.inputdiv}
                >
                    <Typography
                        sx={typoCSS}
                    >City</Typography>
                    <TextField
                        required
                        type="text"
                        name="city"
                        error={ErrorHandler.city}
                        label = {ErrorHandler.city?"Please Enter City":""}
                        autoComplete="current-password"
                        color="primary"
                        size="small"
                        fullWidth
                        inputProps={inputStyle}
                        sx={{
                            "@media screen and (max-width : 900px)" : {
                                width : "50%"
                            }
                        }}
                        value={UserCreds.city}
                        onChange={KeyHandler}
                    ></TextField>
                </div>
                <div
                    className={classes.inputdiv}
                >
                    <Typography
                        sx={typoCSS}
                    >Country</Typography>
                    <TextField
                        required
                        select
                        name="country"
                        error={ErrorHandler.country}
                        label = {ErrorHandler.country?"Please Select a Country":""}
                        autoComplete="current-password"
                        color="primary"
                        size="small"
                        fullWidth
                        inputProps={inputStyle}
                        sx={{
                            "@media screen and (max-width : 900px)" : {
                                width : "50%"
                            }
                        }}
                        value={UserCreds.country}
                        onChange={KeyHandler}
                    >
                        {options.map((option) => (
                            <MenuItem key={option.label} value={option.label} style={{fontSize : "1.2vw"}}>
                            {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
            </Grid>
            <Grid item
                sx={gridItemCSS}
                md={6}
                xs={12}
            >
                <div
                    className={classes.inputdiv}
                >
                        <Avatar
                            src={TempSRC}
                            sx={{
                                height : "12vw",
                                width : "12vw"
                            }}
                        />
                </div>
                <div
                    className={classes.inputdiv}
                    style={{
                        padding : "0px"
                    }}
                >
                    
                    <Typography 
                        sx={typoCSS} 
                        style={{textDecorationLine : "underline",position:"absolute"}}
                    >
                        <TextField 
                            src={TempSRC}
                            type="file" 
                            name="image"
                            error={ErrorHandler.profile}
                            label = {ErrorHandler.profile?"Add a profile picture":""}
                            style={{position:"absolute",zIndex:'2',opacity:"0"}}
                            onChange={async (e)=>{
                                setImageURL(e.target.files[0])
                                ImageUpload(e.target.files[0]);
                            }}
                        ></TextField>
                        <Button > <AddAPhotoIcon sx={typoCSS}/> </Button>
                        Add Profile photo

                    </Typography>
                    
                </div>
            </Grid>
            <Grid item 
                root
                sx={gridItemCSS}
                md={6}
                xs={12}
            >
                <div
                    className={classes.inputdiv}
                >
                    <Button onClick={ToggleWorkDialog}>
                    <Typography
                        sx={typoCSS} style={{textDecorationLine : "underline",border : "4px solid",width :"100%"}}
                    >
                        <AddIcon sx={typoCSS} style={{paddingRight : "0px"}}/>
                        Work Experience
                    </Typography>
                    </Button>
                    <Dialog open={WorkState} >
                        <DialogTitle>GetInTouch</DialogTitle>
                        <FormControl>
                        <DialogContent>
                        <DialogContentText>
                            Please Enter the work carefully. Once entered it cannot be changed
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="work"
                            label="Work"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={NewWork}
                            onChange={UpdateNewWork}
                        />
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={ToggleWorkDialog}>Cancel</Button>
                        <Button onClick={AddNewWork}>Submit</Button>
                        </DialogActions>
                        </FormControl>
                    </Dialog>
                </div>
                <div className={classes.inputdiv}>
                    <List >
                        <Paper elevation={6}>
                        {
                            Works.map((element,index)=>{
                                return(
                                    <div style={{display:"flex"}}>
                                    <WorkList key={index} element={element} index={index} />
                                    <Button onClick={()=>{DeleteWorkItem(index)}}>
                                        <ClearIcon/>
                                    </Button>
                                    </div>
                                )
                            })
                        }
                        </Paper>
                            
                    </List>
                </div>
            </Grid>
            <Grid item 
                root
                sx={gridItemCSS}
                md={6}
                xs={12}
            >
                <div
                    className={classes.inputdiv}
                >
                    <Button onClick={ToggleEduDialog}>
                    <Typography
                        sx={typoCSS} style={{textDecorationLine : "underline",border : "4px solid ",width :"100%" }}
                    >
                        <AddIcon sx={typoCSS} style={{paddingRight : "0px"}}/>
                        Education
                    </Typography>
                    </Button>
                    <Dialog open={EduState} >
                        <DialogTitle>GetInTouch</DialogTitle>
                        <FormControl>
                        <DialogContent>
                        <DialogContentText>
                            Please Enter the work carefully. Once entered it cannot be changed
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="education"
                            label="Education"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={NewEdu}
                            onChange={UpdateNewEdu}
                        />
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={ToggleEduDialog}>Cancel</Button>
                        <Button onClick={AddNewEdu}>Submit</Button>
                        </DialogActions>
                        </FormControl>
                    </Dialog>
                </div>
                <div className={classes.inputdiv}>
                    <List >
                        <Paper elevation={6} >
                        {
                            Education.map((element,index)=>{
                                return(
                                    <div style={{display:"flex"}}>
                                    <EduList key={index} element={element} index={index} />
                                    <Button onClick={()=>{DeleteEduItem(index)}}>
                                        <ClearIcon/>
                                    </Button>
                                    </div>
                                )
                            })
                        }
                        </Paper>
                            
                    </List>
                </div>
            </Grid>
            <Grid item 
                root
                sx={gridItemCSS}
                md={6}
                xs={12}
            >
                <div
                    className={classes.inputdiv}
                >
                    <Typography
                        sx={typoCSS}
                    >Github</Typography>
                    <TextField
                        required
                        type="text"
                        name="github"
                        error={ErrorHandler.github}
                        label={ErrorHandler.github?"Enter your github profile link":""}
                        autoComplete="current-password"
                        color="primary"
                        size="small"
                        fullWidth
                        sx={{
                            "@media screen and (max-width : 900px)" : {
                                width : "50%"
                            }
                        }}
                        inputProps={inputStyle}
                        value={UserCreds.github}
                        onChange={KeyHandler}
                    ></TextField>
                </div>
            </Grid>
            <Grid item 
                root
                sx={gridItemCSS}
                md={6}
                xs={12}
            >
                <div
                    className={classes.inputdiv}
                >
                    <Typography
                        sx={typoCSS}
                    >LinkedIn</Typography>
                    <TextField
                        required
                        type="text"
                        name="linkedin"
                        error={ErrorHandler.linkedin}
                        label={ErrorHandler.linkedin?"Enter your linkedin profile link":""}
                        autoComplete="current-password"
                        color="primary"
                        size="small"
                        fullWidth
                        sx={{
                            "@media screen and (max-width : 900px)" : {
                                width : "50%"
                            }
                        }}
                        inputProps={inputStyle}
                        value={UserCreds.linkedin}
                        onChange={KeyHandler}
                    ></TextField>
                </div>
            </Grid>
            <Grid item 
                root
                sx={gridItemCSS}
                md={6}
                xs={12}
            >
                <div
                    className={classes.inputdiv}
                >
                    <Typography
                        sx={typoCSS}
                    >Pricing</Typography>
                    <TextField
                        required
                        type="number"
                        name="pricing"
                        error={ErrorHandler.pricing}
                        label={ErrorHandler.pricing?"Must be 5 dollars":""}
                        autoComplete="current-password"
                        color="primary"
                        size="small"
                        fullWidth
                        sx={{
                            "@media screen and (max-width : 900px)" : {
                                width : "50%"
                            }
                        }}
                        inputProps={inputStyle}
                        value={UserCreds.pricing}
                        onChange={KeyHandler}
                    ></TextField>
                </div>
            </Grid>
            <Grid item 
                root
                sx={gridItemCSS}
                md={6}
                xs={12}
            >
                <div
                    className={classes.inputdiv}
                >
                    <Typography
                        sx={typoCSS}
                    >Skill</Typography>
                    <TextField
                        required
                        type="text"
                        name="skills"
                        error={ErrorHandler.skills}
                        label={ErrorHandler.skills?"Enter your skills":""}
                        autoComplete="current-password"
                        color="primary"
                        size="small"
                        fullWidth
                        sx={{
                            "@media screen and (max-width : 900px)" : {
                                width : "50%"
                            }
                        }}
                        inputProps={inputStyle}
                        value={UserCreds.skills}
                        onChange={KeyHandler}
                    ></TextField>
                </div>
            </Grid>
            <Grid item 
                root
                sx={gridItemCSS}
                md={6}
                xs={12}
            >
                <div
                    className={classes.inputdiv}
                >
                    <Typography
                        sx={typoCSS}
                    >Password</Typography>
                    <TextField
                        required
                        type="password"
                        name="password"
                        error={ErrorHandler.password}
                        label={ErrorHandler.password?"Must be 8 characters long and Strong":""}
                        autoComplete="current-password"
                        color="primary"
                        size="small"
                        fullWidth
                        sx={{
                            "@media screen and (max-width : 900px)" : {
                                width : "50%"
                            }
                        }}
                        inputProps={inputStyle}
                        value={UserCreds.password}
                        onChange={KeyHandler}
                    ></TextField>
                </div>
            </Grid>
            <Grid item 
                root
                sx={gridItemCSS}
                md={6}
                xs={12}
            >
                <div
                    className={classes.inputdiv}
                >
                    <Typography
                        sx={typoCSS}
                    >Confirm</Typography>
                    <TextField
                        required
                        type="password"
                        error = {ErrorHandler.password}
                        label = {ErrorHandler.password?"Enter your password correctly":""}
                        name="passwordconfirm"
                        autoComplete="current-password"
                        color="primary"
                        size="small"
                        fullWidth
                        sx={{
                            "@media screen and (max-width : 900px)" : {
                                width : "50%"
                            }
                        }}
                        inputProps={inputStyle}
                        value={PasswordConfirm}
                        onChange={KeyHandler}
                    ></TextField>
                </div>
            </Grid>
            <Grid item
                root
                sx={gridItemCSS}
                md={12}
                xs={12}
            >
                <div
                    className={classes.inputdiv}
                >
                    <Typography
                        sx={typoCSS}
                    >Describe yourself</Typography>
                    
                </div>
                <div
                    className={classes.inputdiv}
                >
                    <TextField
                        required
                        type="text"
                        error={ErrorHandler.description}
                        label = {ErrorHandler.description?"Enter something about yourself":""}
                        name="description"
                        autoComplete="current-password"
                        color="primary"
                        size="small"
                        fullWidth
                        multiline={true}
                        inputProps={inputStyle}
                        minRows={4}
                        maxRows={4}
                        value={UserCreds.description}
                        onChange={KeyHandler}
                    />
                    
                </div>
            </Grid>
            <Grid item
                root
                sx={gridItemCSS}
                md={12}
                xs={12}
            >
                <div
                    className={classes.inputdiv}
                >
                    <Button
                        variant='contained'
                        sx={{
                            fontSize : "2vw"
                        }}
                        onClick={HandleSubmit}
                    >Signup</Button>
                    
                </div>
                
            </Grid>
        </Grid>
        </FormControl>
    </Paper>
  )
}

export default Signup