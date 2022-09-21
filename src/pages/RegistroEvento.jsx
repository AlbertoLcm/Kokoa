import React from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import Input from "../components/Input";
import {useNavigate} from "react-router-dom";
import "../stylesheets/RegistroEvento.css";

function RegistroEvento() {
    const nav = useNavigate();
    return(
        <div className="contBackground">
            <Header boton={'Crear Cuenta'} />
            <div className="regEvContForm">
                <form action="" className="regEvForm">
                <div className="regEvContCabeza">
                    <div className="regEvBotVolver"><button className="boton1" onClick={() => nav(-1)}>Volver</button></div>
                        <h1>REGISTRAR NUEVO EVENTO</h1>
                    </div>
                    <div className="regEvdataTotal">
                        <div className="regEvcontInp">
                            <h2>DIRECCION</h2>
                            <Input type='text' className="regEvdataUser">ESTADO</Input>
                            <Input type='text' className="regEvdataUser">COLONIA</Input>
                            <Input type='text' className="regEvdataUser">CALLE</Input>
                            <Input type='text' className="regEvdataUser">NUMERO</Input>
                        </div>
                    </div>
                    
                    <h2>Contraseña</h2>
                    <div className="regEvcontPass">
                        
                        <div className="regEvdataPass">
                            <Input type='password'>Contraseña</Input>
                        </div>
                        <div className="regEvdataPass">
                            <Input type='password'>Confirme su Contraseña</Input>
                        </div>
                    </div>
                    <div className="regEvcontBot">
                        <Button tipo={'boton1'}>Registrarse</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegistroEvento;