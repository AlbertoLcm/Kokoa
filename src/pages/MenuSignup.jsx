import React from "react";
import Header from "../components/Header";
import '../stylesheets/MenuSignup.css'
import Button from "../components/Button";

function MenuLogin() {
    return(
        <div className="contBackground">
            <Header boton={'Ingresar'} />
            <div className="contPrincipal">
                <h2>¿Qué tipo de usuario eres?</h2>   
                <div className="contSelecion">
                        <Button tipo={'seleccion'}>Normal</Button>
                        <Button tipo={'seleccion'}>Negocio</Button>
                        <Button tipo={'seleccion'}>Artista</Button>
                        <Button tipo={'seleccion'}>Patrocinador</Button>
                </div>  
            </div>
        </div>
    );
}

export default MenuLogin;