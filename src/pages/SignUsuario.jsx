import React from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import Input from "../components/Input";
import "../stylesheets/SignUsuario.css";
import {Link} from "react-router-dom";

function SignUsuario() {
    return(
        <div className="contBackground">
            <Header boton={'Crear Cuenta'} />
            
            <div className="contForm">
                <form action="" className="form">
                    
                    <div className="contCabeza">
                        <div className="botVolver"><Link to= "/signup" className="seleccion">Volver</Link></div>
                        <h1>REGISTRO COMO USUARIO</h1>
                    </div>
                    <div className="contInpUs">
                        <Input type='text' className="dataUser">Nombre</Input>
                        <Input type='text' className="dataUser">Apellido</Input>
                        <Input type='text' className="dataUser">Email</Input>
                        <Input type='text' className="dataUser">Numero de telefono</Input>
                    </div>
                    <h2>Contraseña</h2>
                    <div className="contPass">
                        
                        <div className="dataPass">
                            <Input type='password'>Contraseña</Input>
                        </div>
                        <div className="dataPass">
                            <Input type='password'>Confirme su Contraseña</Input>
                        </div>
                    </div>
                    <div className="contBot">
                        <Button tipo={'boton1'}>Registrarse</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUsuario;