import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import Card from './Card';
import {Divider} from '@mui/material'
import {Paper} from "@mui/material"
import {collection, getFirestore,getDocs} from "firebase/firestore"
import {app} from "../Firebase/FirebaseConfig"
import { useEffect, useState } from 'react';
import {Button} from "@mui/material"
import Loading from './Loading';
import {useNavigate} from "react-router-dom"

const Home = () => {    
    const db = getFirestore(app)
    const [MyUsers, setMyUsers] = useState([])
    const [LoadingState, setLoadingState] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const LoadScreen = async () => {
            await FetchUsers();
            setLoadingState(false)
        }
        LoadScreen();
    }, [])

    const FetchUsers = async () => {
        try {
            const q = collection(db,'users')
            const querySnapshot = await getDocs(q);
            setMyUsers(querySnapshot.docs.map((item)=>({...item.data(), id : item.id })))
            console.log("State changed");
            console.log(MyUsers);   
        } catch (error) {
            console.log(error)
        }
    }

        

  return (
    <>
    {!LoadingState? 
        <div>
        <Box elevation={4}>
            <Divider
                sx={{
                    p : "20px",
                }}
            >   
                <Typography
                    sx={{
                        fontSize : "1.6rem",
                        "@media screen and (max-width:900px)" : {
                            fontSize : "1rem"
                        },
                    }}
                    color="primary"
                >
                    Get your work done here.
                </Typography>
            </Divider>
            <Grid container
                spacing={2}
                justifyContent = "center"
                sx={
                    {
                        marginTop : "4px",
                        marginBottom : "4px"
                    }
                }
            >
            {
                MyUsers.map((element,index)=>(
                    <Grid item
                        key={index}
                        md={4}
                        sm={6}
                        xs={12}
                    >
                      <Button onClick={
                        () => {
                            navigate(`/hire/${element.id}`)
                        }
                      }>  <Card item={element} /> </Button>
                    </Grid>
                ))
            }
            </Grid>
            </Box>
            </div>
        :<Loading/>}
  </>
  )
}

export default Home