import React, { useState } from 'react'
import { Box } from '@mui/system'
import Cards from './Card'
import { CircularProgress, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

const MyBlog = () => {
  const [load, setLoad] = useState(true)
  const [data, setData] = useState()
  const user= useSelector(state=>state.isLoged)
  const edit = true;
  useEffect(() => {

     axios.get(`http://localhost:5000/user/${user.user._id}`).then(res=>{

          setData(res.data)
          setLoad(false)
        }).catch(err=>{
          console.log(err.message);
        })
        // console.log(data.length? "blog":"no blog")
  }, [])
  return (
    <div>
      <Box>
          {
           !load ? 
           data.blogs.length !==0 ? 
           data.blogs.map((elem,id)=>{
             return(
              <Cards edit={edit} author={user.user.name} width={'45%'} title={elem.title} img={elem.img} id={elem._id} decr={elem.decr} key={id}/>
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

export default MyBlog