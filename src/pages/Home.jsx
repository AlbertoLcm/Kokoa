import React from "react";
import useAuth from "../auth/useAuth";
import '../stylesheets/Home.css'

function Home(){

    const { logout } = useAuth();
    
    return(
        <div className="contHome">
            <h1>Home</h1>
            <div className="contSeleccion">
                <button className='boton1' onClick={logout}> Cerrar sesión </button>
            </div>
        </div>
    );
}

export default Home;