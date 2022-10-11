import React from "react";
import "../stylesheets/VisPerfs.css"
import useAuth from "../auth/useAuth";
import { useNavigation } from "react-router-dom";
import instance from "../api/axios";

function VisPerfs({idnegocio}) {
    const [info, seTinfo] = useState({});
    
    const { logout, user } = useAuth();
    const nav = useNavigation();
    const obtener = () => {
        instance.get(`/all/${idnegocio}`)
        .then (
            (result) => {
                seTinfo(result.data)
            }
        )
    }

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
                <div className="infoSideBar">
                    <h1>Nombre</h1>
                    <div>Descripcion</div>
                    <div>Ubicacion</div>
                    <div>Horario</div>
                </div>
                <div className="contEvPerf">
                    <div className="EvActVisPerf">Eventos Actuales
                        <p>Inserte eventos</p>
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