import React from "react";
import useAuth from "../auth/useAuth";
import {Link} from "react-router-dom";
import {slide as Menu} from 'react-burger-menu';
import '../stylesheets/Home.css'
import '../stylesheets/BurguerMenu.css'
import routes from "../helpers/routes";
import Mapa from "../components/Mapa";


function Home() {

    const { logout } = useAuth();

    return (

        <div className="contHome">
            <Menu>
                <h1>Kokoa</h1>
                <div className="hoContLink">
                    <Link to={routes.home} className="seleccion">
                        Eventos recomendados
                    </Link>
                </div>
                <div className="hoContLink">
                    <Link to={routes.registrarevento} className="seleccion" target={"_parent"}>
                        Crear Evento
                    </Link>
                </div>
                <button className='boton1' onClick={logout}> Cerrar sesión </button>
            </Menu>
            <Mapa />

        </div>
    );
}

export default Home;