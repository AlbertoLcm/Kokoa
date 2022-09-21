import React from "react";
import Button from "../components/Button";
import '../stylesheets/Buttons.css';
import Header from "../components/Header";
import Input from "../components/Input";
import "../stylesheets/SignUsuario.css";
import {Link, useNavigate} from "react-router-dom";

function SignUsuario() {

    const postInsertar = () => {
        fetch('http://localhost:8081/api')
        .then(res => res.json)
        .then(res => console.log(res))
    }
    
    const nav = useNavigate();
    return(
        
        <div className="contBackground">
            <Header boton={'Crear Cuenta'} />
            <div className="contTot">
                <div className="contForm">
                
                <form className="form" method="GET">
                    
                    <div className="contCabeza">
                        <div className="botVolver"><button className="boton1" onClick={() => nav(-1)}>Volver</button></div>
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
                    </div>
                </form>
                        <button className="boton1" onClick={() => postInsertar()}>Registrarse</button>
                </div>
            </div>
        </div>
    );
}

export default SignUsuario;