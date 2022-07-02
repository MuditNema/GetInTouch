import { makeStyles } from '@mui/styles'
import React from 'react'
import {Paper, Stack, Typography,TextField,Button} from '@mui/material'
import { Avatar } from '@mui/material'
import Divider from '@mui/material/Divider';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { getDoc, doc, getFirestore } from 'firebase/firestore';
import { app } from '../Firebase/FirebaseConfig';
import { useState } from 'react';
import Loading from "./Loading"
import WorkList from './List/WorkList';
import { Box } from '@mui/system';
import {useSelector} from "react-redux"

import emailjs from '@emailjs/browser';
import AlertComponent from './AlertComponent';



const avtr = {
    height : "15vw",
    width : "15vw"
}
const typoCSS = {
    color : "#3C5658",
    display : "inline",
    fontSize : "1.5vw",
    padding : "2px 12px",
    display :"flex",
}
const inputStyle = {
    style : {
        fontSize : "1.2vw",
        padding : "4px 8px"
      }
}
const useStyles = makeStyles((theme) => ({
    signupbox :{
        border : "2px solid",
        borderColor : theme.palette.primary.main,
        width: "60%",
        margin : " 3vw auto"
    }
}))



const Hiring = () => {
    const location = useLocation();
    const db = getFirestore(app)
    const [CurrentUser,setCurrentUser] = useState({});
    const [LoaderState, setLoaderState] = useState(true)
    const [Requirement, setRequirement] = useState("")
    const IsLoggedIn = useSelector((state)=> state.UserStatus)
    const SenderInfo = useSelector((state)=> state.UserReducer) 
    const [ErrorConsole, setErrorConsole] = useState({
        e:true,
        AlertState:false,
        message:""
    })
    useEffect(() => {
        const GetUser = async () => {
            try {
                const id =  ((location.pathname).toString()).substr(6);
                const docRef = doc(db,"users",id)
                const querySnapshot = await getDoc(docRef);
                console.log(querySnapshot.data())
                setCurrentUser(querySnapshot.data())
                setLoaderState(false)
            } catch (error) {
                console.log(error);
            }
        }   
        GetUser();
    }, [])

    const KeyChange = (e) => {
        setRequirement(e.target.value)
    }

    const HandleSubmit = async () => {
        try {
            if(!IsLoggedIn){
                setErrorConsole({...ErrorConsole,message:"You are required to login",e:true,AlertState : true})
                setTimeout(() => {
                    setErrorConsole({...ErrorConsole,message:"",e:false,AlertState : false})
                }, 3500);
                return;
            }
            if(Requirement.length==0){
                setErrorConsole({...ErrorConsole,message:"Please enter your requirements",e:true,AlertState : true})
                setTimeout(() => {
                    setErrorConsole({...ErrorConsole,message:"",e:false,AlertState : false})
                }, 3500);
                return;
            }
            const EmailInputs = {
                sender_name : SenderInfo.name,
                name : CurrentUser.name,
                message : Requirement,
                sender_contact : SenderInfo.contact,
                sender_email : SenderInfo.email,
                reciever_email : CurrentUser.email
            }
            const Email = await emailjs.send('service_la9duhq', 'template_up869fa',EmailInputs,'QF4UVhq5IcR0nAXXx' )
            setErrorConsole({...ErrorConsole,message:"Email sent successfully ",e:false,AlertState : true})
                setTimeout(() => {
                    setErrorConsole({...ErrorConsole,message:"",e:false,AlertState : false})
                }, 3500);
        } catch (error) {
            // console.log(error)
            setErrorConsole({...ErrorConsole,message:error.toString(),e:true,AlertState : true})
                setTimeout(() => {
                    setErrorConsole({...ErrorConsole,message:"",e:false,AlertState : false})
                }, 3500);
        }
    }

    const classes =  useStyles();
    return (
        <>
        <AlertComponent AlertState={ErrorConsole.AlertState} e={ErrorConsole.e} message={ErrorConsole.message}/>
        {!LoaderState?
        <Paper
        elevation={5}
        className={classes.signupbox}
    >
        <Stack
            spacing={2}
            direction="column"
            alignItems='center'
            justifyContent="center"
        >
            <div
                style={{
                    width : "85%",
                    display : "flex",
                    flexDirection :"row",
                    justifyContent: "space-around",
                    alignItems  : "center"
                }}
                spacing={2}
                direction={{
                    md : "row",
                    sm : "column"
                }}
                justifyContent="space-around"
                alignItems="center"
            >
                <div>


            <Avatar 
                src={CurrentUser.profile}
                sx={avtr}
            />
                </div>
                <div
                    style={{
                        width : "50%"
                    }}
                >


            <Typography
                sx={typoCSS}
            > {CurrentUser.description}.</Typography>
                </div>
            </div>
            <Divider variant="middle" sx={{height : "2.5px",backgroundColor : "#3C5658",width : "75%"}}/>
            <div
                style={{
                    width : "75%",
                    display : "flex",
                    flexDirection : "row",
                    alignItems : "center",
                    justifyContent : "space-between"
                }}
            >
                <Box>
                    <Typography sx={typoCSS} style={{display:"flex",alignItems : "center"}}>
                        <EmailIcon
                            sx={{
                                p : "5px"
                            }}
                        />
                        {CurrentUser.email}</Typography>
                    <Typography sx={typoCSS} style={{display:"flex",alignItems : "center"}}>
                        <LocalPhoneIcon 
                            sx={{
                                p :'5px'
                        }}
                        />
                        {CurrentUser.contact}</Typography>
                    <Typography sx={typoCSS}>Pricing starts from $<u> {CurrentUser.pricing} </u></Typography>
                </Box>
                <Box>
                    <Typography sx={typoCSS}>{CurrentUser.name}</Typography>
                    <Typography sx={typoCSS} style={{
                        fontSize : "1.5vw",
                        padding : "0px 12px"
                    }}>{CurrentUser.skills} </Typography>
                    <Typography sx={typoCSS}>{`${CurrentUser.city} , ${CurrentUser.country}`}</Typography>
                </Box>
                {/* <div>
                    <Avatar sx={avtr}/>
                </div> */}

            </div>
            <Divider variant="middle" sx={{height : "2.5px",backgroundColor : "#3C5658",width : "75%"}}/>
            <div style={{
                display  : "flex",
                flexDirection : "column",
                alignItems : "center",
                justifyContent : "center"
            }}
            >
                <div>
                    <Typography sx={typoCSS}> <u> Work Experience/Projects </u></Typography>
                </div>


                <div>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {
                            CurrentUser.work.map((item,index)=>{
                                console.log(item)
                                return (<WorkList key={index} index={index} element={item}/>)
                            })
                        }
                    </List>
                </div>


                <div>
                <Typography sx={typoCSS} style={{display:"flex",alignItems : "center"}}> 
                <a target="_blank" href={CurrentUser.github}>
                <Button>
                <GitHubIcon
                    sx={{
                        p : "5px"
                    }}
                    fontSize="inherit"
                />
                Github
                </Button>
                </a>
                <a target="_blank" href={CurrentUser.linkedin}>
                <Button>
                <LinkedInIcon
                    sx={{
                        p : "5px"
                    }}
                    fontSize="inherit"
                />
                LinkedIn
                </Button>
                </a>
                </Typography>
                </div>
            </div>
            <Divider variant="middle" sx={{height : "2.5px",backgroundColor : "#3C5658",width : "75%"}}/>
            <div
                style={{
                    display  : "flex",
                    flexDirection : "column",
                    alignItems : "center",
                    justifyContent : "center"
                }}
            >
                <div>
                    <Typography sx={typoCSS}> <u> Descibe your requirement </u></Typography>
                </div>
                <div style={{
                    width : "200%"
                }}>
                    <TextField
                        id="outlined-password-input"
                        type="email"
                        autoComplete="current-password"
                        color="primary"
                        size="small"
                        fullWidth
                        multiline={true}
                        inputProps={inputStyle}
                        minRows={4}
                        maxRows={4}
                        name="requirement"
                        value={Requirement}
                        onChange={KeyChange}
                    />
                </div>
                <div>
                    <Button
                    onClick={HandleSubmit}
                    variant='contained'
                        sx={{
                            fontSize : "1.6vw",
                            m : "8px"
                        }}
                    >HIRE FOR ${CurrentUser.pricing}</Button>
                </div>
            </div>
        </Stack>
    </Paper>
    :<Loading/>}
        
        </>
      )
}

export default Hiring