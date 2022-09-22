import React from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import Input from "../components/Input";
import {useNavigate} from "react-router-dom";
import "../stylesheets/signNegocio.css";

function SignNegocio() {
    const nav = useNavigate();
    return(
        <div className="contBackground">
            <Header boton={'Crear Cuenta'} />
            <div className="NegcontForm">
                <form action="" className="Negform">
                    <div className="NegcontCabeza">
                        <div className="NegbotVolver"><button className="boton1" onClick={() => nav(-1)}>Volver</button></div>
                        <h1>REGISTRO COMO NEGOCIO</h1>
                    </div>
                    <div className="NegdataTotal">
                        
                        <div className="NegcontInp">
                            <h2>DATOS DE CONTACTO</h2>
                            <Input type='text' className="NegdataUser">NOMBRE</Input>
                            <Input type='text' className="NegdataUser">EMAIL</Input>
                            <Input type='text' className="NegdataUser">NUMERO DE CONTACTO</Input>
                        </div>
                        
                        <div className="NegcontInp">
                            <h2>DIRECCION</h2>
                            <Input type='text' className="NegdataUser">ESTADO</Input>
                            <Input type='text' className="NegdataUser">COLONIA</Input>
                            <Input type='text' className="NegdataUser">CALLE</Input>
                            <Input type='text' className="NegdataUser">NUMERO</Input>
                        </div>
                    </div>
                    <h2>Horario</h2>
                    <div className="NegcontHorario"> 
                        <div>
                            <h2>Lunes</h2>
                            <div className="NegcontHorDia"> 
                                <h2 className="NegtextHor">De: </h2> <Input type='time' /> <h2 className="NegtextHor"> a: </h2> <Input type='time' />
                            </div>
                        </div>
                        <div>
                            <h2>Martes</h2>
                            <div className="NegcontHorDia"> 
                                <h2 className="NegtextHor">De: </h2> <Input type='time' /> <h2 className="NegtextHor"> a: </h2> <Input type='time' />
                            </div>
                        </div>
                        <div>
                            <h2>Miercoles</h2>
                            <div className="NegcontHorDia"> 
                                <h2 className="NegtextHor">De: </h2> <Input type='time' /> <h2 className="NegtextHor"> a: </h2> <Input type='time' />
                            </div>
                        </div>
                        <div>
                            <h2>Jueves</h2>
                            <div className="NegcontHorDia"> 
                                <h2 className="NegtextHor">De: </h2> <Input type='time' /> <h2 className="NegtextHor"> a: </h2> <Input type='time' />
                            </div>
                        </div>
                        <div>
                            <h2>Viernes</h2>
                            <div className="NegcontHorDia"> 
                                <h2 className="NegtextHor">De: </h2> <Input type='time' /> <h2 className="NegtextHor"> a: </h2> <Input type='time' />
                            </div>
                        </div>
                        <div>
                            <h2>Sabado</h2>
                            <div className="NegcontHorDia"> 
                                <h2 className="NegtextHor">De: </h2> <Input type='time' /> <h2 className="NegtextHor"> a: </h2> <Input type='time' />
                            </div>
                        </div>
                        <div>
                            <h2>Domigo</h2>
                            <div className="NegcontHorDia"> 
                                <h2 className="NegtextHor">De: </h2> <Input type='time' /> <h2 className="NegtextHor"> a: </h2> <Input type='time' />
                            </div>
                        </div>
                    </div>

                    <h2>Contraseña</h2>
                    <div className="NegcontPass">
                        
                        <div className="NegdataPass">
                            <Input type='password'>Contraseña</Input>
                        </div>
                        <div className="NegdataPass">
                            <Input type='password'>Confirme su Contraseña</Input>
                        </div>
                    </div>
                    <div className="NegcontBot">
                        <Button tipo={'boton1'}>Registrarse</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignNegocio;