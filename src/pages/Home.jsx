import React from "react";
import useAuth from "../auth/useAuth";
import Header from "../components/Header";
import {Link} from "react-router-dom";
import {slide as Menu} from 'react-burger-menu';
import '../stylesheets/Home.css'
import '../stylesheets/BurguerMenu.css'
import routes from "../helpers/routes";


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
            <Header boton={'header1'}></Header>
        </div>
    );
}

export default Home;