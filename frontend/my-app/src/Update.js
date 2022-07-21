import { Button, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const Update = ({update}) => {
  const [title, setTitle] = useState('')
  const [decr, setDecr] = useState('')
  // const [add, setAdd] = useState('')
  let {id} = useParams()
  const navigate = useNavigate()
  const user = useSelector(state=>state.isLoged)


  // const address =async (e)=>{
  //    setAdd(e.target.files[0]);

  // }
  
  const titlehandle= (e)=>{
    setTitle(e.target.value)
  }
  const decrhandle= (e)=>{
    setDecr(e.target.value)
  }
  const send =async (e)=>{
    e.preventDefault()
    // console.log(add.name)
  
  const formdata = new FormData()
  //  formdata.append('image',add)
   formdata.append('title',title)
   formdata.append('author',user.user._id)
   formdata.append('decr',decr)

   const data = {
     title:title,
     decr:decr,
   }
   console.log(formdata);
    const datas = await axios.put(`http://localhost:5000/update/${id}`,data).then(res=>{
      console.log(res.data)
      setDecr('')
      setTitle('')
      navigate('/')
    }).catch(err=>{
      console.log(err.message)
    })

  }
  
useEffect(() => {
  const fetch = async()=>{
      await axios.get(`http://localhost:5000/${id}`).then((res)=>{
          console.log(res.data);
          setTitle(res.data.blog.title)
          setDecr(res.data.blog.decr)
      })
  }
  fetch()
}, [])

  return (
    <div>
      <Typography textAlign={'center'} margin='2rem 0' variant="h4" textTransform={'capatalize'}>Update your Post</Typography>
      <Box width={'80%'} margin="1rem auto">
        <form action="" onSubmit={send}>
          <Box sx={{display:'flex',flexDirection:'column'}}>
            <TextField required value={title} onChange={titlehandle} sx={{margin:'.8rem 0'}}  placeholder='Title'></TextField>
            <TextField required value={decr} onChange={decrhandle} minRows={8} multiline sx={{margin:'.8rem 0'}} placeholder='dececription'></TextField>
            <Button type='submit'   sx={{margin:'.8rem 0',width:'fit-content',borderRadius:'1rem'}} size='large' variant='outlined'>update</Button>
          </Box>
        </form>
      </Box>
    </div>
  )
}

export default Update