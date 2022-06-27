import {  Button, Paper, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

//setting up firebase
import {getAuth, signInWithEmailAndPassword  } from 'firebase/auth'
import {app} from "../Firebase/FirebaseConfig"
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { LoggedIn, LoginUser } from '../Redux/actions';
import { getDocs } from 'firebase/firestore';
import { collection, query, where } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore';

const useStyles =  makeStyles((theme) => ({
  login : {
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
    height :"35%",
    margin : "auto",
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

  const dispatch = useDispatch();
  const auth =  getAuth(app);
  const db = getFirestore(app)

  const HandleChange = (e) => {
    if(e.target.name==="email"){
      setLoginEmail(e.target.value)
      return;
    }
    setLoginPassword(e.target.value)
  }
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
        // console.log(item.data())
        // LoginUser({info:item.data(),valid:true},dispatch)
        localStorage.setItem('user',JSON.stringify(item.data()))
        console.log(JSON.parse(localStorage.getItem('user')))
        LoggedIn(dispatch)
        console.log()
        LoginUser({valid:true},dispatch)
        navigate('/profile/1')
      })
      
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Paper
        className={classes.login}
        elevation={8}
      >
        <div className={classes.inputdiv}>
          <Typography
            sx={{
              fontSize : "2.6vw",
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
                fontSize : "1.5vw",
                padding : "4px 8px",
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
              fontSize : "2.6vw",
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
                      padding : "0.5vw",
                      fontSieze : "2vw"
                    }}
                  />
                :
                  <VisibilityOffIcon
                    sx={{
                      padding : "0.5vw",
                      fontSieze : "2vw"
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
                fontSize : "1.7vw",
                padding : "4px 8px",
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
              fontSize : "1.6vw",
              width : "min-content",
              margin : "auto"
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
  )
}

export default Login