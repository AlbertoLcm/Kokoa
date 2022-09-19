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
                    <div className="btnMenuNormal">
                        <Link to= "/newusuario" className="seleccion">
                            Normal
                        </Link>
                    </div>
                    <div className="btnMenuNegocio">
                        <Link to= "/" className="seleccion">
                            Negocio
                        </Link>
                    </div>
                </div>  
                <div className="contSelecion">
                    <div className="btnMenuArtista">
                        <Link to= "/" className="seleccion">
                            Artista
                        </Link>
                    </div>
                    <div className="btnMenuPatrocinador">
                        <Link to= "/" className="seleccion">
                            Patrocinador
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuLogin;