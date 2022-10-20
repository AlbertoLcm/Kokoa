import React from "react";
import useAuth from "../auth/useAuth";
import { useState, Suspense, lazy, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../stylesheets/Home.css";
import "../stylesheets/BurguerMenu.css";
import routes from "../helpers/routes";
import Evento from "../components/EventosPagPrin";
import Loading from "../components/Loading";
import instance from "../api/axios";

const Mapa = lazy(() => import("../components/Mapa"));

function Home() {
  const nav = useNavigate();
  const { marcar, eventos, logout, user } = useAuth();

  const [opcio, setOpcio] = useState(false);
  const [showprin, setShowprin] = useState(1);
  const [map, setMap] = useState(/** @type google.maps.Map */(null));
  const [evCre, setEvCre] = useState([]);
  const [visua, setVisua] = useState(1);

  const toggle = () => { setOpcio(!opcio) };
  const handleSetMap = (mapita) => {
    setMap(mapita);
  };

  useEffect(() => {
    if (user[0].rol === "negocios") {
      instance.get(`/eventos/all/${user[0].auth}`).then((resultado) => {
        setEvCre(resultado.data)
      })
    }
  }, []);

  if (user[0].rol === "usuarios") {
    return (
      <>
        <header className="color">
          <section className="contLogo" onClick={() => nav(routes.home)}>
            <div className="logo">Kokoa</div>
          </section>
          <div className="userHeader" onClick={() => toggle(!opcio)}>
            {user[0].nombre}
          </div>
        </header>
        {opcio && (
          <div className="acomodo">
            <div className="dropiOpcio">
              <Link to={routes.perfil} id="togglePerfil">Configuración del perfil</Link>
              <div onClick={() => logout()} id='toggleSalir'>Salir</div>
            </div>
          </div>
        )}
        <section id="ContGeneralHome">
          <div className="contMapaHome">
            <Suspense fallback={<Loading />}>
              <Mapa mapSet={handleSetMap} />
            </Suspense>
          </div>
          <div className="feedHome">
            <section id="HeaderFeedHome">
              <h2>Hola {user[0].nombre}</h2>
              <section id="ContBtnFeedAnfitrion">
                <div id="BtnFeedAnfitrion">
                  <button className="btnFeedHome" onClick={() => setVisua(1)}>Para ti</button>
                  <div className="vrLine" />
                  <button className="btnFeedHome" onClick={() => setVisua(2)}>Local</button>
                  <div className="vrLine" />
                  <button className="btnFeedHome" onClick={() => setVisua(3)}>Comunidad</button>
                </div>
              </section>
            </section>
            {visua === 2 ? (
              <>
                {/* <h3>Cerca de ti</h3> */}
                <div id="ContEventosFeed">
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
              </>
            ) : visua === 1 ? (
              <>
                <div>
                  <h3></h3>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h2>Comunidad</h2>
                </div>
              </>
            )
            }
          </div>
        </section>
      </>
    );
  } else {
    return (
      <div>
        <h2>No eres un usuario</h2>
      </div>
    )
  }

}

export default Home;
