import React from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import Input from "../components/Input";
import "../stylesheets/signPatrocinador.css";

function SignPatrocinador() {
    return(
        <div className="contBackground">
            <Header boton={'Crear Cuenta'} />
            <div className="contForm">
                <form action="" className="form">
                    <div><h1>REGISTRO COMO NEGOCIO</h1></div>
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
                            <Input type='text' className="dataUser">ESTADO</Input>
                        </div>
                    </div>
                    <h2>Forma de patrocinio</h2>
                    <div className="contT">

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

export default SignPatrocinador;