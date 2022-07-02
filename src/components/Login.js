import {  Button, Paper, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useEffect } from 'react';
//setting up firebase
import {getAuth, signInWithEmailAndPassword  } from 'firebase/auth'
import {app} from "../Firebase/FirebaseConfig"
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { LoggedIn, LoginUser , UserId} from '../Redux/actions';
import { getDocs } from 'firebase/firestore';
import { collection, query, where } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import AlertComponent from './AlertComponent';
import Loading from './Loading';


const useStyles =  makeStyles((theme) => ({
  login : {
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-evenly",
    width : "50%",
    height : "30vw",
    margin : "auto",
    marginTop : "50px",
    border : "3px solid #3C5658",
    "@media screen and (max-width : 850px)" : {
      height : "55vw"
    }
  },
  inputdiv : {
    height :"fit-content",
    margin : "auto",
    padding : "20px",
    width : "45%",
    color : theme.palette.primary.main
  },
  buttondiv : {
    width : "min-content",
    margin : "auto"
  },
  passwordBlock : {
    display : "flex",
    flexDirection : "row"
  }
}))




const Login = () => {
  const classes = useStyles();
  const [Visibility, SetVisibility] = useState(true);
  const [Passwordtype, SetPasswordtype] = useState("password");
  const navigate = useNavigate();
  const [LoginEmail, setLoginEmail] = useState("")
  const [LoginPassword, setLoginPassword] = useState("")
  
  const [Cookies,setCookies] = useCookies();
  
  const [LoaderState, setLoaderState] = useState(false)

  const dispatch = useDispatch();
  const auth =  getAuth(app);
  const db = getFirestore(app)
  
  const [ErrorConsole, setErrorConsole] = useState({message:"This is message",AlertState:false,e:true})
  
  useEffect(() => {
     LoginUser({valid:false},dispatch)
      LoggedIn(dispatch);
  }, [])
  const HandleChange = (e) => {
    if(e.target.name==="email"){
      setLoginEmail(e.target.value)
      return;
    }
    setLoginPassword(e.target.value)
  }
  const UserID = useSelector((state)=> state.UserId)
  const HandleSubmit = async (e) => {
    e.preventDefault()
    try {
      const MyUser = await signInWithEmailAndPassword(auth,LoginEmail,LoginPassword)
      console.log(MyUser)
      setCookies('auth',MyUser.user.accessToken)
      setCookies('email',LoginEmail)
      setCookies('loggedin',true)
      console.log(Cookies)
      console.log(LoginEmail)
      const q = query(collection(db,"users"),where("email","==",LoginEmail.toString()))
      const Obj = await getDocs(q)
      Obj.forEach((item)=>{
        // console.log(item.id)
        // LoginUser({info:item.data(),valid:true},dispatch)
        localStorage.setItem('user',JSON.stringify(item.data()))
        localStorage.setItem('UserId',JSON.stringify(item.id));
        console.log(JSON.parse(localStorage.getItem('user')))
        LoginUser({valid:true},dispatch)
        LoggedIn(dispatch)
        UserId(dispatch)
        console.log(UserID)
      })
      setErrorConsole({...ErrorConsole,e:false,AlertState:true,message:"Login Successful. Redirecting to the home page"})
      setTimeout(() => {
        setErrorConsole({...ErrorConsole,message:"",e:false,AlertState:false})
        setLoaderState(true)
      }, 3500);
      setTimeout(() => {
        setLoaderState(false)
        navigate('/')
      }, 4000);
      
    } catch (error) {
      console.log(typeof(error))
      setErrorConsole({...ErrorConsole,e:true,AlertState:true,message:error.toString()})
      setTimeout(() => {
        setErrorConsole({...ErrorConsole,message:"",e:true,AlertState:false})
      }, 3500);
    }
  }

  return (
    <>
      {!LoaderState?
      <> 
      <AlertComponent message={ErrorConsole.message} AlertState={ErrorConsole.AlertState}   e={ErrorConsole.e}  />
      <Paper
        className={classes.login}
        elevation={8}
      >
        <div className={classes.inputdiv}>
          <Typography
            sx={{
              fontSize : "2vw",
              textAlign : "center",
              mt :"20px"
            }}
          >EMAIL</Typography>
          <TextField 
            value={LoginEmail}
            onChange={HandleChange}
            id="outlined-basic"
            type="email"
            name="email"
            variant="outlined"
            color="primary"
            fullWidth
            size="small"
            inputProps={{
              style : {
                fontSize : "1.5vw"
              }
            }}
            sx={{
              mt : "4px",
              mb : "4px"
            }}
          />
        </div>
        <div className={classes.inputdiv}>
          <Typography
            sx={{
              fontSize : "2vw",
              textAlign : "center",
            }}
          >PASSWORD
            <Button
              onClick = {()=>{
                SetVisibility(!Visibility);
                if(Passwordtype == "text") {
                  SetPasswordtype("password");
                }
                else{
                  SetPasswordtype("text")
                }
              }}
            >
              {
                Visibility
                ?
                  <VisibilityIcon
                    sx={{
                      padding : "4px",
                      fontSize : "2vw"
                    }}
                  />
                :
                  <VisibilityOffIcon
                    sx={{
                      padding : "4px",
                      fontSize : "2vw"
                    }}
                  />
              }
            
            </Button>
          </Typography>
          <TextField
          value={LoginPassword}
          onChange={HandleChange}
            id="outlined-password-input"
            type={Passwordtype}
            autoComplete="current-password"
            color="primary"
            size="small"
            name="password"
            fullWidth
            inputProps={{
              style : {
                fontSize : "1.7vw"
              }
            }}
            sx={{
              mt : "4px",
              mb : "4px"
            }}
          />
            
        </div>
        <div
          className={classes.buttondiv}
        >
          <Button 
            variant="contained"
            sx={{
              fontSize : "1.5vw",
              width : "min-content",
              margin : "6px auto",
            }}
            onClick={HandleSubmit}
          >LOGIN</Button>
        </div>

      </Paper>
      <Typography
       sx={{
         width : "fit-content",
         margin : "auto",
         marginTop : "2vw",
         fontSize : "1.5vw"
       }}
       color="primary"
      >
      Don't have an account ? 
        <Link to="/signup">
          Sign up here
        </Link>
      </Typography>
      </>
      :<Loading/>}
    </>
  )
}

export default Login