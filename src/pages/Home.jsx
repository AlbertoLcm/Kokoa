import React from "react";
import useAuth from "../auth/useAuth";
import Header from "../components/Header";
import {slide as Menu} from 'react-burger-menu';
import '../stylesheets/Home.css'
import '../stylesheets/BurguerMenu.css'


function Home() {

    const { logout } = useAuth();

    return (

        <div className="contHome">
            <Menu>
                <button className='boton1' onClick={logout}> Cerrar sesión </button>
            </Menu>
            <Header boton={'header1'}></Header>
        </div>
    );
}

export default Home;