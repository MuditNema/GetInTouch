
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
        margin : "auto"
    },
    title : {
      color : theme.palette.primary.main
    },
    subheader : {
      color : "#7EAAA7"
    }
}))

const UserCard = () => {
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
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title={<Typography className={classes.title} sx={{fontSize : "24px"}}>Shrimp and Chorizo Paella</Typography>}
        subheader={<Typography className={classes.subheader} sx={{fontSize : "18px"}}>September 14, 2016</Typography>}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" sx={{fontSize : "15px"}}>
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
    </Card>
  )
}

export default UserCard