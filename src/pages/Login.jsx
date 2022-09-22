import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../auth/useAuth";
import Header from "../components/Header";
import Input from "../components/Input";
import '../stylesheets/Login.css';
import axios from "axios";


function Login({user}) {

    const { login } = useAuth();
    
    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: ''
    });
    const location = useLocation()

    const handleChange = (e) => {
        setUserCredentials({
            ...userCredentials,
            [e.target.name]: e.target.value
        })
    }
    
    const handleLogin = () => {
        axios.post('http://localhost:8081/api/login', userCredentials, {'Access-Control-Allow-Credentials':true})
            .then((res) => {
                console.log(res);
                login(userCredentials, location)
            })
            .catch((err) => {
                console.log(err.response.data.message)
                alert(err.response.data.message)
            })
    }
    const handleLogout = () => {
        axios.put('http://localhost:8081/api/logout', { withCredentials: true })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err)
            })
    }
    
    return (
        <div className="contImagen">
            <div className="contDegradado">
            <Header> 
                <Link to='/signup' className='boton3'>Crear Cuenta</Link>
            </Header>
                <div className="contLogin">
                    <div className="login">
                        <h2>Bienvenido</h2>
                        <div className="inputBox">
                            <input name="email" onChange={handleChange} type='text' required />
                            <span>Email</span>
                        </div>
                        <div className="inputBox">
                            <input name="password" onChange={handleChange} type='password' required />
                            <span>Contraseña</span>
                        </div>
                        <h3>¿Olvidaste tu contraseña?</h3>
                        <button className='boton1' onClick={() => handleLogin()}>Ingresar</button>
                        <section className="separador">
                            <div className="letra">
                                Ó
                            </div>
                        </section>
                        <button className="boton2" onClick={() => handleLogout()}>Otra Opción</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;