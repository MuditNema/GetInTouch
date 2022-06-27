import { Divider, Paper, Stack, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import Avatar from '@mui/material/Avatar'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import {Button} from '@mui/material'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import {LoggedIn,LoginUser} from "../Redux/actions"

import { useEffect ,useState} from 'react';

import UpdateUser from '../Helpers/UpdateUser';


const typoCSS = {
    color : "#3C5658",
    display : "inline",
    fontSize : "2.5vw",
    padding : "2px 12px",
    display :"flex"
}
const avtr = {
    height : "18vw",
    width : "18vw",
    margin : "5px 10px"
}
const btnstyle = {
    display:"flex",
    alignItems : "center"
}
const useStyles = makeStyles((theme)=>({
    blockLeft : {
        margin : "12px 0px",
        width : "75%",
        backgroundColor : "#E5F6F5",
        borderTopRightRadius : "200px",
        borderBottomRightRadius : "200px"
    },
    blockRight : {
        margin : "12px 0px",
        width : "75%",
        backgroundColor : "#E5F6F5",
        borderTopRightRadius : "200px",
        borderBottomRightRadius : "200px",
        position :"relative"
    },
    profilebox : {
        border : "2px solid",
        borderColor : theme.palette.primary.main,
        width: "80%",
        margin : " 3vw auto"
    },
    divider : {
        backgroundColor : theme.palette.primary.main,
        width : "3px"
    },
    item : {
        minWidth : "fit-content",
        margin : "auto"
    },
    typograph : {
        textAlign : "center",
        fontSize : "2rem",
        padding : "5px",
    }
}))


const Profile = () => {
    const classes =  useStyles();
    const dispatch = useDispatch();
    const UserInfo = useSelector((state) => state.UserReducer);
    const [UpdateDialog, setUpdateDialog] = useState(false)
    // setUserInfo(LoginUser({info:{},valid:true},dispatch))
    useEffect(() => {
        LoginUser({valid:false},dispatch)
        LoggedIn(dispatch);
    },[])
    
    const DialogState = () => {
        setUpdateDialog(!UpdateDialog);
    }

    return (
        <>
            <Paper
            elevation={3}
            className={classes.profilebox}
            >
        <Stack
            spacing={3}
            direction="column"
            justifyContent="flex-end"
        >
            <Stack
                direction={{md : "row",sm : "row"}}
                className={classes.blockLeft}
                justifyContent = "space-between"
            >
                <div>
                    <Typography 
                            variant="h4" 
                            display="flex"
                            className={classes.typograph}
                            alignItems="flex-start"
                            style={{
                            color : "#3C5658",
                            paddingLeft : "12px"
                            }}
                    >
                        {UserInfo.name}
                        <Button
                            onClick={DialogState}
                        >
                            <EditIcon
                                sx={{
                                    fontSize : "2.2rem",
                                    ml : "12px"
                                }}
                            />
                        </Button>
                    </Typography>
                    <Typography sx={typoCSS}
                        style={{
                            fontSize : "1.5vw",
                            padding : "0px 12px"
                        }}
                    >
                        {UserInfo.skills}
                    </Typography>
                    <Typography sx={typoCSS} style={btnstyle}>
                        <LocalPhoneIcon
                            fontSize="inherit"
                        />
                        {UserInfo.contact}
                    </Typography>
                    <Typography sx={typoCSS} style={btnstyle}>
                        <EmailIcon
                            fontSize="inherit"
                        />
                        {UserInfo.email}
                    </Typography>
                    <Typography sx={typoCSS} style={btnstyle}>
                        <HomeIcon
                            fontSize="inherit"
                        />
                        {`${UserInfo.city},${UserInfo.country}`}
                    </Typography>
                </div>
                <div>
                    <Avatar
                        src = {UserInfo.profile}
                        sx={avtr}
                    />
                </div>
            </Stack>
            <Stack
                direction={{md : "row",sm : "row"}}
                className={classes.blockRight}
                justifyContent = "space-between"
            >
                <div
                    style={{
                        display:"flex",
                        flexDirection:"column",
                        justifyContent:"space-between"
                    }}
                >
                    <Typography  
                    style={{
                        color : "#3C5658",
                        display : "inline",
                        fontSize : "1.5vw",
                        padding : "2px 12px",
                        display :"flex",
                        
                    }}
                    >{UserInfo.description}</Typography>
    
                    <Typography  style={{
                        color : "#3C5658",
                        display : "inline",
                        fontSize : "1.5vw",
                        padding : "2px 12px",
                        display :"flex",
                        justifyContent : "center",
                        fontWeight : "bold"
                    }}>Pricing starts from $ <u>{UserInfo.pricing}</u></Typography>
                </div>
                
                <div>
                    <Avatar
                        sx={avtr}
                    />
                </div>
            </Stack>
            <Stack
                direction={{md : "row",sm : "row"}}
                className={classes.blockRight}
                justifyContent = "space-evenly"
            >
                <div style={{
                    width : "50%",
                    display : "flex",
                    flexDirection : "column",
                    alignItems : "center",
                    justifyContent:"flex-start"
                }}>
                    <div>
                    <Typography
                        style={{
                        color : "#3C5658",
                        display : "inline",
                        fontSize : "1.8vw",
                        padding : "2px 12px",
                        display :"flex",
                        width : "fit-content",
                        margin : "auto"
                    }}  
                    ><u> Work Experience/Projects </u>
                    </Typography>

                    </div>
                    <div>

                    <List sx={{ width: '100%', maxWidth: 360 }}>
                        {   
                            UserInfo.work.map((item,index)=>(
                                <ListItem
                                    key={index}
                                    className={classes.item}
                                    sx={{
                                        width:"fit-content",
                                        margin:"auto"
                                    }}
                                >
                                    <Typography style={{
                                        color : "#3C5658",
                                        display : "inline",
                                        fontSize : "1.5vw",
                                        padding : "2px 12px",
                                        display :"flex"
                                    }} > {`${index+1}. ${item}`}</Typography>
                                </ListItem>
                            ))
                        }
                        
                    </List>
                    </div>
                    <div>
                        <ListItem>
                            <Typography style={{
                                color : "#3C5658",
                                display : "inline",
                                fontSize : "1.5vw",
                                padding : "2px 12px",
                                display :"flex"
                            }} >
                                <a href={UserInfo.github} style={{textDecoration:"none"}} target = "_blank">
                                <Button>
                                <Typography  
                                    
                                    variant="h5" 
                                    display="flex"
                                    className={classes.typograph}
                                    alignItems="flex-start"
                                    justifyContent='center'
                                >
                                    <GitHubIcon
                                        
                                        sx={{
                                            fontSize : "2.5rem",
                                            mr : "4px"
                                        }}
                                    />
                                    Github
                                </Typography>
                                </Button>
                                </a>
                                <a href={UserInfo.linkedin} style={{textDecoration:"none"}} target = "_blank">
                                <Button>
                                <Typography  
                                    variant="h5" 
                                    display="flex"
                                    className={classes.typograph}
                                    alignItems="flex-start"
                                    justifyContent='center'
                                >
                                    <LinkedInIcon 
                                        sx={{
                                            fontSize : "2.5rem",
                                            mr : "4px"
                                        }}
                                    />
                                    LinkedIn
                                </Typography>
                                </Button>
                                </a>
                            </Typography>
                        </ListItem>
                    </div>
                </div>
                <Divider
                    orientation="vertical"
                    flexItem
                    className={classes.divider}
                />
                <div  style={{
                    width : "50%"
                }}>
                    <Typography
                        style={{
                        color : "#3C5658",
                        display : "inline",
                        fontSize : "1.8vw",
                        padding : "2px 8px",
                        display :"flex",
                        width : "fit-content",
                        margin : "auto"
                    }}  
                    ><u> Education </u>
                    </Typography>
                    <List sx={{ width: '100%'}}>
                        {
                            UserInfo.education.map((item,index)=>(
                                <ListItem
                                    key={index}
                                    className={classes.item}
                                    sx={{
                                        width:"fit-content",
                                        margin:"auto"
                                    }}
                                >
                                    <Typography style={{
                                        color : "#3C5658",
                                        display : "inline",
                                        fontSize : "1.5vw",
                                        padding : "2px 12px",
                                        display :"flex"
                                    }} > {`${index+1}. ${item}`}</Typography>
                                </ListItem>
                            ))
                        }
                        
                    </List>
                </div>
            </Stack>
        </Stack>
        </Paper>

        <UpdateUser state={{UpdateDialog,setUpdateDialog}}/>

        </>
    )
    
}







export default Profile