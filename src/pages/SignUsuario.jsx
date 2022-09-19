import React from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import Input from "../components/Input";

function SignUsuario() {
    return(
        <div className="contBackground">
            <Header boton={'Crear Cuenta'} />
            <div className="contForm">
                <form action="" className="form">
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
    );
}

export default SignUsuario;