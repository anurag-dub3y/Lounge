import Navbar from "./Navbar";
import Home from './Home'
import Login from "./Login";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useNavigate
} from "react-router-dom";
import Create from "./Create";
import MyBlog from "./MyBlog";
import { useSelector } from "react-redux";
import Blog from "./Blog";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch} from 'react-redux'
import { loged } from './actions'
import Update from "./Update";
import Verify from "./Verify";

axios.defaults.withCredentials = true;

function App() {
  let {user} = useSelector(state=>state.isLoged)
  let firstrender = false
  const dispatch = useDispatch()
  let update = true;
  let del = true
  useEffect(()  => {
    const fetch = async()=>{
  
    const get = await axios.get('http://localhost:5000/verify',{withCredentials:true}).then((res)=>{
      dispatch(loged(res.data))
      firstrender = true
      
    }) 
        
  }
   fetch()
  }, [])
  
  return (
    <Router>
  
      

     { !user ? 
     <Routes>
       <Route path="/login" element={<Login/>}></Route>
       {/* <Route
        path="*"
        element={<Navigate to="/login" replace />}
    /> */}
          <Route path="/verification/:id" element={<Verify/>}/>
     </Routes>
      

       :
       <div className="App">
       <Navbar/>
      <Routes>
      <Route path="/"  element={<Home/>}/>
      <Route path="/:id" element={<Blog/>}/>
      <Route path="/create"  element={<Create del={del}/>}/>
      <Route path="/myblogs"  element={<MyBlog/>}/>
      <Route path="/update/:id"  element={<Update update={update}/>}/>

      <Route
        path="*"
        element={<Navigate to="/" replace />}
    />
      </Routes>
      </div>
      }
   
    </Router>
 
  );
}

export default App;
