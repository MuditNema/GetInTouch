import { Avatar, Box, Grid, IconButton, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import { makeStyles } from '@mui/styles'
import React from 'react'
import headerBG from '../resources/headerBG.png'
import Button from '@mui/material/Button';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { LoginUser,LoggedIn, UserId, FilterKey } from '../Redux/actions'
import Cookies from 'js-cookie'
import Typewriter from 'typewriter-effect'
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useState } from 'react'
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "white",
    '&:hover': {
      backgroundColor: "white",
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '100%',
      },
    },
  }));

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
    const location = useLocation();
    const UserInfo = useSelector((state) => state.UserReducer)
    const UserStatus = useSelector((state) => state.UserStatus)
    const dispatch = useDispatch();

    const [SearchBar, setSearchBar] = useState("")
    const [DisplayState, setDisplayState] = useState("filter")
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const HandleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const HandleClose = () => {
        setAnchorEl(null);
    };
    
    const HandleChange = (e) => {
        setSearchBar(e.target.value)
        FilterKey(e.target.value,dispatch)
    }
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
                            onClick={HandleClick}
                            style={{display:DisplayState==="filter"?"":"none"}}
                                disabled={location.pathname==='/'?false:true}
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
        <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={HandleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
            <div
                style={{
                    display:"flex",
                    flexDirection:"row"
                }}
            >
            <IconButton>
                <SearchIcon/>
            </IconButton>
            <Search
                style={{width:"80%",margin:"auto",fontSize:"1.2vw"}}
            >
                <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={SearchBar}
                onChange={HandleChange}
                />
            </Search>
            </div>
            
      </Menu>
        </div>
  )
}

export default Header