import { Card, CardContent, Typography,CardActions,Button ,Box, CardMedia, Avatar, IconButton, CircularProgress} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import Delete from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios'
import { Backdrop } from '@mui/material';
const Cards = ({title,decr,id,read,img,width,author,edit}) => {
 const navigate = useNavigate()
  const send = (e) =>{
    navigate(`/${id}`)
  }
  const del = async(e)=>{
  console.log(id)
   let delet = axios.delete(`/remove/${id}`).then((res)=>{
    window.location.reload()
   }).catch((err)=>{
     console.log(err.message);
   })
  }

  
 const updates = (e)=>{
    navigate(`/update/${id}`)
 }
  return (
    <Box width={width} margin={'2rem auto'}  >
       <Card   sx={{border:'.01rem solid lightgrey'}} >
      <Box sx={{padding:'.7rem .7rem',borderBottom:'.1rem solid lightgrey', display:'flex', alignItems:'center'}}>
        <Avatar sx={{bgcolor:'red'}}>
          <Typography variant='h6' textTransform={'capitalize'} >{author.slice(0,1)}</Typography>
        </Avatar>
        <Typography margin={'0 .7rem'} textTransform={'capitalize'} variant={'h5'} >{author}</Typography>
        { edit &&
             <Box sx={{marginLeft:'auto'}}>
             <IconButton key={id} onClick={del} color='error'>
                <Delete></Delete>
             </IconButton>
             <IconButton  onClick={updates} color='success'>
                <EditIcon></EditIcon>
             </IconButton>
           </Box>
        }
        
      </Box>
      <Box sx={{padding:'1rem', borderBottom:'.1rem solid lightgrey'}}>
      <img src={`http://localhost:5000/${img}`} alt="image" />
      </Box>
        <CardContent sx={{padding:'.8rem 1rem'}}>
          <Typography gutterBottom variant="h5" textTransform={'capitalize'}component="div">{title}</Typography>
          <Typography variant='body2' color="text.secondary" >
            { 
                decr.split(' ').length > 10 && !read ?
                decr.slice(0,300)+"....."
                : 
                decr
            }
          </Typography>
        </CardContent>
        <CardActions sx={{padding:'.8rem 1rem',gap:'.5rem'}}>
          { 
           !read && 
            <Button key={id} onClick={send} size="small" variant='outlined'>Learn More</Button>

          }
        
      </CardActions>
       </Card>
    </Box>
  )
}

export default Cards

