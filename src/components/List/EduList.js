import React from 'react'
import ListItem from '@mui/material/ListItem';
import { Typography } from '@mui/material'

const EduList = (props) => {
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

export default EduList