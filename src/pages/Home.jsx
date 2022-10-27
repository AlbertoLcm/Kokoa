import React from "react";
import useAuth from "../auth/useAuth";
import { useState, Suspense, lazy, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../stylesheets/Home.css";
import "../stylesheets/BurguerMenu.css";
import Evento from "../components/EventosPagPrin";
import Loading from "../components/Loading";
import instance from "../api/axios";
import Header from "../components/Header";
import routes from "../helpers/routes";
import foto from "../images/Wall (59).jpg";
import image from "../images/concert.jpg";
import ListaEventosFeed from "../components/infElements/ListaEventosFeed";

const Mapa = lazy(() => import("../components/Mapa"));
const MapNegocio = lazy(() => import("../components/maps/MapNegocio"));

function Home() {
  
  const nav = useNavigate();
  const { marcar, eventos, logout, user } = useAuth();

  const [map, setMap] = useState(/** @type google.maps.Map */(null));
  const [evCre, setEvCre] = useState([]);
  const [visua, setVisua] = useState(1);


  const handleSetMap = (mapita) => {
    setMap(mapita);
  };

  useEffect(() => {
    if (user.rol === "negocios") {
      instance.get(`/eventos/all/${user.auth}`).then((resultado) => {
        setEvCre(resultado.data)
      })
    }
  }, []);

  console.log(user);
  

  if (user.rol === "usuarios") {
    return (
      <>
        <Header tipo={'color'} user={user.nombre} back={false} />

        <section id="ContGeneralHome">
          <div className="contMapaHome">
            <Suspense fallback={<Loading />}>
              <Mapa mapSet={handleSetMap} map={map} />
            </Suspense>
          </div>
          <div className="feedHome">
            <section id="HeaderFeedHome">
              <h2>Hola {user.nombre}</h2>
              <section id="ContBtnFeedAnfitrion">
                <div id="BtnFeedAnfitrion">
                  <button className="btnFeedHome" onClick={() => setVisua(1)}>Para ti</button>
                  <div className="vrLine" />
                  <button className="btnFeedHome" onClick={() => setVisua(2)}>Cercanos</button>
                  <div className="vrLine" />
                  <button className="btnFeedHome" onClick={() => setVisua(3)}>Comunidad</button>
                </div>
              </section>
            </section>
            {visua === 2 ? (
              <>
                <h3>Cerca de ti</h3>
                <div id="ContEventosFeed">
                  {
                    eventos ? (eventos.map((evento) => {
                      return (
                        <Evento
                          id={evento.id_evento}
                          lugar={evento.ubicacion}
                          titulo={evento.evento}
                          corrs={{ lat: evento.lat, lng: evento.lng }}
                          mapa={map}
                          metodo={evento.asignacion}
                        />
                      )
                    })) : (
                      <h3>No hay eventos cerca de ti</h3>
                    )
                  }
                </div>
              </>
            ) : visua === 1 ? (
              <>
                <h3>Recomendados</h3>
                <h3>
                  Aún no hay eventos recomendados para ti
                </h3>
              </>
            ) : (
              <>
                <h3>Comunidad</h3>
                <section id="ContCrearEvento">
                  <Link to={routes.registrarevento} className={"btnLink"}>Publicar un evento</Link>
                </section>

                <section id="InfOpinionesAnfitrion">

                  <div className="opinionesAnfitrion">
                    <div className="opinionAnfitrion">
                      <section className="contOpinador">
                        <div className="fotoOpinador">
                          <img src={foto} />
                        </div>
                        <div className="nombreOpinador">
                          <p>Alberto Cruz Marín</p>
                          <p className="fecha">Noviembre 17</p>
                        </div>

                      </section>
                      <section className="contOpinion">
                        <p>
                          Comentario de prueba acerca de un evento que esta asistiendo el usuario o compartio
                        </p>
                      </section>
                    </div>
                  </div>

                  <div className="opinionesAnfitrion">
                    <div className="opinionAnfitrion">
                      <section className="contOpinador">
                        <div className="fotoOpinador">
                          <img src={foto} />
                        </div>
                        <div className="nombreOpinador">
                          <p>Alberto Cruz Marín</p>
                          <p className="fecha">Noviembre 17</p>
                        </div>

                      </section>
                      <section className="contOpinion">
                        <p>
                          Comparto un evento que he creado.
                        </p>
                        <div id="ContEventoHomeFeed">
                          <section id="ContImgEventoFeed">
                            <img src={image} id="ImgEventoFeed" />
                          </section>

                          <section id="ContInfEvento">
                            <div className="infEvento">
                              <p className="infEventoFecha">
                                Sab, 17 octubre a las 16:00 horas
                              </p>
                              <h4>Fiesta</h4>
                              <p className="infEventoUbicacion">
                                Ixtapaluca estado de México
                              </p>
                              <p className="asistentesEvento">
                                Asistiran 12 personas
                              </p>
                            </div>
                          </section>
                        </div>
                      </section>
                    </div>
                  </div>

                  <div className="opinionesAnfitrion">
                    <div className="opinionAnfitrion">
                      <section className="contOpinador">
                        <div className="fotoOpinador">
                          <img src={foto} />
                        </div>
                        <div className="nombreOpinador">
                          <p>Alberto Cruz Marín</p>
                          <p className="fecha">Noviembre 17</p>
                        </div>

                      </section>
                      <section className="contOpinion">
                        <p>
                          Comentario de prueba acerca de un evento que esta asistiendo el usuario o compartio
                        </p>
                      </section>
                    </div>
                  </div>

                  <div className="opinionesAnfitrion">
                    <div className="opinionAnfitrion">
                      <section className="contOpinador">
                        <div className="fotoOpinador">
                          <img src={foto} />
                        </div>
                        <div className="nombreOpinador">
                          <p>Alberto Cruz Marín</p>
                          <p className="fecha">Noviembre 17</p>
                        </div>

                      </section>
                      <section className="contOpinion">
                        <p>
                          Comentario de prueba acerca de un evento que esta asistiendo el usuario o compartio
                        </p>
                      </section>
                    </div>
                  </div>

                  <div className="opinionesAnfitrion">
                    <div className="opinionAnfitrion">
                      <section className="contOpinador">
                        <div className="fotoOpinador">
                          <img src={foto} />
                        </div>
                        <div className="nombreOpinador">
                          <p>Alberto Cruz Marín</p>
                          <p className="fecha">Noviembre 17</p>
                        </div>

                      </section>
                      <section className="contOpinion">
                        <p>
                          Comentario de prueba acerca de un evento que esta asistiendo el usuario o compartio
                        </p>
                      </section>
                    </div>
                  </div>

                  <div className="opinionesAnfitrion">
                    <div className="opinionAnfitrion">
                      <section className="contOpinador">
                        <div className="fotoOpinador">
                          <img src={foto} />
                        </div>
                        <div className="nombreOpinador">
                          <p>Alberto Cruz Marín</p>
                          <p className="fecha">Noviembre 17</p>
                        </div>

                      </section>
                      <section className="contOpinion">
                        <p>
                          Comentario de prueba acerca de un evento que esta asistiendo el usuario o compartio
                        </p>
                      </section>
                    </div>
                  </div>

                  <div className="opinionesAnfitrion">
                    <div className="opinionAnfitrion">
                      <section className="contOpinador">
                        <div className="fotoOpinador">
                          <img src={foto} />
                        </div>
                        <div className="nombreOpinador">
                          <p>Alberto Cruz Marín</p>
                          <p className="fecha">Noviembre 17</p>
                        </div>

                      </section>
                      <section className="contOpinion">
                        <p>
                          Comentario de prueba acerca de un evento que esta asistiendo el usuario o compartio
                        </p>
                      </section>
                    </div>
                  </div>

                  <div className="opinionesAnfitrion">
                    <div className="opinionAnfitrion">
                      <section className="contOpinador">
                        <div className="fotoOpinador">
                          <img src={foto} />
                        </div>
                        <div className="nombreOpinador">
                          <p>Alberto Cruz Marín</p>
                          <p className="fecha">Noviembre 17</p>
                        </div>

                      </section>
                      <section className="contOpinion">
                        <p>
                          Comentario de prueba acerca de un evento que esta asistiendo el usuario o compartio
                        </p>
                      </section>
                    </div>
                  </div>

                  <div className="opinionesAnfitrion">
                    <div className="opinionAnfitrion">
                      <section className="contOpinador">
                        <div className="fotoOpinador">
                          <img src={foto} />
                        </div>
                        <div className="nombreOpinador">
                          <p>Alberto Cruz Marín</p>
                          <p className="fecha">Noviembre 17</p>
                        </div>

                      </section>
                      <section className="contOpinion">
                        <p>
                          Comentario de prueba acerca de un evento que esta asistiendo el usuario o compartio
                        </p>
                      </section>
                    </div>
                  </div>
                </section>

              </>
            )
            }
          </div>
        </section>
      </>
    );
  } else {
    return (
      <>
        <Header tipo={'color'} user={user.nombre} back={false} name={false} />

        <div id="ContGeneralNegocios">

          <section className="contFeedNegocios">

            <h1>{user.nombre_cargo}</h1>
            
            <div className="contBtnFeedNegocios">
              <div className="btnsFeedNegocios">
                <button className="btnFeedNegocios" onClick={() => setVisua(1)}>Inicio</button>
                <button className="btnFeedNegocios" onClick={() => setVisua(2)}>Tus eventos</button>
                <button className="btnFeedNegocios" onClick={() => setVisua(3)}>Estadisticas</button>
              </div>
            </div>

            <div className="contenidoFeedNegocios">
              {
                visua === 2 ? (
                  <>
                    <h3>Tus eventos</h3>
                    <div id="ContEventosFeed">
                      <Link to={routes.registrarevento} className={"btnLink"}>Crear un evento nuevo</Link>
                      <ListaEventosFeed id={user.id} solicito="actuales"/>
                    </div>
                  </>
                ) : visua === 1 ? (
                  <>
                    <h3>Incio</h3>
                    <h3>
                      Aquí puedes ver tus comentarios de eventos pasados
                    </h3>
                  </>
                ) : (<>
                  <h3>Estadisticas</h3>
                  <h3>
                    Aquí puedes ver tus estadisticas de eventos pasados
                  </h3>
                </>)
              }
            </div>
          </section>

          <section className="contMapaNegocios">
            <Suspense fallback={<Loading />}>
              <MapNegocio mapSet={handleSetMap} map={map} />
            </Suspense>
            
          </section>

        </div>
    </>
    )
  }

}

export default Home;
