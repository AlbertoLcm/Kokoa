import React from "react";
import { useState } from "react";
import useAuth from "../auth/useAuth";
import Perfil from "../components/Perfil"
import Header from "../components/Header";
import { slide as Menu } from "react-burger-menu";

import { useNavigate } from "react-router-dom";

function ConPerf() {
    const nav = useNavigate();

    const { logout, user } = useAuth();
    console.log(user);
    const [cont, setCont] = useState(1);
    function cambioVis(ver) {
        setCont(ver);
    }

    const [opcio, setOpcio] = useState(false);
    const toggle = () => { setOpcio(!opcio) };

    return (
        <div className="contPerf">
            <Header tipo={'color'} user={user[0].nombre} volver={true} />

            {
                opcio && (
                    <div className="acomodo" id="acomodo">
                        <div className="dropiOpcio">
                            <div onClick={() => nav(-1)} id='toggleSalir'>Volver</div>
                            <div onClick={() => logout()} id='toggleSalir'>Salir</div>
                        </div>
                    </div>
                )
            }
            <div className="contBase">
                <Menu>
                    <button onClick={() => cambioVis(1)}>Información personal</button>
                    <button onClick={() => cambioVis(2)}>Descripcíon</button>
                    <button onClick={() => cambioVis(3)}>Historial de eventos </button>
                </Menu>
                <div className="navSideBar">
                    <button onClick={() => cambioVis(1)}>Información general</button>
                    <button onClick={() => cambioVis(2)}>Descripcíon</button>
                    <button onClick={() => cambioVis(3)}>Historial de eventos </button>
                </div>
                <div className="contVis">
                    {
                        user[0].rol === 'usuarios' ? (
                            cont !== 1 ? (
                                <div className="entrVis">
                                    <p>Esta funcion no esta disponible para tu tipo de usuario</p>
                                </div>
                            ) : (
                                <div className="direccion">
                                    <Perfil />
                                </div>
                            )
                        ) : (
                            cont === 1 ? (
                                <div className="direccion">
                                    <Perfil />
                                </div>
                            ) : cont === 2 ? (
                                <div className="descripcion">
                                    <h1>Aquí va una corta descripción para informar a los usuarios a cerca de tu negocio</h1>
                                    <p>Inserte descripción :V</p>
                                    <div className="contContBotDesc"><div className="contBotDesc"><button className="boton1">CAMBIAR DESPCRIPCIÓN</button></div></div>
                                </div>
                            ) : cont === 3 ? (
                                <div className="historial">
                                    <h1>Estos son todos los eventos que has publicado</h1>
                                </div>
                            ) : (
                                <div className="entrVis">
                                    <h1>¡UPS!, ¡¿Como llegaste hasta aqui?!</h1>
                                    <h1>No te preocupes, solo selecciona alguno de los botones</h1>
                                    <h1> {"<= "} {"De los de ese lado"} </h1>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ConPerf;