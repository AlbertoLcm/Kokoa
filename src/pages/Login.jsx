import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../auth/useAuth";
import Header from "../components/Header";
import '../stylesheets/Login.css';
import axios from "axios";



function Login() {

    
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    
    const { login } = useAuth();
    const location = useLocation()
    
    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: ''
    });
    
    const handleChange = (e) => {
        setUserCredentials({
            ...userCredentials,
            [e.target.name]: e.target.value
        })
    }
    
    const handleLogin = () => {
        axios.post('https://kokoatec.herokuapp.com/api/auth/login', userCredentials)
                .then((res) => {
                    login(res.data.token, location)
                })
                .catch((err) => {
                    alert(err.response.data.message)
                })
    }
    
    return (
        <div className="contImagen">
            <Header> 
                <Link to='/signup' className='boton3'>Crear Cuenta</Link>
            </Header>
            <div className="contDegradado">
            
                <div className="contLogin">
                    <div className="login">
                        <h2>Bienvenido</h2>
                        <div className="inputBox">
                            <input
                                id="email"
                                name="email" 
                                type='text' 
                                onChange={handleChange}
                                value={userCredentials.email}
                                required />
                            <span>Email</span>
                        </div>
                        <div className="inputBox">
                            <input 
                                id="password"
                                name="password" 
                                type='password' 
                                onChange={handleChange}
                                value={userCredentials.password} 
                                required />
                            <span>Contraseña</span>
                        </div>
                        <h3>¿Olvidaste tu contraseña?</h3>
                        <button className='boton1' onClick={() => handleLogin()}>Ingresar</button>
                        <section className="separador">
                            <div className="letra">
                                Ó
                            </div>
                        </section>
                        <button className="boton2" >Otra Opción</button>
                    </div>

                        <Link to='/signup' className='boton3'>Crear Cuenta</Link>
                </div>
            </div>
        </div>
       
    );
}

export default Login;