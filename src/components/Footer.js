import { Box, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import Divider from '@mui/material/Divider';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const typograph={
    textAlign:"center",
    fontSize : "2vw",
    padding : "5px"
}

const useStyles = makeStyles((theme) => ({
    footerbox : {
        backgroundColor : theme.palette.primary.main,
        width : "100%",
        color : "#FFFFFF",
        marginTop : "30px"
    },
    divider : {
        height : "10px",
        backgroundColor : "#B9E0E0"
    }
}))

const Footer = () => {
    const classes = useStyles();
  return (
      <>
      <div style={{marginTop:"auto"}}>
        <Box className={classes.footerbox}>
            <Divider 
                className={classes.divider}
            />
            <Typography  sx={typograph}>
                Created by MUDIT NEMA
            </Typography>
            <a target="_blank" href="https://github.com/MuditNema" style={{textDecoration:"none",color:"white"}}>
            <Typography  
                display="flex"
                sx={typograph}
                alignItems="flex-start"
                justifyContent='center'
            >
                <GitHubIcon 
                    sx={{
                        fontSize : "2.5vw",
                        mr : "4px"
                    }}
                />
                Github
            </Typography>
            </a>
            <a target="_blank" href="https://www.linkedin.com/in/mudit-nema-242a85210/" style={{textDecoration:"none",color:"white"}}>
            <Typography  
                display="flex"
                sx={typograph}
                alignItems="flex-start"
                justifyContent='center'
            >
                <LinkedInIcon 
                    sx={{
                        fontSize : "2.5vw",
                        mr : "4px"
                    }}
                />
                LinkedIn
            </Typography>
            </a>
        </Box>
        </div>
    </>
  )
}

export default Footer