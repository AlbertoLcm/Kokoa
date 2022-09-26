import React from "react";
import useAuth from "../auth/useAuth";
import {Link} from "react-router-dom";
import {slide as Menu} from 'react-burger-menu';
import '../stylesheets/Home.css'
import '../stylesheets/BurguerMenu.css'
import routes from "../helpers/routes";
import Mapa from "../components/Mapa";


function Home() {
    
    const { logout, user, getUsuario } = useAuth();

    console.log(user);

    return (

        <div className="contHome">
            <Menu>
                <h1>Kokoa</h1>
                <h2>Hola {user.nombre}</h2>
                <div className="hoContLink">
                    <Link to={routes.home} className="seleccion">
                        Eventos recomendados
                    </Link>
                </div>
                <div className="hoContLink">
                    <Link to={routes.registrarevento} className="seleccion">
                        Crear Evento
                    </Link>
                </div>
                <button className='boton1' onClick={() => logout()}> Cerrar sesión </button>
            </Menu>
            <div className="hoContMapa">
                <Mapa />
            </div>

        </div>
    );
}

export default Home;