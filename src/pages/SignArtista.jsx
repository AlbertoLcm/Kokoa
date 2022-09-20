import React from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import Input from "../components/Input";
import {Link, useNavigate} from "react-router-dom";
import "../stylesheets/signArtista.css";

function SignArtista() {
    const nav = useNavigate();
    return(
        <div className="contBackground">
            <Header boton={'Crear Cuenta'} />
            <div className="contForm">
                <form action="" className="form">
                <div className="contCabeza">
                    <div className="botVolver"><button className="boton1" onClick={() => nav(-1)}>Volver</button></div>
                        <h1>REGISTRO COMO ARTISTA</h1>
                    </div>
                    <div className="dataTotal">
                        
                        <div className="contInp">
                            <h2>DATOS DE CONTACTO</h2>
                            <Input type='text' className="dataUser">NOMBRE</Input>
                            <Input type='text' className="dataUser">EMAIL</Input>
                            <Input type='text' className="dataUser">NUMERO DE CONTACTO</Input>
                        </div>
                        
                        <div className="contInp">
                            <h2>DIRECCION</h2>
                            <Input type='text' className="dataUser">ESTADO</Input>
                            <Input type='text' className="dataUser">COLONIA</Input>
                            <Input type='text' className="dataUser">CALLE</Input>
                            <Input type='text' className="dataUser">NUMERO</Input>
                        </div>
                    </div>
                    <h2>PERFORMANCE</h2>
                    <div className="contT">
                        <div className="contTipPat">
                            <h3>Tipo Performance</h3>
                            <p>Musica</p> <Input type='checkbox' />  
                            <p>Entretenimiento</p><Input type='checkbox' />
                        </div>
                        <div className="contTDes">
                            <h3>Descripcion</h3><p></p>
                            <textarea cols="50" rows="5" placeholder="Añada una descripsion de su acto/estilo musical "/>
                        </div>
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

export default SignArtista;