import { Box, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import Divider from '@mui/material/Divider';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


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
    },
    typograph : {
        textAlign : "center",
        fontSize : "2rem",
        padding : "5px",
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
            <Typography variant="h4" className={classes.typograph}>
                Created by MUDIT NEMA
            </Typography>
            <Typography  
                variant="h4" 
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
            <Typography  
                variant="h4" 
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
        </Box>
        </div>
    </>
  )
}

export default Footer