import React from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../auth/useAuth";
import Header from "../components/Header";
import Input from "../components/Input";
import '../stylesheets/Login.css';
import { axios } from "../api/axios";
import { useState } from "react";

const LOGIN_URL = '/auth';

const userCredentials = {};

function Login({user}) {

    const [usuario, setUsuario] = useState({
        email: '',
        password: ''
    });

    const [log, setLog] =useState(null);

    const handleChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    const location = useLocation()
    // console.log(location)
    const { login } = useAuth();
    

    const handleSubmit = () => {

        const requesInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(usuario)
        }

            const {email} = usuario;
            
            fetch('http://localhost:8081/api/login', requesInit)
            .then(res => res.json())
            .then(res => setLog(res));

            if(!log){
                console.log(usuario)
                alert('correo o contraseña incorrecta')
            }else{
                const {nombre} = log;
                login(nombre)
            }

            console.log(log)
    }

    
    return (
        <div className="contImagen">
            <div className="contDegradado">
            <Header> 
                <Link to='/signup' className='boton3'>Crear Cuenta</Link>
            </Header>
                <div className="contLogin">
                    <div className="login" >
                        <h2>Bienvenido</h2>
                        <div className="inputBox">
                            <input type='text' 
                                name="email"
                                autoComplete="off" 
                                onChange={handleChange}
                                value = {user}
                                required />
                            <span>Email</span>
                        </div>
                        <div className="inputBox">
                            <input type='password' 
                            name="password" 
                                autoComplete="off" 
                                onChange={handleChange}
                                value = {user}
                                required />
                            <span>Contraseña</span>
                        </div>
                        <h3>¿Olvidaste tu contraseña?</h3>
                        <button onClick={() => handleSubmit()} className='boton1' >Ingresar</button>
                        <section className="separador">
                            <div className="letra">
                                Ó
                            </div>
                        </section>
                        <button className="boton2" >Otra Opción</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;