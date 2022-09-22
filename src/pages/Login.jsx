import React from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../auth/useAuth";
import Header from "../components/Header";
import Input from "../components/Input";
import '../stylesheets/Login.css';

const userCredentials = {};

function Login({user}) {

    const location = useLocation()
    console.log(location)
    const { login } = useAuth();
    
    return (
        <div className="contImagen">
            <Header> 
                <Link to='/signup' className='boton3'>Crear Cuenta</Link>
            </Header>
            <div className="contDegradado">
            
                <div className="contLogin">
                    <form className="login">
                        <h2>Bienvenido</h2>
                        <Input type='text'>Email</Input>
                        <Input type='password'>Contraseña</Input>
                        <h3>¿Olvidaste tu contraseña?</h3>
                        <button className='boton1' onClick={() => login(userCredentials, location.state?.from)}>Ingresar</button>
                        <section className="separador">
                            <div className="letra">
                                Ó
                            </div>
                        </section>
                        <Link to='/signup' className='boton3'>Crear Cuenta</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;