// import  "./Login.css"

import {AiOutlineUser} from 'react-icons/ai';
import {RiLockPasswordLine} from 'react-icons/ri';

import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { registroUser } from "../features/registroSlice";
import { loginUser } from "../features/authSlice";

export default function Registro(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");

    const successRegistro = useSelector(state => state.registro.success);
    const errorRegistro = useSelector(state => state.registro.error);
    const token = localStorage.getItem("token");
    const tokenRegistro = localStorage.getItem("tokenRegistro");

    const link ={
        id: "Log in",
        link: "Log in",
        href:"/"
    }

    useEffect(() => {
      if(token != undefined || tokenRegistro != undefined){
        return navigate("/dashboard");
      }
    }, [])

    const handleRegistro = async () => {
        await dispatch(registroUser({ usuario, password}));
         
    }


    if(successRegistro){
        dispatch(loginUser({usuario, password}))
        return navigate("/dashboard");
    }

    return(
        <section className='authForm'>
            <h1 className="titleAuth">Sign up</h1>
            <label>
                <AiOutlineUser className='fa-solid'/>
                <input
                type='text'
                placeholder='username' 
                onChange={ e => setUsuario(e.target.value) }
                value={usuario}
                />
            </label>

            <label>
                <RiLockPasswordLine className='fa-solid'/>
                <input
                type='password' 
                placeholder='password'
                onChange={ e => setPassword(e.target.value) }
                value={password}
                />
            </label>

            { errorRegistro && <p style={{"color": "red"}}>{errorRegistro}</p>}
            <button disabled={!usuario || !password} onClick={handleRegistro}>
            Sign up
            </button>    
            <p className="linkAuth">Have an account? <Link style={{"color":"blue"}} key={link.id} to={link.href}>{link.link}</Link></p>
    </section>
    )
}