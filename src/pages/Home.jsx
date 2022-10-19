import React from "react";
import useAuth from "../auth/useAuth";
import { useState, Suspense, lazy, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../stylesheets/Home.css";
import { slide as Menu } from "react-burger-menu";
import "../stylesheets/BurguerMenu.css";
import routes from "../helpers/routes";
import Dropdown from "../components/DropDown";
import Evento from "../components/EventosPagPrin";
import RegistroEvento from "./RegistroEvento";
import Loading from "../components/Loading";
import instance from "../api/axios";
import Header from "../components/Header";
import VisPerfs from "./VisPerfs";

const Mapa = lazy(() => import("../components/Mapa"));
const EvUser = [
  {
    id: 1,
    value: "Crear nuevo",
  },
  {
    id: 2,
    value: "Cercanos",
  },
  {
    id: 3,
    value: "Recomendados",
  },
];

const cordsimp = {
  lat: 16.946323,
  lng: 120.831226,
};

function Home() {
  const nav = useNavigate();
  const { marcar, eventos } = useAuth();

  const { logout, user } = useAuth();

  const [opcio, setOpcio] = useState(false);
  const toggle = () => { setOpcio(!opcio) };

  const [showprin, setShowprin] = useState(1);

  const [map, setMap] = useState(/** @type google.maps.Map */(null));
  const handleSetMap = (mapita) => {
    setMap(mapita);
  };

  const [evCre, setEvCre] = useState([]);
  useEffect(() => {
    if (user[0].rol === "negocios") {
      instance.get(`/eventos/all/${user[0].auth}`).then((resultado) => {
        setEvCre(resultado.data)
      })
    }
  }, []);

  

  if(user[0].rol === "usuarios"){
    return (
    <div className="contHome">
      <header className="color">
        <section className="contLogo" onClick={() => nav(routes.home)}>
          <div className="logo">Kokoa</div>
        </section>
        <div className="userHeader" onClick={() => toggle(!opcio)}>
          {user[0].nombre}
        </div>
      </header>
      {
        opcio && (
          <div className="acomodo">
            <div className="dropiOpcio">
              <Link to={routes.perfil} id="togglePerfil">Configuración del perfil</Link>
              <div onClick={() => logout()} id='toggleSalir'>Salir</div>
            </div>
          </div>
        )
      }
            <Menu>
              <div>
                <h2>Hola {user[0].nombre}</h2>
                {
                  window.screen.width < 768 ? (
                    <Dropdown title="Evento" items={EvUser} />
                  ) : (
                    <p>Por favor recargue la pagina</p>
                  )
                }
                {marcar === 1 ? (
                  <div className="CrearEvento">
                    <RegistroEvento />
                  </div>
                ) : marcar === 2 ? (
                  <div className="Cercanos">
                    <p>Eventos Cercanos</p>
                    {eventos.map((evento) => {
                      return (
                        <Evento
                          lugar={evento.ubicacion}
                          titulo={evento.evento}
                          corrs={{ lat: evento.lat, lng: evento.lng }}
                          mapa={map}
                        />
                      )
                    })}
                  </div>
                ) : (
                  <div className="Recomendados">
                    <h2>Eventos Recomendados</h2>
                  </div>
                )}
              </div>
            </Menu>
            <div className="hoContMapa">
              <div id="contBackgroundHome">
                <div id="contFeed">
                  <div id="feedHome">
                    <h2>Hola {user[0].nombre}</h2>
                    <Dropdown title="Evento" items={EvUser} />
                    {marcar === 1 ? (
                      <div className="CrearEvento">
                        <RegistroEvento />
                      </div>
                    ) : marcar === 2 ? (
                      <div className="Cercanos">
                        {/* <Evento titulo={"Monte Clitoris"} corrs={cordsimp} mapa={map} /> */}
                        {eventos.map((evento) => {
                          return (
                            <Evento
                              lugar={evento.ubicacion}
                              titulo={evento.evento}
                              corrs={{ lat: evento.lat, lng: evento.lng }}
                              mapa={map}
                            />
                          )
                        })}
                      </div>
                    ) : (
                      <div className="Recomendados">
                        <p>Work In Progress</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <Suspense fallback={<Loading />}>
                <Mapa mapSet={handleSetMap} />
              </Suspense>
            </div>
    </div>
  );} else {
    return (
      <VisPerfs />
    )
  }

}

export default Home;
