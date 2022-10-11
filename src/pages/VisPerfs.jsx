import React from "react";
import "../stylesheets/VisPerfs.css"
import useAuth from "../auth/useAuth";
import { useNavigate } from "react-router-dom";
import instance from "../api/axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";


function VisPerfs() {
    const [eventos, setEventos] = useState({});
    const [anfit, setAnfit] = useState({});

    const [opcio, setOpcio] = useState(false);
    const toggle = () => { setOpcio(!opcio) };

    const {id} = useParams()

    const { logout, user } = useAuth();
    const nav = useNavigate();

    useEffect(() => {
        instance.get(`/eventos/all/${id}`)
        .then (
            (result) => {
                setEventos(result.data)
            }
        )
        instance.get(`/auth/${id}`)
        .then (
            (result) => {
                setAnfit(result.data)
                console.log(result)
            }
        )
    }, []);
    
        return (
        <div>
            <header className="color">
                <section className="contLogo">
                    <div className="logo">Kokoa</div>
                </section>
                <button onClick={() => toggle(!opcio)} className="butNav">
                    {" "}
                    {user[0].nombre}{" "}
                </button>
            </header>
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
            <div className="contPrincVisPerf">
                <Menu>
                    <h1>Nombre</h1>
                    <div>Descripcion</div>
                    <div>Ubicacion</div>
                    <div>Horario</div>

                </Menu>
                <div className="eventosSideBar">
                    <h1>{anfit[0].nombre}</h1>
                    <div>Nos encontramos en: </div>
                    <h3>{anfit[0].direccion} </h3>
                    {
                        anfit[0].horario !== null ? (
                            <div>
                                <h3>Estamos abiertos:</h3>
                                <h3>{anfit[0].horario} </h3>
                            </div>
                        ) : (
                            <div></div>
                        )
                    }
                    <div>Contactanos: </div>
                    <h3>{eventos[0].email} </h3>
                    <h3>{eventos[0].telefono} </h3>
                </div>
                <div className="contEvPerf">
                    <div className="evActVisPerf">Eventos Actuales
                        {eventos.map((evento) => {
                            return(
                                <div>
                                    <h1>{evento.nombre}</h1>
                                    <h2>{evento.descripcion}</h2>
                                    <h3>Ubicado en: {evento.ubicacion}  </h3>
                                    <h3>Inicio: {evento.fecha_inicio} Termino: {evento.fecha_termino} </h3>
                                    <h3>Capacidad {evento.capacidad} Cover: {evento.precio} </h3>
                                    
                                </div>
                            )
                        })}
                    </div>

                    <div>Historial de eventos
                        <p>Inserte evetos</p>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default VisPerfs