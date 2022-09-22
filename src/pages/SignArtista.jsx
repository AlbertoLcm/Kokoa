import React from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import Input from "../components/Input";
import {useNavigate} from "react-router-dom";
import "../stylesheets/signArtista.css";

function SignArtista() {
    const nav = useNavigate();
    return(
        <div className="contBackground">
            <Header boton={'Crear Cuenta'} ><div className="ArtbotVolver"><button className="boton1" onClick={() => nav(-1)}>Volver</button></div> </Header>
            <div className="ArtcontForm">
                <form action="" className="Artform">
                <div className="ArtbotVolverChica"><button className="boton1" onClick={() => nav(-1)}>Volver</button></div>
                <div className="ArtcontCabeza">
                        <h1>REGISTRO COMO ARTISTA</h1>
                    </div>
                    <div className="ArtdataTotal">
                        
                        <div className="ArtcontInp">
                            <h2>DATOS DE CONTACTO</h2>
                            <Input type='text' className="ArtdataUser">NOMBRE</Input>
                            <Input type='text' className="ArtdataUser">EMAIL</Input>
                            <Input type='text' className="ArtdataUser">NUMERO DE CONTACTO</Input>
                        </div>
                        
                        <div className="ArtcontInp">
                            <h2>DIRECCION</h2>
                            <Input type='text' className="ArtdataUser">ESTADO</Input>
                            <Input type='text' className="ArtdataUser">COLONIA</Input>
                            <Input type='text' className="ArtdataUser">CALLE</Input>
                            <Input type='text' className="ArtdataUser">NUMERO</Input>
                        </div>
                    </div>
                    <h2>PERFORMANCE</h2>
                    <div className="ArtcontT">
                        <div className="ArtcontTipPat">
                            <h3>Tipo Performance</h3>
                            <p>Musica</p> <Input type='checkbox' />  
                            <p>Entretenimiento</p><Input type='checkbox' />
                        </div>
                        <div className="ArtcontTDes">
                            <h3>Descripcion</h3><p></p>
                            <textarea cols="30" rows="5" placeholder="Añada una descripsion de su acto/estilo musical "/>
                        </div>
                    </div>
                    <h2>Contraseña</h2>
                    <div className="ArtcontPass">
                        
                        <div className="ArtdataPass">
                            <Input type='password'>Contraseña</Input>
                        </div>
                        <div className="ArtdataPass">
                            <Input type='password'>Confirme su Contraseña</Input>
                        </div>
                    </div>
                    <div className="ArtcontBot">
                        <Button tipo={'boton1'}>Registrarse</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignArtista;