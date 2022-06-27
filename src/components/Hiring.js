import { makeStyles } from '@mui/styles'
import React from 'react'
import {Paper, Stack, Typography,TextField,Button} from '@mui/material'
import { Avatar } from '@mui/material'
import Divider from '@mui/material/Divider';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const avtr = {
    height : "25vw",
    width : "25vw"
}
const typoCSS = {
    color : "#3C5658",
    display : "inline",
    fontSize : "2.5vw",
    padding : "2px 12px",
    display :"flex",
}
const inputStyle = {
    style : {
        fontSize : "1.7vw",
        padding : "4px 8px"
      }
}
const useStyles = makeStyles((theme) => ({
    signupbox :{
        border : "2px solid",
        borderColor : theme.palette.primary.main,
        width: "80%",
        margin : " 3vw auto"
    }
}))

const Hiring = () => {
    const classes =  useStyles();
    return (
        <Paper
            elevation={5}
            className={classes.signupbox}
        >
            <Stack
                spacing={2}
                direction="column"
                alignItems='center'
                justifyContent="center"
            >
                <Stack
                    spacing={2}
                    direction={{
                        md : "row",
                        sm : "column"
                    }}
                    justifyContent="space-around"
                    alignItems="center"
                >
                    <div>


                <Avatar 
                    src="/static/images/avatar/1.jpg"
                    sx={avtr}
                />
                    </div>
                    <div
                        style={{
                            width : "50%"
                        }}
                    >


                <Typography
                    sx={typoCSS}
                > Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.  Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</Typography>
                    </div>
                </Stack>
                <Divider variant="middle" sx={{height : "2.5px",backgroundColor : "#3C5658",width : "75%"}}/>
                <Stack
                    spacing={2}
                    direction={{
                        md : "row",
                        sm : "column"
                    }}
                    alignItems="center"
                >
                    <div>
                        <Typography sx={typoCSS} style={{display:"flex",alignItems : "center"}}>
                            <EmailIcon
                                sx={{
                                    p : "5px"
                                }}
                            />
                            muditnema14@gmail.com</Typography>
                        <Typography sx={typoCSS} style={{display:"flex",alignItems : "center"}}>
                            <LocalPhoneIcon 
                                sx={{
                                    p :'5px'
                            }}
                            />
                            8959706457</Typography>
                        <Typography sx={typoCSS}>Pricing starts from $<u> 15 </u></Typography>
                    </div>
                    <div>
                        <Typography sx={typoCSS}>Mudit Nema</Typography>
                        <Typography sx={typoCSS} style={{
                            fontSize : "1.5vw",
                            padding : "0px 12px"
                        }}>Backend Developer</Typography>
                        <Typography sx={typoCSS}>Vidisha , India</Typography>
                    </div>
                    <div>
                        <Avatar sx={{
                            height : "20vw",
                            width : "20vw"
                        }}/>
                    </div>

                </Stack>
                <Divider variant="middle" sx={{height : "2.5px",backgroundColor : "#3C5658",width : "75%"}}/>
                <Stack
                    spacing={2}
                    direction={{
                        md : "column",
                        sm : "column"
                    }}
                    alignItems="center"
                >
                    <div>
                        <Typography sx={typoCSS}> <u> Work Experience/Projects </u></Typography>
                    </div>


                    <div>
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            <ListItem>
                                <Typography sx={typoCSS}>Work 1</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography sx={typoCSS}>Work 2</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography sx={typoCSS}>Work 3</Typography>
                            </ListItem>
                        </List>
                    </div>


                    <div>
                    <Typography sx={typoCSS} style={{display:"flex",alignItems : "center"}}> 
                    <GitHubIcon
                        sx={{
                            p : "5px"
                        }}
                        fontSize="inherit"
                    />
                    Github
                    <LinkedInIcon
                        sx={{
                            p : "5px"
                        }}
                        fontSize="inherit"
                    />
                    LinkedIn
                    </Typography>
                    </div>
                </Stack>
                <Divider variant="middle" sx={{height : "2.5px",backgroundColor : "#3C5658",width : "75%"}}/>
                <Stack
                    spacing={2}
                    direction={{
                        md : "column",
                        sm : "column"
                    }}
                    alignItems="center"
                >
                    <div>
                        <Typography sx={typoCSS}> <u> Descibe your requirement </u></Typography>
                    </div>
                    <div style={{
                        width : "200%"
                    }}>
                        <TextField
                            id="outlined-password-input"
                            type="email"
                            autoComplete="current-password"
                            color="primary"
                            size="small"
                            fullWidth
                            multiline={true}
                            inputProps={inputStyle}
                            minRows={4}
                            maxRows={4}
                        />
                    </div>
                    <div>
                        <Button
                        variant='contained'
                            sx={{
                                fontSize : "2vw",
                                m : "8px"
                            }}
                        >HIRE FOR $15</Button>
                    </div>
                </Stack>
            </Stack>
        </Paper>
      )
}

export default Hiring