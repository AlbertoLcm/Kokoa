import React from "react";
import Header from "../components/Header";
import '../stylesheets/MenuSignup.css'
import Button from "../components/Button";
import { getByDisplayValue } from "@testing-library/react";
import {Link} from "react-router-dom";
function MenuLogin() {
    return(
        <div className="contBackground">
            <Header boton={'Ingresar'} />
            <div className="contPrincipal">
                <h2>¿Qué tipo de usuario eres?</h2>   
                <div className="contSelecion">
                    <Link to= "/" className="boton3">
                        Normal
                    </Link>

                    <Button tipo={'seleccionUsuarios'}>Negocio</Button>
                </div>  
                <div className="contSelecion">
                    <Button tipo={'seleccionUsuarios'}>Artista</Button>
                    <Button tipo={'seleccionUsuarios'}>Patrocinador</Button>
                </div>
            </div>
        </div>
    );
}

export default MenuLogin;