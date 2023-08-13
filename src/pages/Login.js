import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import "./Login.css";
import {AiOutlineUser} from 'react-icons/ai';
import {RiLockPasswordLine} from 'react-icons/ri';
import { loginUser } from '../features/authSlice';
import { useEffect } from "react";

export default function Login()  {

  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  // const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  // const { token} = useSelector((state) => state.auth.token);
  const success = useSelector(state => state.auth.success);
  const error = useSelector(state => state.auth.error);
  const token = localStorage.getItem("token");
  const tokenRegistro = localStorage.getItem("tokenRegistro");


  const link = {
    id: 1,
    link: "Sign up",
    href: "/registro"
  }

  useEffect(() => {
    if(token != undefined || tokenRegistro != undefined){
      return navigate("/dashboard")
    }
    // console.log(success)
    // console.log(token)
  }, [token, success]);
  
  

  const handleLogin = async () => {
    await dispatch(loginUser({usuario, password}));
    // setSuccess(true);
  }

  if(success){
    return navigate("/dashboard")
  }

  return (
    
    <section className='authForm'>
        <h1 className='titleAuth'>Login</h1> 

        <label>
            <AiOutlineUser className='fa-solid' />
            <input
             type='text'
             placeholder='username' 
             onChange={(e) => setUsuario(e.target.value)}
             value={usuario}
            />
        </label>

        <label>
            <RiLockPasswordLine className='fa-solid'/>
            <input
             type='password' 
             placeholder='password'
             onChange={(e) => setPassword(e.target.value)}
             value={password}
            />
        </label>

        { error && <p style={{"color": "red"}}>{error}</p>}
        <button disabled={!usuario || !password} onClick={handleLogin}>
          Log In
        </button>        
        <p className="linkAuth">Don't have an account? <Link style={{"color": "blue"}} key={link.id} to={link.href}>{link.link}</Link></p>
    </section>
  )
}
