import React from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import Input from "../components/Input";
import {useNavigate} from "react-router-dom";
import "../stylesheets/signPatrocinador.css";

function SignPatrocinador() {
    const nav = useNavigate();
    return(
        <div className="contBackground">
            <Header boton={'Crear Cuenta'} />
            <div className="PatcontForm">
                <form action="" className="Patform">
                    <div className="PatcontCabeza">
                        <div className="PatbotVolver"><button className="boton1" onClick={() => nav(-1)}>Volver</button></div>
                        <h1>REGISTRO COMO PATROCINADOR</h1>
                    </div>
                    <div className="PatdataTotal">
                        
                        <div className="PatcontInp">
                            <h2>DATOS DE CONTACTO</h2>
                            <Input type='text' className="PatdataUser">NOMBRE</Input>
                            <Input type='text' className="PatdataUser">EMAIL</Input>
                            <Input type='text' className="PatdataUser">NUMERO DE CONTACTO</Input>
                        </div>
                        
                        <div className="PatcontInp">
                            <h2>DIRECCION</h2>
                            <Input type='text' className="PatdataUser">ESTADO</Input>
                            <Input type='text' className="PatdataUser">COLONIA</Input>
                            <Input type='text' className="PatdataUser">CALLE</Input>
                            <Input type='text' className="PatdataUser">NUMERO</Input>
                        </div>
                    </div>
                    <h2>Forma de patrocinio</h2>
                    <div className="PatcontT">
                        <div className="PatcontTipPat">
                            <h3>Tipo de Patrocinio</h3>
                            <p>Bebidas</p> <Input type='checkbox' /> 
                            <p>Alcohol</p><Input type='checkbox' /> 
                            <p>Entretenimiento</p><Input type='checkbox' />
                        </div>
                        <div className="PatcontTDes">
                            <h3>Descripcion</h3><p></p>
                            <textarea cols="50" rows="5" placeholder="Añada una descripsion de la forma y tipo de patrocinio que proporciona"/>
                        </div>
                    </div>
                    <h2>Contraseña</h2>
                    <div className="PatcontPass">
                        
                        <div className="PatdataPass">
                            <Input type='password'>Contraseña</Input>
                        </div>
                        <div className="PatdataPass">
                            <Input type='password'>Confirme su Contraseña</Input>
                        </div>
                    </div>
                    <div className="PatcontBot">
                        <Button tipo={'boton1'}>Registrarse</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignPatrocinador;