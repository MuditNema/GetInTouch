import React from 'react'
import { ListItem } from '@mui/material'
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'


const UpdateUserList = (props) => {
    const TextFieldCSS = {style : {
        padding : "4px 8px",
        fontSize : "1.3vw"
      }}
      const ListItemCSS = {
        fontSize:"1.5vw",
        fontFamily: "Fredoka"
      }
    return (
        <div>
            <ListItem 
            style={{
                width:"80%",
                margin : "auto"
            }}>
            <ListItemText
            disableTypography={true}
            sx={ListItemCSS}
            >
                {props.item}
            </ListItemText>
            <TextField
            inputProps={TextFieldCSS}
            value={props.value}
            />
            </ListItem>
            <Divider sx={{width:"90%",margin:"auto"}} />
        </div>
    )
}

export default UpdateUserList