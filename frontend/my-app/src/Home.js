
import { Box } from '@mui/system'
import React from 'react'
import Cards from './Card'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { CircularProgress } from '@mui/material'
import { Typography } from '@mui/material'
const Home = () => {
  const [data, setData] = useState([{}])
  const [load, setLoad] = useState(true)
  const [read, setRead] = useState(false)
  useEffect(() => {
    
    const responce = axios.get('http://localhost:5000/blogs').then(res=>{
      if(res){
        setData(res.data)
        setLoad(false)
      }
    }).catch(err=>{
      console.log(err.message)
    })

  }, [])
  return (
    <div>
        <Box>
          {
            !load ? 
            data.length !==0 ?
           data.map((elem,id)=>{
             return(
              <Cards author={elem.author.name} width={'45%'} img={elem.img} title={elem.title} read={read} decr={elem.decr} id={elem._id}  key={id}/>
             ) 
           }) 
           : <Typography textAlign={'center'} marginTop={'5rem'} variant='h5'>No Blogs</Typography>
           :
          <CircularProgress sx={{color:'black', textAlign:'center', margin:'5rem 50%'}} />
          }
           
        </Box>
    </div>
  )
}

export default Home