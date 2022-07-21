import axios from 'axios'
import React, { useState } from 'react'
import {useParams} from 'react-router-dom'
import Cards from './Card'
import { Box } from '@mui/material'
import { CircularProgress } from '@mui/material'
import { useEffect } from 'react'
const Blog = () => {
  const {id} = useParams()
  const [data, setData] = useState('')
  const [load, setLoad] = useState(true)
  const [read, setRead] = useState(true)
  const [name, setName] = useState('')

  useEffect(() => {
    

    axios.get(`http://localhost:5000/${id}`).then(res=>{
      setData(res.data)
      
      setLoad(false)
    }).catch(err=>{
      console.log(err.message)
    })


  }, [])
  

    
  return (
    <div>
         <Box>
          {
            !load ? 
             data ?
              <Cards author={data.blog.author.name} width={'80%'} title={data.blog.title} img={data.blog.img} read={read} decr={data.blog.decr} id={data.blog._id}  key={id}/>
              : "blog is not found"
           :
          <CircularProgress sx={{color:'black', textAlign:'center', margin:'5rem 50%'}} />
          }
           
        </Box>
    </div>
  )
}

export default Blog