import React from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import "../stylesheets/RegistroEvento.css";



function RegistroEvento() {
    const nav = useNavigate();
    return (
        <div className="contBackground">
            <Header boton={'Crear Cuenta'} />
            <div className="regEvContForm">
                <form action="" className="regEvForm">
                    <div className="regEvContCabeza">
                        <div className="regEvBotVolver"><button className="boton1" onClick={() => nav(-1)}>Volver</button></div>
                        <h1>REGISTRAR NUEVO EVENTO</h1>
                    </div>
                    <div className="regEvdataTotal">
                        <div className="regEvContInp">
                            <h2>DIRECCION</h2>
                            <Input type='text' className="regEvdataUser">ESTADO</Input>
                            <Input type='text' className="regEvdataUser">COLONIA</Input>
                            <Input type='text' className="regEvdataUser">CALLE</Input>
                            <Input type='text' className="regEvdataUser">NUMERO</Input>
                        </div>
                    </div>

                    <div className="regEvContInp">
                        <h2>Fecha de inicio</h2>
                        <Input type='date' /> 
                        
                        <h2>Hora de inicio</h2>
                        <Input type='Time' /> 
                        
                        <h2>Costo del acceso</h2><h3>(Dejar en blanco en caso de ser gratuito)</h3>                        
                        <Input type='number' /> 
                        
                        <h2>Capacidad del evento</h2><h3>(Dejar en blanco en caso de no tener limite o ser variable)</h3>                        
                        <Input type='number' /> 
                        
                        <div className="regEvContPub">
                            <h2>Publico</h2> <input type="checkbox" defaultChecked={true}/>
                        </div>
                    </div>
                    <div className="regEvContBot">
                        <Button tipo={'boton1'}>Registrar Evento</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegistroEvento;