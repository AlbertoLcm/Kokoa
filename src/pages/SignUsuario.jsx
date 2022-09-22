import React from "react";
import '../stylesheets/Buttons.css';
import Header from "../components/Header";
import "../stylesheets/SignUsuario.css";
import { useNavigate, useLocation} from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import useAuth from "../auth/useAuth";

const baseURL = 'http://localhost:8081/api';

function SignUsuario() {

    const { login } = useAuth();
    const location = useLocation()
    
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

    const handleSubmit = () => {

        axios.post(`${baseURL}/signup`, usuario)
            .then((response) => {
                console.log(response.data.message);
            }).catch(function (error) {
                // handle error
                console.log(error.response.data.message);
            })


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
                
                <form className="form" onSubmit={handleSubmit}>
                    
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
                        <button className="boton1" type="submit">Registrarse</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUsuario;