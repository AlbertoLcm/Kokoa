import React from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import Input from "../components/Input";
import '../stylesheets/Login.css';

function Login() {
    return (
        <div className="contImagen">
            <div className="contDegradado">
                <Header boton={'Crear Cuenta'} />
                <div className="contLogin">
                    <form action="" className="login">
                        <h2>Bienvenido</h2>
                        <Input type='text'>Email</Input>
                        <Input type='password'>Contraseña</Input>
                        <h3>¿Olvidaste tu contraseña?</h3>
                        <Button tipo={'boton1'}>Ingresar</Button>
                        <section className="separador">
                            <div className="letra">
                                Ó
                            </div>
                        </section>
                        <Button tipo={'boton2'}>Otra Opción</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;