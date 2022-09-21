import React from "react";
import '../stylesheets/Buttons.css';
import Header from "../components/Header";
import Input from "../components/Input";
import "../stylesheets/SignUsuario.css";
import {useNavigate} from "react-router-dom";

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
            <div className="UscontTot">
                <div className="UscontForm">
                
                <form className="Usform" method="GET">
                    
                    <div className="UscontCabeza">
                        <div className="UsbotVolver"><button className="boton1" onClick={() => nav(-1)}>Volver</button></div>
                        <h1>REGISTRO COMO USUARIO</h1>
                    </div>
                    <div className="UscontInpUs">
                        <Input type='text' className="UsdataUser">Nombre</Input>
                        <Input type='text' className="UsdataUser">Apellido</Input>
                        <Input type='text' className="UsdataUser">Email</Input>
                        <Input type='text' className="UsdataUser">Numero de telefono</Input>
                    </div>
                    <h2>Contraseña</h2>
                    <div className="UscontPass">
                        
                        <div className="UsdataPass">
                            <Input type='password'>Contraseña</Input>
                        </div>
                        <div className="UsdataPass">
                            <Input type='password'>Confirme su Contraseña</Input>
                        </div>
                    </div>
                    <div className="UscontBot">
                    </div>
                </form>
                        <button className="boton1" onClick={() => postInsertar()}>Registrarse</button>
                </div>
            </div>
        </div>
    );
}

export default SignUsuario;