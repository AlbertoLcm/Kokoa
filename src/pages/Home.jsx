import React from "react";
import useAuth from "../auth/useAuth";
import { useRef, useState, Suspense, lazy, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Autocomplete } from "@react-google-maps/api";
import "../stylesheets/Home.css";
import "../stylesheets/BurguerMenu.css";
import Evento from "../components/EventosPagPrin";
import Loading from "../components/Loading";
import instance from "../api/axios";
import Header from "../components/Header";
import routes from "../helpers/routes";
import foto from "../images/Wall (59).jpg";
import image from "../images/concert.jpg";
import Modal from "../components/Modal";
import ListaEventosFeed from "../components/infElements/ListaEventosFeed";
import RegistroEvento from "./RegistroEvento";

const Mapa = lazy(() => import("../components/Mapa"));
const MapNegocio = lazy(() => import("../components/maps/MapNegocio"));

function Home() {

  const nav = useNavigate();
  const { marcar, eventos, logout, user } = useAuth();

  const [map, setMap] = useState(/** @type google.maps.Map */(null));
  const [evCre, setEvCre] = useState([]);
  const [visua, setVisua] = useState(1);
  const [showModal, setShowModal] = useState(false);

  // Para mostrar un modal diferente (esta fue la primer forma que se me ocurrio no me juzguen)
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [showModal5, setShowModal5] = useState(false);

  const handleSetMap = (mapita) => {
    setMap(mapita);
  };
  const [rol, setRol] = useState({});
  useEffect(() => {
    if (user.rol === "negocios") {
      instance.get(`/eventos/all/${user.id}`).then((resultado) => {
        setEvCre(resultado.data)
      })

      instance.get(`/negocios/${user.id}`).then((res) => {
        setRol(res.data)
      })
    }
  }, []);

  //Datos de los campos
  const [updateRol, setUpdateRol] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    descripcion: ""
  });

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();

  const handleChange = (e) => {
    setUpdateRol({
      ...updateRol,
      [e.target.name]: e.target.value,
    });
  }
  const handleDomic = () => {
    // console.log(originRef.current)
    if(originRef.current !== undefined){
      setUpdateRol({
        ...updateRol,
        domicilio: originRef.current.value,
      });
    }
  }
  const handleUpdate = () => {
    handleDomic();
    // instance.put(`/usuarios/${user.id}`, usuarioUpdate)
    //   .then((res) => {
    //     alert("Se actualizo correctamente");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }




  if (user.rol === "usuarios") {
    return (
      <>
        <Header tipo={'color'} perfil={user.nombre} back={false} />

        <Modal
          estado={showModal}
          cambiarEstado={setShowModal}
          titulo={"Crear un evento"}
        >
          <RegistroEvento />
        </Modal>

        <section id="ContGeneralHome">
          <div className="contMapaHome">
            
            <Suspense fallback={<Loading />}>
              <Mapa mapSet={handleSetMap} map={map} />
            </Suspense>
          </div>
          <div className="feedHome">
            <section id="HeaderFeedHome">
              <h2>Hola, {user.nombre}</h2>
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
                          fecha={evento.fecha}
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
                  <button onClick={() => setShowModal(!showModal)} className="btnLink2">Crear un evento</button>
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
        <Header tipo={'color'} perfil={user.nombre} back={false} name={false} />

        <Modal
        estado={showModal1}
        cambiarEstado={setShowModal1}
        titulo="Cambiar nombre"
      >
        <div className="modalConfPerfil">
          <p className="titulo">Nombre actual {user.nombre} {user.apellidos}</p>
          <section className="modalNombre">
            <div>
              <p>Nombre (s)</p>
              <input type="text" id="nombre" name="nombre" onChange={handleChange} />
            </div>
            <div>
              <p>Apellidos</p>
              <input type="text" name="apellidos" onChange={handleChange} />
            </div>  
          </section>
          <button onClick={() => handleUpdate()}>Guardar</button>
        </div>
      </Modal>
      <Modal
        estado={showModal2}
        cambiarEstado={setShowModal2}
        titulo="Cambiar correo"
      >
        <div className="modalConfPerfil">
          <p className="titulo">Anterior telefono {user.telefono} </p>
          <p>Nuevo telefono</p>
          <input type="text" name="telefono" onChange={handleChange} />
          <button onClick={() => handleUpdate()}>Guardar</button>
        </div>
      </Modal>
      <Modal
        estado={showModal3}
        cambiarEstado={setShowModal3}
        titulo="Cambiar correo"
      >
        <div className="modalConfPerfil">
          <p className="titulo">Anterior correo {user.email}</p>
          <p>Nuevo correo</p><input type="text" name="email" onChange={handleChange} />
          <button onClick={() => handleUpdate()}>Guardar</button>
        </div>
      </Modal>
      <Modal
        estado={showModal4}
        cambiarEstado={setShowModal4}
        titulo="Cambiar domicilio"
      >
        <div className="modalConfPerfil">
          <p className="titulo">Anterior domicilio {user.domicilio}</p>
          <p>Nuevo domicilio</p><Autocomplete>
                <div className="inputBox">
                  <input
                    id="ubicacion"
                    name="direccion"
                    type="text"
                    ref={originRef}
                    required
                  />
                </div>
              </Autocomplete>00
          <button onClick={() => handleUpdate()}>Guardar</button>
        </div>
      </Modal>
      <Modal
        estado={showModal5}
        cambiarEstado={setShowModal5}
        titulo="Cambiar fecha de nacimiento"
      >
        <div className="modalConfPerfil">
          <p className="titulo">Anterior fecha {user.fecha_nac}</p>
          <p>Nuevo fecha</p><input type="date" name="fecha_nacimiento" onChange={handleChange} />
          <button onClick={() => handleUpdate()}>Guardar</button>
        </div>
      </Modal>

        <div id="ContGeneralNegocios">

          <section className="contFeedNegocios">

            <h1>{user.nombre_cargo}</h1>

            <div className="contBtnFeedNegocios">
              <div className="btnsFeedNegocios">
                <button className="btnFeedNegocios" onClick={() => setVisua(1)}>Inicio</button>
                <button className="btnFeedNegocios" onClick={() => setVisua(2)}>Tus eventos</button>
                <button className="btnFeedNegocios" onClick={() => setVisua(3)}>Estadisticas</button>
                <button className="btnFeedNegocios" onClick={() => setVisua(4)}>Tus datos</button>
              </div>
            </div>

            <div className="contenidoFeedNegocios">
              {
                visua === 2 ? (
                  <>
                    <h3>Tus eventos</h3>
                    <div id="ContEventosFeed">
                      <Link to={routes.registrarevento} className={"btnLink"}>Crear un evento nuevo</Link>
                      <ListaEventosFeed id={user.id} solicito="actuales" />
                    </div>
                  </>
                ) : visua === 1 ? (
                  <>
                    <h3>Incio</h3>
                    <h3>
                      Aquí puedes ver tus comentarios de eventos pasados
                    </h3>
                  </>
                ) : visua === 3 ? (<>
                  <h3>Estadisticas</h3>
                  <h3>
                    Aquí puedes ver tus estadisticas de eventos pasados
                  </h3>
                </>) : (
                  <>
                    {/* Datos de roles */}
                    {console.log(user)}
                    <div id="contInfoGen" ><h2>{user.nombre} {" "} {user.apellidos} </h2> <button onClick={() => setShowModal1(!showModal1)}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg></button></div>
                    <div id="contInfoGen"><h2>{user.telefono}</h2> <button onClick={() => setShowModal2(!showModal2)}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg></button></div>
                    <div id="contInfoGen"><h2>{user.email}</h2> <button onClick={() => setShowModal3(!showModal3)}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg></button></div>
                    <div id="contInfoGen"><h2>{user.domicilio !== null ? (user.domicilio) : ("Sin dirección")}</h2> <button onClick={() => setShowModal4(!showModal4)}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg></button></div>
                    <div id="contInfoGen"><h2>{user.fecha_nacimiento !== null ? (user.fecha_nacimiento) : ("Sin fecha de nacimiento")}</h2> <button onClick={() => setShowModal5(!showModal5)}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg></button></div>
                  </>
                )
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
