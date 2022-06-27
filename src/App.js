
import { createTheme,ThemeProvider } from '@mui/material/styles';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Hiring from './components/Hiring';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import Signup from './components/Signup';
import {
  BrowserRouter ,
  Routes,
  Route
} from "react-router-dom";
import Unauthenticated from './components/Unauthenticated';

import { useDispatch, useSelector } from 'react-redux';
import { LoggedIn, LoginUser } from "./Redux/actions"
import { useEffect } from 'react';


const theme= createTheme({
  typography : {
    fontFamily : ['Fredoka'],
    fontWeightRegular : 400,
    fontWeightLight :300
  },
  palette : {
    primary : {
      main : "#3C5658"
    }
  }
})


const  App =   () => {
  
    const dispatch = useDispatch()
    console.log(1)
    // MyFunc(dispatch);
    const UserStatus = useSelector((state)=>state.UserStatus)
    console.log(UserStatus)
    useEffect(() => {
      // CheckUserStatus();
      LoggedIn(dispatch)
      LoginUser({info:{},valid:true},dispatch)
    },[])
    
    
  return (
    <ThemeProvider theme={theme}>
      <div style={{
        display:"flex",
        flexDirection:"column",
        minHeight:"100vh",
      }}>
        <div style={{
          flex:"1"
        }}>
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route  path="/" element={<Home/>}/>
            <Route  path="/login" element={<Login/>}/>
            <Route  path="/signup" element={<Signup/>}/>
            {
              UserStatus?
                <Route  path="/profile/:id" element={<Profile/>} />
              :<Route  path="/profile/:id" element={<Unauthenticated/>}/>
            }
            
            <Route  path="/hire/:id" element={<Hiring/>}/>
          </Routes>
        </BrowserRouter>
        </div>
        <Footer/>
      </div>
    </ThemeProvider>
  );
}

export default App;
