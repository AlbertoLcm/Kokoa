import React from "react";
import Button from "../components/Button";
import '../stylesheets/Buttons.css';
import Header from "../components/Header";
import Input from "../components/Input";
import "../stylesheets/SignUsuario.css";
import {Link, useNavigate} from "react-router-dom";
import { useState } from "react";

function SignUsuario() {
    
    const [usuario, setUsuario] = useState(
        {
            nombre: "",
            apellidos: "",
            email: "",
            password: "",
            edad: 0,
            fecha_nac: "",
            telefono: 0,
            domicilio: ""
         }
    );
    
    const nav = useNavigate();

    const handleChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    let {telefono} = usuario;

    const handleSubmit = () => {
        telefono = parseInt(telefono, 10);

        const requesInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(usuario)
        }

        fetch('http://localhost:8081/api', requesInit)
        .then(res => res.json())
        .then(res => console.log(res))

        setUsuario({
            nombre: "",
            apellidos: "",
            email: "",
            password: "",
            edad: 0,
            fecha_nac: "",
            telefono: 0,
            domicilio: ""
        })

    }
    
    return(
        
        <div className="contBackground">
            <Header boton={'Crear Cuenta'} />
            <div className="contTot">
                <div className="contForm">
                
                <form className="form">
                    
                    <div className="contCabeza">
                        <div className="botVolver"><button className="boton1" onClick={() => nav(-1)}>Volver</button></div>
                        <h1>REGISTRO COMO USUARIO</h1>
                    </div>
                    <div className="contInpUs">
                        
                        <div className="inputBox">
                            <input name="nombre" onChange={handleChange} type='text' required />
                            <span>Nombre</span>
                        </div>
                        <div className="inputBox">
                            <input name="apellidos" onChange={handleChange} type='text' required />
                            <span>Apellidos</span>
                        </div>
                        <div className="inputBox">
                            <input name="email" onChange={handleChange} type='text' required />
                            <span>Email</span>
                        </div>
                        <div className="inputBox">
                            <input name="telefono" onChange={handleChange} type='text' required />
                            <span>Número de teléfono</span>
                        </div>

                        {/* <Input type='text' className="dataUser">Nombre</Input>
                        <Input type='text' className="dataUser">Apellido</Input>
                        <Input type='text' className="dataUser">Email</Input>
                        <Input type='text' className="dataUser">Numero de telefono</Input> */}
                    </div>
                    <h2>Contraseña</h2>
                    <div className="contPass" >
                        
                        <div className="inputBox" >
                            <input name="password" onChange={handleChange} type='password' required />
                            <span>Contraseña</span>
                        </div>

                        {/* <div className="dataPass">
                            <Input type='password'>Contraseña</Input>
                        </div>
                        <div className="dataPass">
                            <Input type='password'>Confirme su Contraseña</Input>
                        </div> */}
                    </div>
                    <div className="contBot">
                    </div>
                        <button className="boton1" onClick={() => handleSubmit}>Registrarse</button>
                </form>
                </div>
            </div>
        </div>
    );
}

export default SignUsuario;