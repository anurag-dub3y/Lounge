import { Button, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const Create = ({update}) => {
  const [title, setTitle] = useState('')
  const [decr, setDecr] = useState('')
  const [add, setAdd] = useState('')
  let route = useParams()
  const navigate = useNavigate()
  const user = useSelector(state=>state.isLoged)


  const address =async (e)=>{
     setAdd(e.target.files[0]);

  }
  
  const titlehandle= (e)=>{
    setTitle(e.target.value)
  }
  const decrhandle= (e)=>{
    setDecr(e.target.value)
  }
  const send =async (e)=>{
    e.preventDefault()
    console.log(add.name)
  
  const formdata = new FormData()
   formdata.append('image',add)
   formdata.append('title',title)
   formdata.append('author',user.user._id)
   formdata.append('decr',decr)

   console.log(formdata);
    const datas = await axios.post('http://localhost:5000/post',formdata).then(res=>{
      console.log(res.data)
      setDecr('')
      setTitle('')
      navigate('/')
    }).catch(err=>{
      console.log(err.message)
    })

  }
  


  return (
    <div>
      <Typography  textAlign={'center'} margin='2rem 0' variant="h4" textTransform={'capatalize'}>Create your post</Typography>
      <Box width={'80%'} margin="1rem auto">
        <form action="" onSubmit={send}>
          <Box sx={{display:'flex',flexDirection:'column'}}>
            <TextField required={true} inputProps={{accept:"image/*"}} name={'images'} type={'file'} onChange={address}></TextField>
            <TextField required={true}value={title} onChange={titlehandle} sx={{margin:'.8rem 0'}}  placeholder='Title'></TextField>
            <TextField required={true} value={decr} onChange={decrhandle} minRows={8} multiline sx={{margin:'.8rem 0'}} placeholder='dececription'></TextField>
            <Button type='submit'  sx={{margin:'.8rem 0',width:'fit-content',borderRadius:'1rem'}} size='large' variant='outlined'>submit</Button>
          </Box>
        </form>
      </Box>
    </div>
  )
}

export default Create