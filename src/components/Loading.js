import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
  return (
    <div
    style={{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        padding : "2vw 2vw",
        margin : "2vw 2vw",
        position:"static",
        top : "50px"
    }}
    >
        <CircularProgress color="primary"/>
    </div>
  )
}

export default Loading