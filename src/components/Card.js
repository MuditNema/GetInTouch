
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
import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
    cardCSS : {
        width : "100%",
        margin : "auto",
        padding : "0px",
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
    const [ImageURL, setImageURL] = useState("")
    const [DefaultURL, setDefaultURL] = useState("")
    useEffect(() => {
      GetImageURL();
    }, [])
    
    const GetImageURL = async () => {
        const url = `https://api.unsplash.com/search/photos?query=${item.skills.toLowerCase()}&client_id=WsjJsXf3Fqpvi_zSfF6h-csRIFC1lF0uArSUSbMaWa0`
        const response = await fetch(url,{
          method : "GET",
          mode : "cors"
        })
        const ans = await (response.json())
        console.log(ans)
        if(ans.results.length===0){
          setImageURL("");
          setDefaultURL('https://insights.dice.com/wp-content/uploads/2019/04/Billing-Clients-Freelance-Developer-Freelancers-Dice.png')
        }
        else{
          const Index=0;
          // const Index = Math.floor(Math.random()*ans.results.length)
          setImageURL(ans.results[Index].urls.full)
        }
        // if(ans.results.length==0) return null;
        // // console.log(ans.results[0].urls.full)
        // else return (ans.results[0].urls.full).toString();
    }
    
  return (
    <Card elevation={4} sx={{ maxWidth: 400 }} className={classes.cardCSS}>
        <CardMedia
        component="img"
        height="194"
        image={ImageURL.length==0?DefaultURL:ImageURL}
        
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
          {item.description.length <= 111?item.description:item.description.substr(0,110)+"..."}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default UserCard