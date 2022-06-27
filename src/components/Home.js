import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import Card from './Card';
import {Divider} from '@mui/material'



const Home = () => {
    const AllUser=[1,2,3,12,441,41,41,7];

    

  return (
    <>
    <div>
    <Box>
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
            AllUser.map((element,index)=>(
                <Grid item
                    key={index}
                    md={4}
                    sm={6}
                    xs={12}
                >
                    <Card/>
                </Grid>
            ))
        }
        </Grid>
        </Box>
        </div>
    </>
  )
}

export default Home