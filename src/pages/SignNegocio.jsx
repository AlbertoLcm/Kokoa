import React from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import Input from "../components/Input";
import {Link} from "react-router-dom";
import "../stylesheets/signNegocio.css";

function SignNegocio() {
    return(
        <div className="contBackground">
            <Header boton={'Crear Cuenta'} />
            <div className="contForm">
                <form action="" className="form">
                    <div className="contCabeza">
                        <div className="botVolver"><Link to= "/signup" className="seleccion">Volver</Link></div>
                        <h1>REGISTRO COMO NEGOCIO</h1>
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
                    <h2>Horario</h2>
                    <div className="contHorario"> 
                        <div>
                            <h2>Lunes</h2>
                            <div className="contHorDia"> 
                                <h2 className="textHor">De: </h2> <Input type='time' /> <h2 className="textHor"> a: </h2> <Input type='time' />
                            </div>
                        </div>
                        <div>
                            <h2>Martes</h2>
                            <div className="contHorDia"> 
                                <h2 className="textHor">De: </h2> <Input type='time' /> <h2 className="textHor"> a: </h2> <Input type='time' />
                            </div>
                        </div>
                        <div>
                            <h2>Miercoles</h2>
                            <div className="contHorDia"> 
                                <h2 className="textHor">De: </h2> <Input type='time' /> <h2 className="textHor"> a: </h2> <Input type='time' />
                            </div>
                        </div>
                        <div>
                            <h2>Jueves</h2>
                            <div className="contHorDia"> 
                                <h2 className="textHor">De: </h2> <Input type='time' /> <h2 className="textHor"> a: </h2> <Input type='time' />
                            </div>
                        </div>
                        <div>
                            <h2>Viernes</h2>
                            <div className="contHorDia"> 
                                <h2 className="textHor">De: </h2> <Input type='time' /> <h2 className="textHor"> a: </h2> <Input type='time' />
                            </div>
                        </div>
                        <div>
                            <h2>Sabado</h2>
                            <div className="contHorDia"> 
                                <h2 className="textHor">De: </h2> <Input type='time' /> <h2 className="textHor"> a: </h2> <Input type='time' />
                            </div>
                        </div>
                        <div>
                            <h2>Domigo</h2>
                            <div className="contHorDia"> 
                                <h2 className="textHor">De: </h2> <Input type='time' /> <h2 className="textHor"> a: </h2> <Input type='time' />
                            </div>
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

export default SignNegocio;