import { Avatar, Box, Grid, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import { makeStyles } from '@mui/styles'
import React from 'react'
import headerBG from '../resources/headerBG.png'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { LoginUser,LoggedIn, UserId } from '../Redux/actions'
import Cookies from 'js-cookie'
import Typewriter from 'typewriter-effect'

const useStyles = makeStyles({
    box : {
        backgroundColor : "#E5F6F5",
        width : "100%",
        height : "25rem",
        borderBottomLeftRadius : "200px",
        "@media screen and (max-width :900px )" : {
            height : "30rem",
            borderBottomLeftRadius : "0px"
        },
        backgroundImage : `url(${headerBG})`,
        backgroundRepeat : "no-repeat",
        backgroundSize : "50% 110%",
        backgroundPositionX : "right"
    },
    navbar : {
        backgroundColor : "#7EAAA7",
        width : "100%",
        height : "80px",
        marginTop : 60,
        borderTopLeftRadius : 40,
        borderBottomLeftRadius : 40,
        "@media screen and (max-width:900px)" : {
            height : "280px",
            borderTopLeftRadius : 0,
            borderBottomLeftRadius : 0,
            marginTop : 30
        }
    },
    navbarStack : {
        width : "100%",
        height : "100%",
        color : "#FFFFFF",
        fontSize : "26px"
    },
    navbarBG : {
        backgroundImage : `url(${headerBG})`,
        backgroundSize : "100%"
    }
})

const Header = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const UserInfo = useSelector((state) => state.UserReducer)
    const UserStatus = useSelector((state) => state.UserStatus)
    const dispatch = useDispatch();
    const UserState = () => {
        if(UserStatus){
            localStorage.clear();
            Cookies.remove('auth', { path: '' });
            Cookies.remove('email', { path: '' });
            Cookies.remove('loggedin', { path: '' });
            LoginUser({valid:false},dispatch)
            LoggedIn(dispatch)
            UserId(dispatch)
        }
        navigate('/login')
    }
    useEffect(() => {
        LoginUser({valid:false},dispatch)
        LoggedIn(dispatch);
        UserId(dispatch)
        console.log("Header re-render")
    }, [])
    
  return (
      <div>
        <Box className={classes.box}>
            <Grid container spacing={2} style={{height : "100%"}}>
                <Grid item md={7} xs={12} >
                    <Typography 
                        variant="h3" 
                        sx={{
                            width : "50%",
                            margin : "auto",
                            paddingTop : 6,
                            fontSize : "4vw",
                            "@media screen and (max-width : 900px) " : {
                                fontSize : "6vw",
                                width : "70%"
                            },
                            fontWeight : "regular",

                        }}
                        color="primary"
                    >
                        {/* Technology is best when it brings people together. */}
                        <Typewriter options={{
                            strings : ["Technology is best when it brings people together"],
                            autoStart : true,
                            loop : true
                        }} />
                    </Typography>
                </Grid>
                <Grid item md={5} xs={12}
                   
                >
                    
                    <Box className={classes.navbar}>
                        <Stack 
                            className={classes.navbarStack}
                            direction={{
                                md : "row",
                                sm : "column",
                                xs : "column"
                            }}
                            justifyContent= "space-evenly"
                            alignItems="center"
                        >
                            <Link to="/" style={{textDecoration:"none"}}>
                            <Button
                                sx={{
                                    fontSize : "1.8vw",
                                    color : "#FFFFFF",
                                    "@media screen and (max-width : 900px)" : {
                                        fontSize : "3.5vw"
                                    },
                                    textDecoration : "none"
                                }}
                            >
                            {/* <Link to="/">HOME</Link> */}
                            HOME
                            </Button>
                            </Link>
                            <Button
                                sx={{
                                    fontSize : "1.8vw",
                                    color : "#FFFFFF",
                                    "@media screen and (max-width : 900px)" : {
                                        fontSize : "3.5vw"
                                    }
                                }}
                            >
                            FILTER
                            </Button>
                            {/* <Button
                                sx={{
                                    fontSize : "1.8vw",
                                    color : "#FFFFFF",
                                    "@media screen and (max-width : 900px)" : {
                                        fontSize : "3.5vw"
                                    }
                                }}
                            >
                            CHAT
                            </Button> */}
                            <Button
                                onClick={UserState}
                                sx={{
                                    fontSize : "1.8vw",
                                    color : "#FFFFFF",
                                    "@media screen and (max-width : 900px)" : {
                                        fontSize : "3.5vw"
                                    },
                                    paddingLeft : "15px",
                                    paddingRight : "15px",
                                    backgroundColor : "#6CD0CA",
                                    '&:hover' : {
                                        backgroundColor : "#6CD0CA"
                                    }
                                }}
                            >
                            {UserStatus?"LOGOUT":"LOGIN"}
                            </Button>
                            <Avatar
                                src={UserStatus?UserInfo.profile:""}
                                sx={{
                                    height : "80%",
                                    width : "10%",
                                    "@media screen and (max-width : 900px)": {
                                        height : "26%"
                                    }
                                }}
                                onClick={()=>{
                                    navigate('/profile/1')
                                }}
                            />
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
        </Box>
        </div>
  )
}

export default Header