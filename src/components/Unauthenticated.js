import { Paper, Typography } from '@mui/material'
import React from 'react'
import {Link} from "react-router-dom"

const Unauthenticated = () => {
  return (
    <>
    <div
        style={{
            width:"50%",
            margin : "auto",
            padding : "2vw"
        }}
    >
    <Paper elevation={4} style={{
        textAlign:"center",
        padding : "1.6vw"
    }}>
        <Typography
            sx={{
                fontSize : "1.5vw",
            }}
            color="primary"
        >
            Sorry! But you need to login first <br/>
            Click here to <Link to="/login">  login </Link> or <Link to="/signup"> signup</Link>
        </Typography>

    </Paper>
    </div>
    </>
  )
}

export default Unauthenticated