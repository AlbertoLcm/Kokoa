import React from "react";
import useAuth from "../auth/useAuth";
import { useState, Suspense, lazy, useEffect } from "react";
import { Link } from "react-router-dom";
import "../stylesheets/Home.css";
import { slide as Menu } from "react-burger-menu";
import "../stylesheets/BurguerMenu.css";
import routes from "../helpers/routes";
import Dropdown from "../components/DropDown";
import Evento from "../components/EventosPagPrin";
import RegistroEvento from "./RegistroEvento";
import Loading from "../components/Loading";
import instance from "../api/axios";

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
const EvNegocio = [
  {
    id: 1,
    value: "Crear Nuevo"
  },
  {
    id: 2,
    value: "Cercanos"
  },
  {
    id: 3,
    value: "Tus Eventos"
  }
]
const EvArtista = [
  {
    id: 1,
    value: "En busca de artistas"
  },
  {
    id: 3,
    value: "Cercanos"
  }
]
const EvPatro = [
  {
    id: 1,
    value: "En busca de Patrocinador"
  },
  {
    id: 2,
    value: "Cercanos"
  }
]


function Home() {
  const { marcar, eventos } = useAuth();

  const { logout, user } = useAuth();

  const [opcio, setOpcio] = useState(false);
  const toggle = () => { setOpcio(!opcio) };

  const [map, setMap] = useState(/** @type google.maps.Map */(null));
  const handleSetMap = (mapita) => {
    setMap(mapita);
  };

  const [evCre, setEvCre] = useState([]);
  useEffect(() => {
    if(user[0].rol === "negocios"){
      instance.get(`/eventos/all/${user[0].auth}`).then((resultado) => {
        setEvCre(resultado.data)
      } )
    }
  },[]);
  
  return (
    <div className="contHome">
      <header className="color">
        <section className="contLogo">
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
      {
              user[0].rol === 'usuarios' ? (
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
              ) : user[0].rol === 'negocios' ? (
                <div>
                  <h2>Hola {user[0].nombre}</h2>
                  {
                    window.screen.width < 768 ? (
                      <Dropdown title="Evento" items={EvNegocio} />
                    ) : (
                      <p>Por favor recargue la pagina</p>
                    )
                  }
                  {
                    marcar === 1 ? (
                      <div className="CrearEvento">
                        <RegistroEvento />
                      </div>
                    ) : marcar === 2 ? (
                      <div className="Cercanos">
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
                      <div>
                        {
                          evCre !== null ? (
                            <div>
                              {
                                evCre.map((evento) => {
                                  return (
                                    <div className="contEvento">
                                      <h1>{evento.nombre} </h1>
                                      <p>Comienza: {evento.fecha_inicio} </p>
                                      <p>Termina: {evento.fecha_termino} </p>
                                      <p>Ubicado en: {evento.ubicacion} </p>
                                    </div>
                                  )
                                })
                              }
                            </div>
                          ) : (
                            <div>
                              <h3>No tienes eventos activos</h3>
                              <h3>¿Qué esperas?</h3>
                              <h3>Crea tu siguiente gran evento</h3>
                            </div>
                          )
                        }
                      </div>
                    )
                  }
                </div>
              ) : user[0].rol === 'artistas' ? (
                <div>
                  <h2>Hola {user[0].nombre}</h2>
                  {
                    window.screen.width < 768 ? (
                      <Dropdown title="Evento" items={EvArtista} />
                    ) : (
                      <p>Por favor recargue la pagina</p>
                    )
                  }
                  {
                    marcar === 1 ? (
                      <div>
                        <p>Work In Progress</p>
                      </div>
                    ) : (
                      <div className="Cercanos">
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
                    )
                  }
                </div>
              ) : (
                <div>
                  <h2>Hola {user[0].nombre}</h2>
                  {
                    window.screen.width < 768 ? (
                      <Dropdown title="Evento" items={EvPatro} />
                    ) : (
                      <p>Por favor recargue la pagina</p>
                    )
                  }
                  {
                    marcar === 1 ? (
                      <div>
                        <p>Work In Progress</p>
                      </div>
                    ) : (
                      <div className="Cercanos">
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
                    )
                  }
                </div>
              )
            }
      </Menu>
      <div className="hoContMapa">
        <div id="contBackgroundHome">
          <div id="contFeed">
            {
              user[0].rol === 'usuarios' ? (
                <div id="feedHome">
                  <h2>Hola {user[0].nombre}</h2>
                  <Dropdown title="Evento" items={EvUser} />
                  {marcar === 1 ? (
                    <div className="CrearEvento">
                      <RegistroEvento />
                    </div>
                  ) : marcar === 2 ? (
                    <div className="Cercanos">
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
              ) : user[0].rol === 'negocios' ? (
                <div id="feedHome">
                  <h2>Bienvenido {user[0].nombre}</h2>
                  <Dropdown title="Evento" items={EvNegocio} />
                  {
                    marcar === 1 ? (
                      <div className="CrearEvento">
                        <RegistroEvento />
                      </div>
                    ) : marcar === 2 ? (
                      <div className="Cercanos">
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
                      <div className="eventsNegPrin">
                        {
                          evCre !== null ? (
                            <div>
                              {
                                evCre.map((evento) => {
                                  return (
                                    <div className="contEvento">
                                      <h1>{evento.nombre} </h1>
                                      <p>Comienza: {evento.fecha_inicio} </p>
                                      <p>Termina: {evento.fecha_termino} </p>
                                      <p>Ubicado en: {evento.ubicacion} </p>
                                    </div>
                                  )
                                })
                              }
                            </div>
                          ) : (
                            <div>
                              <h3>No tienes eventos activos</h3>
                              <h3>¿Qué esperas?</h3>
                              <h3>Crea tu siguiente gran evento</h3>
                            </div>
                          )
                        }
                      </div>
                    )
                  }
                </div>
              ) : user[0].rol === 'artistas' ? (
                <div id="feedHome">
                  <h2>Bienvenido {user[0].nombre}</h2>
                  <Dropdown title="Evento" items={EvArtista} />
                  {
                    marcar === 1 ? (
                      <div>
                        <p>Work In Progress</p>
                      </div>
                    ) : (
                      <div className="Cercanos">
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
                    )
                  }
                </div>
              ) : (
                <div id="feedHome">
                  <h2>Bienvenido {user[0].nombre}</h2>
                  <Dropdown title="Evento" items={EvPatro} />
                  {
                    marcar === 1 ? (
                      <div>
                        <p>Work In Progress</p>
                      </div>
                    ) : (
                      <div className="Cercanos">
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
                    )
                  }
                </div>
              )
            }
          </div>
        </div>
        <Suspense fallback={<Loading />}>
          <Mapa mapSet={handleSetMap} map={map} />
        </Suspense>
      </div>
    </div>
  );
}

export default Home;
