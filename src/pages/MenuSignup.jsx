import React from "react";
import Header from "../components/Header";
import '../stylesheets/MenuSignup.css'
import {Link} from "react-router-dom";
import routes from "../helpers/routes";
import {useNavigate} from "react-router-dom";
function MenuLogin() {
    const nav = useNavigate();
    return(
        <div className="contBackground">
            <Header boton={'Ingresar'} ><div className="contBotPc"><button className="boton1" onClick={() => nav(-1)}>Volver</button></div> </Header>
            <div className="contPrincipal">
                <h2>¿Qué tipo de usuario eres?</h2>   
                <div className="contSelecion">
                    <div className="btnMenuNormal">
                        <Link to= {routes.newusuario} className="seleccion">
                            Fiestero
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
                        <Link to= {routes.newartista} className="seleccion">
                            Artista
                        </Link>
                    </div>
                    <div className="btnMenuPatrocinador">
                        <Link to= {routes.newpatrocinador} className="seleccion">
                            Patrocinador
                        </Link>
                    </div>
                </div>
                <div className="contBotMov"><button className="boton1" onClick={() => nav(-1)}>Volver</button></div>
            </div>
        </div>
    );
}

export default MenuLogin;