import { Button, Link, TextField, Typography } from '@mui/material'
import React from 'react'
import { Box } from '@mui/system'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { loged } from './actions'

const Login = () => {

  const dispatch = useDispatch()
  let navigate = useNavigate()
    const [email, setEmali] = useState('')
    const [name, setName] = useState('')
    const [pass, setPass] = useState('')
    const [login, setLogin] = useState(true)
    const submit = async(e)=>{
      e.preventDefault();
      const data =  {
        email:email,
        pass:pass
      }
  
       const send = await axios.post('http://localhost:5000/login',data).then(res=>{
         if(res){
         setEmali('')
         setPass('')

         if(res.status!==200){
           console.log(res)
           alert(res.data)
         }
         if(res.status ===200){
          navigate('/')
          dispatch(loged(res.data))
   
         }
         
         }
         
       })
       .catch(err=>{
         alert(err.message)
       })
      
  

    }

    const register = async(e)=>{
      e.preventDefault()
      const data =  {
        name:name,
        email:email,
        pass:pass
      }
     const create = await axios.post('http://localhost:5000/create',data).then( async res =>{
       if(res){
         console.log(res);
         setName('')
         setEmali('')
         setPass('')
         alert('email is sent successfully, please verify it')
         setLogin(!login)
         navigate('/login')
        //  dispatch(loged(res.data))
       }
     }).catch(err=>{
       console.log(err.message);
     })
    }
    const namehandle = (e)=>{
      setName(e.target.value)
     }
    const emailhandle = (e)=>{
     setEmali(e.target.value)
    }
    const passhandle =(e)=>{
        setPass(e.target.value)
    }
  return (
    <div>
        <Box width={'25rem'} margin={'4rem auto'} borderRadius={'.2rem'} padding={'2rem'} border={'.1rem solid grey'} >

        { 
         login ? 
          <form action="">
        <Box sx={{display:'flex',flexDirection:'column'}}  >
            <Typography mb={'1rem'} variant='h5'>Login</Typography>
            <TextField type={'email'} required value={email} onChange={emailhandle} placeholder="abc@gmail.com" sx={{mb:'1.5rem'}} ></TextField>
            <TextField type='password' equired value={pass} onChange={passhandle} placeholder="Password" sx={{mb:'1.5rem'}}></TextField>
            <Button type='submit'  onClick={submit} size='large' variant='outlined'>Login</Button>
            <Typography  margin={'1.3rem 0'}>Don't have account? <Link onClick={e=>{setLogin(!login)}} sx={{textDecoration:'none',cursor:'pointer'}}>Register</Link></Typography>
            </Box>
        </form>
          :
        <form action="">
        <Box sx={{display:'flex',flexDirection:'column'}} >
            <Typography mb={'1rem'} variant='h5'>Register</Typography>
            <TextField required value={name} onChange={namehandle} placeholder="john" sx={{mb:'1.5rem'}} ></TextField>
            <TextField type={'email'} required value={email} onChange={emailhandle} placeholder="abc@gmail.com" sx={{mb:'1.5rem'}} ></TextField>
            <TextField type={'password'} required value={pass} onChange={passhandle} placeholder="Password" sx={{mb:'1.5rem'}}></TextField>
            <Button type='submit'  onClick={register} size='large' variant='outlined'>Register</Button>
            <Typography  margin={'1.3rem 0'}>Already have a account? <Link onClick={e=>{setLogin(!login)}} sx={{textDecoration:'none',cursor:'pointer'}}>Login</Link></Typography>
            </Box>
        </form>
        }
        
        </Box>
        
    </div>
  )
}

export default Login