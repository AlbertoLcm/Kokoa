import React from "react";
import Header from "../components/Header";
import '../stylesheets/MenuSignup.css'
import {Link} from "react-router-dom";
import routes from "../helpers/routes";
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
                        <Link to= {routes.newnegocio} className="seleccion">
                            Negocio
                        </Link>
                    </div>
                </div>  
                <div className="contSelecion">
                    <div className="btnMenuArtista">
                        <Link to= "/newartista" className="seleccion">
                            Artista
                        </Link>
                    </div>
                    <div className="btnMenuPatrocinador">
                        <Link to= "/newpatrocinador" className="seleccion">
                            Patrocinador
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuLogin;