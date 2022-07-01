
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    cardCSS : {
        width : "100%",
        margin : "auto",
        padding : "0px"
    },
    title : {
      color : theme.palette.primary.main
    },
    subheader : {
      color : "#7EAAA7"
    }
}))

const UserCard = ({item}) => {
    const classes = useStyles();
  return (
    <Card sx={{ maxWidth: 400 }} className={classes.cardCSS}>
        <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      />
      <CardHeader
        avatar={
          <Avatar src={item.profile} sx={{ bgcolor: red[500] , width : "80px",height : "80px" }} aria-label="recipe"/>
            
        }
        title={<Typography className={classes.title} sx={{fontSize : "24px"}}>{item.name}</Typography>}
        subheader={<Typography className={classes.subheader} sx={{fontSize : "18px"}}>{`${item.skills} | ${item.city}, ${item.country}`}</Typography>}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" sx={{fontSize : "15px"}}>
          {item.description.length <= 99?item.description:item.description.substr(0,51)+"..."}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default UserCard