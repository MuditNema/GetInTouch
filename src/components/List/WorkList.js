
import React from 'react'
import ListItem from '@mui/material/ListItem';
import { Typography } from '@mui/material'

const WorkList = (props) => {
    // const DeleteItem = (index) => {
    //     props.setWorks(props.Works.splice(index,1)); 
    // }
        
        return (
    //   console.log(props)
    <>
        <ListItem>
            <Typography
                style={{
                    fontSize :"1.5vw"
                }}
            >
                {`${props.index + 1}. ${props.element}`}
            </Typography>
        </ListItem>
    </>
  )
}

export default WorkList