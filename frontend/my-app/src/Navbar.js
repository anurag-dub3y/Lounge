import React from 'react'
import { AppBar, Avatar, Box, Link, Toolbar, Typography } from '@mui/material';
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from './actions'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.isLoged)

  const clear = () => {
    const del = axios.get('http://localhost:5000/logout').then((res) => {
      dispatch(logout())
      navigate('/login')
    })
  }
  return (
    <>
      <AppBar position='sticky' sx={{ bgcolor: 'secondary.main' }}>
        <Toolbar>
          <Box>
            <Typography variant='h5'>Blog.com</Typography>
          </Box>
          <Toolbar sx={{ gap: "2rem", marginLeft: 'auto' }}>

            <NavLink className={({ isActive }) => isActive ? "active" : 'normal'} to={'/'}>
              <Typography > Home </Typography>
            </NavLink>

            <NavLink className={({ isActive }) => isActive ? "active" : 'normal'} to={'/myblogs'}>
              <Typography> MyBlogs </Typography>
            </NavLink>

            <NavLink className={({ isActive }) => isActive ? "active" : 'normal'} to={'/create'}>
              <Typography >create</Typography>
            </NavLink>

            <NavLink onClick={clear} className={({ isActive }) => isActive ? "active" : 'normal'} to={'/logout'} >
              <Typography  >{user ? "Logout" : "Login"}</Typography>
            </NavLink>

            <Avatar className={({ isActive }) => isActive ? "active" : 'normal'} sx={{ bgcolor: 'lightgrey' }}>
              <Typography variant='h5' color={'black'} textTransform={'capitalize'}>{user ? user.name.slice
                (0, 1) : ''}
              </Typography>
            </Avatar>
          </Toolbar>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar