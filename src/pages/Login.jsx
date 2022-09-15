import React from "react";
import InputText from "../components/InputText";
import '../stylesheets/Login.css';

function Login() {
    return (
        <div className="contImagen">
            <div className="contDegradado">
                <div className="contLogin">
                    <form action="" className="login">
                        <h2>Bienvenido</h2>
                        <InputText type='text'>Email</InputText>
                        <InputText type='password'>Contraseña</InputText>
                        <h3>¿Olvidaste tu contraseña?</h3>


                        <button className="boton1">Ingresar</button>
                        
                        <section className="separador">
                            <div className="letra">
                                Ó
                            </div>
                        </section>
                        <button className="boton2">Crear Cuenta</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;