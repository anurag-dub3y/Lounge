import { Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import VerifiedIcon from '@mui/icons-material/Verified';
import WarningIcon from '@mui/icons-material/Warning';
import { Box } from '@mui/system';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { CircularProgress } from '@mui/material'
import axios from 'axios';

const Verify = () => {
    const {id} = useParams()
    const [responce, setResponce] = useState(false)
    const [loader, setLoader] = useState(true)
    const nevigate = useNavigate()

    const navigation =()=>{
      nevigate('/login')
    }
    useEffect(() => {
    
    const send = async ()=>{
      await axios.get(`http://localhost:5000/verification/${id}`).then(async (res)=>{
        setLoader(false)
          if(res.status===200){
            setResponce(true)
          }
          else{
            setResponce(false)
          }
          
      })
    }
    send()
        
    }, [responce])
    
  return (
    <div>
       {
        loader?
        <CircularProgress sx={{color:'black', textAlign:'center', margin:'5rem 50%'}} />
        :
         responce ?
  
         <Box sx={{display:'flex',padding:'1rem', flexDirection:'column'}}>
         <VerifiedIcon  color="success" sx={{margin:'auto', fontSize:'10rem'}}/>
         <Typography color={'primary'} textAlign={'center'} variant={'h2'}>Thanks for verification !</Typography>
         <Typography textAlign={'center'} variant='h6'>You can Login Now</Typography>
         <Button sx={{width:'7rem',padding:'.4rem .6rem', margin:'1rem auto'}} variant='outlined' onClick={navigation}>Login</Button>
         </Box>
         :
         <Box sx={{display:'flex',padding:'1rem', flexDirection:'column'}}>
         <WarningIcon  color="warning" sx={{margin:'auto', fontSize:'10rem'}}/>
         <Typography color={'primary'} textAlign={'center'} variant={'h2'}>Sorry, Something went wrong!</Typography>
         <Typography textAlign={'center'} variant='h6'>Please retry</Typography>
         </Box>
       }
       
        
    </div>
  )
}

export default Verify