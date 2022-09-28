import React from "react";
import useAuth from "../auth/useAuth";
import {Link} from "react-router-dom";
import {slide as Menu} from 'react-burger-menu';
import '../stylesheets/Home.css'
import '../stylesheets/BurguerMenu.css'
import routes from "../helpers/routes";
import Mapa from "../components/Mapa";
import Header from "../components/Header";

function Home() {
    
    const { logout, user, getUsuario } = useAuth();

    console.log(user);

    const lugares= [
        {
            nombre: 'Lugar 1',
            lat: 16.946262,
            lng: 120.831239
        },
        {
            nombre: 'Lugar 2',
            lat: 19.314072,
            lng: -98.879777
        },
        {
            nombre: 'Lugar 3',
            lat: 19.314823,
            lng: -98.882016
        }
      ]
    
    return (

        <div className="contHome">
            <header className='color'>
            <section className="contLogo">
                <div className="logo">
                    Kokoa
                </div>
            </section>
            <ul className="contBotones">
                <li><a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"> {user.nombre} </a>
                    <ul class="nav" aria-labelledby="navbarDropdown">
                        <li><a href="#">Acción</a></li>
                        <li><a href="#">Otra acción</a></li>
                        <li><a role="button" onClick={() => logout()}>salir</a></li>
                    </ul>
                </li>
            </ul>
        </header>
            {/* <Menu>
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
            </Menu> */}
            <div className="hoContMapa">
                <div id="contBackgroundHome">
                    <div id="contFeed">
                        <div id="feedHome">
                            <h1>Datos</h1>
                            <hr />
                            <p>
                                Información relacionada con los tipos de eventos
                                dentro de la zona del usuario
                            </p>
                            <Link to={routes.registrarevento} className='boton3'>Crear evento</Link>
                        </div>
                    </div>
                </div>
                    <Mapa ubicaciones={lugares}/>
            </div>

        </div>
    );
}

export default Home;