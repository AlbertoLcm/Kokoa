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
import ListarComentarios from "../components/social/ListarComentarios";
import ComentariosNegocio from "../components/social/ComentariosNegocio";
import img from "../images/Plagui.jpg"

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
  const [showModal6, setShowModal6] = useState(false);
  const [showModal7, setShowModal7] = useState(false);
  const [showModalRegistrar, setShowModalRegistrar] = useState(false);

  const handleSetMap = (mapita) => {
    setMap(mapita);
  };

  console.log(user);

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
    if (user.rol === "patrocinadores") {
      instance.get(`/patrocinadores/${user.id}`).then((res) => {
        setRol(res.data)
      })
      console.log(rol)
    }
    if (user.rol === "artistas") {
      instance.get(`/artistas/${user.id}`).then((res) => {
        setRol(res.data)
      })
    }
  }, []);

  //Datos de los campos
  const [updateRol, setUpdateRol] = useState({
    nombre: "",
    direccion: "",
    numero: "",
    descripcion: "",
    sitio_web: "",
    Lun1: "",
    Lun2: "",
    Mar1: "",
    Mar2: "",
    Mie1: "",
    Mie2: "",
    Jue1: "",
    Jue2: "",
    Vie1: "",
    Vie2: "",
    Sab1: "",
    Sab2: "",
    Dom1: "",
    Dom2: ""
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
    if (originRef.current !== undefined) {
      setUpdateRol({
        ...updateRol,
        domicilio: originRef.current.value,
      });
    }
  }
  const handleUpdate = () => {
    console.log(updateRol)
    handleDomic();
    console.log(updateRol)
    instance.put(`/${rol.rol}/${rol.id}`, updateRol)
      .then((res) => {
        alert("Se actualizo correctamente");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  let parsHor = []
  const formHorar = (hor) => {
    hor = hor.split(",");
    parsHor = [("Lunes: " + hor[0]), ("Martes: " + hor[1]), ("Miercoles: " + hor[2]), ("Jueves: " + hor[3]), ("Viernes: " + hor[4]), ("Sabado: " + hor[5]), ("Domingo: " + hor[6])];
  }

  const BajarChat = () => {
    const div = document.getElementById('homeChat');
    div.scrollTop = div.scrollHeight;
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
          <RegistroEvento map={map} />
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
  }

  if (rol.rol === "negocios") {
    formHorar(rol.horario)
    return (
      <>
        <Header tipo={"responsive"} perfil={user.nombre} back={false} name={false} />

        <Modal
          estado={showModal1}
          cambiarEstado={setShowModal1}
          titulo="Cambiar nombre">
          <div className="modalConfPerfil">
            <p className="titulo">Nombre actual: {rol.nombre} </p>
            <section className="modalNombre">
              <div>
                <p>Nombre</p>
                <input type="text" id="nombre" name="nombre" onChange={handleChange} />
              </div>
            </section>
            <button onClick={() => handleUpdate()}>Guardar</button>
          </div>
        </Modal>

        <Modal
          estado={showModal2}
          cambiarEstado={setShowModal2}
          titulo="Cambiar telefono de contacto"
        >
          <div className="modalConfPerfil">
            <p className="titulo">Anterior telefono de contacto: {rol.numero} </p>
            <p>Nuevo telefono</p>
            <input type="text" name="numero" onChange={handleChange} />
            <button onClick={() => handleUpdate()}>Guardar</button>
          </div>
        </Modal>

        <Modal
          estado={showModal3}
          cambiarEstado={setShowModal3}
          titulo="Cambiar correo"
        >
          <div className="modalConfPerfil">
            <p className="titulo">Anterior correo {rol.email}</p>
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
            <p className="titulo">Anterior domicilio {rol.domicilio}</p>
            <p>Nuevo domicilio</p>
            <Autocomplete>
              <div className="inputBox">
                <input
                  id="ubicacion"
                  name="direccion"
                  type="text"
                  ref={originRef}
                  required
                />
              </div>
            </Autocomplete>
            <button onClick={() => handleUpdate()}>Guardar</button>
          </div>
        </Modal>

        <Modal
          estado={showModal5}
          cambiarEstado={setShowModal5}
          titulo="Cambiar descripcion"
        >
          <div className="modalConfPerfil">
            <p className="titulo">Anterior descripcion {rol.descripcion}</p>
            <p>Nueva descripcion</p><textarea
              cols="87"
              rows="3"
              maxlength="150"
              placeholder="Añada una descripcion de la forma y tipo de patrocinio que proporciona"
              onChange={handleChange}
              name="descripcion"
            />
            <button onClick={() => handleUpdate()}>Guardar</button>
          </div>
        </Modal>

        <Modal
          estado={showModal6}
          cambiarEstado={setShowModal6}
          titulo="Cambiar horario"
        >
          <div className="modalConfPerfil">
            <p className="titulo">Anterior horario <span> <br /> {parsHor[0]}</span> -- <span>{parsHor[1]}</span> <br /> <span>{parsHor[2]}</span> -- <span>{parsHor[3]}</span> <br /> <span>{parsHor[4]}</span> -- <span>{parsHor[5]}</span> <br /> <span>{parsHor[6]}</span></p>
            <p>Nuevo fecha</p>
            <h2>Horario</h2>
            <div className="NegcontHorario">
              <div>
                <h2>Lunes</h2>
                <div className="NegcontHorDia">
                  <h2 className="NegtextHor">De: </h2>
                  <div className="inputBox">
                    <input
                      name="Lun1"
                      onChange={handleChange}
                      type="time"
                      required
                    />
                  </div>
                  <h2 className="NegtextHor"> a: </h2>
                  <div className="inputBox">
                    <input
                      name="Lun2"
                      onChange={handleChange}
                      type="time"
                      required
                    />
                  </div>
                </div>
              </div>
              <div>
                <h2>Martes</h2>
                <div className="NegcontHorDia">
                  <h2 className="NegtextHor">De: </h2>
                  <div className="inputBox">
                    <input
                      name="Mar1"
                      onChange={handleChange}
                      type="time"
                      required
                    />
                  </div>
                  <h2 className="NegtextHor"> a: </h2>
                  <div className="inputBox">
                    <input
                      name="Mar2"
                      onChange={handleChange}
                      type="time"
                      required
                    />
                  </div>
                </div>
              </div>
              <div>
                <h2>Miercoles</h2>
                <div className="NegcontHorDia">
                  <h2 className="NegtextHor">De: </h2>
                  <div className="inputBox">
                    <input
                      name="Mie1"
                      onChange={handleChange}
                      type="time"
                      required
                    />
                  </div>
                  <h2 className="NegtextHor"> a: </h2>
                  <div className="inputBox">
                    <input
                      name="Mie2"
                      onChange={handleChange}
                      type="time"
                      required
                    />
                  </div>
                </div>
              </div>
              <div>
                <h2>Jueves</h2>
                <div className="NegcontHorDia">
                  <h2 className="NegtextHor">De: </h2>
                  <div className="inputBox">
                    <input
                      name="Jue1"
                      onChange={handleChange}
                      type="time"
                      required
                    />
                  </div>
                  <h2 className="NegtextHor"> a: </h2>
                  <div className="inputBox">
                    <input
                      name="Jue2"
                      onChange={handleChange}
                      type="time"
                      required
                    />
                  </div>
                </div>
              </div>
              <div>
                <h2>Viernes</h2>
                <div className="NegcontHorDia">
                  <h2 className="NegtextHor">De: </h2>
                  <div className="inputBox">
                    <input
                      name="Vie1"
                      onChange={handleChange}
                      type="time"
                      required
                    />
                  </div>
                  <h2 className="NegtextHor"> a: </h2>
                  <div className="inputBox">
                    <input
                      name="Vie2"
                      onChange={handleChange}
                      type="time"
                      required
                    />
                  </div>
                </div>
              </div>
              <div>
                <h2>Sabado</h2>
                <div className="NegcontHorDia">
                  <h2 className="NegtextHor">De: </h2>
                  <div className="inputBox">
                    <input
                      name="Sab1"
                      onChange={handleChange}
                      type="time"
                      required
                    />
                  </div>
                  <h2 className="NegtextHor"> a: </h2>
                  <div className="inputBox">
                    <input
                      name="Sab2"
                      onChange={handleChange}
                      type="time"
                      required
                    />
                  </div>
                </div>
              </div>
              <div>
                <h2>Domigo</h2>
                <div className="NegcontHorDia">
                  <h2 className="NegtextHor">De: </h2>
                  <div className="inputBox">
                    <input
                      name="Dom1"
                      onChange={handleChange}
                      type="time"
                      required
                    />
                  </div>
                  <h2 className="NegtextHor"> a: </h2>
                  <div className="inputBox">
                    <input
                      name="Dom2"
                      onChange={handleChange}
                      type="time"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <button onClick={() => handleUpdate()}>Guardar</button>
          </div>
        </Modal>

        <Modal
          estado={showModal7}
          cambiarEstado={setShowModal7}
          titulo="Cambiar sitio web"
        >
          <div className="modalConfPerfil">
            <p className="titulo">Anterior sitio web <a href={rol.sitio_web} target="_blank">{rol.sitio_web}</a> </p>
            <p>Nuevo sitio web</p><input type="text" name="sitio_web" onChange={handleChange} />
            <button onClick={() => handleUpdate()}>Guardar</button>
          </div>
        </Modal>

        <div id="ContGeneralNegocios">
          <section className="contFeedNegocios">

            <section id="contGeneralBtn">
              <div className="contBtnFeedNegocios">
                <section className="titulo">
                  <h1>{user.nombre_cargo}</h1>
                </section>
                <div className="btnsFeedNegocios">
                  <button className="btnFeedNegocios" onClick={() => setVisua(1)}>Inicio</button>
                  <button className="btnFeedNegocios" onClick={() => setVisua(2)}>Tus eventos</button>
                  <button className="btnFeedNegocios" onClick={() => setVisua(3)}>Estadisticas</button>
                  <button className="btnFeedNegocios" onClick={() => setVisua(4)}>Tu información</button>
                  <button className="btnFeedNegocios" onClick={() => setVisua(5)}>Tu perfil de negocio</button>
                  <button className="btnFeedNegocios" onClick={() => setVisua(6)}>Mensajeria</button>
                  <button className="btnFeedNegocios" onClick={() => setVisua(7)}>Tu negocio</button>
                </div>
              </div>
            </section>

            <section id="contenedorGeneralFeedNegocios">

              <div className="contenidoFeedNegocios">
                {
                  visua === 2 ? (
                    <>
                      <div id="ContEventosNegocioFeed">

                        <Modal
                          estado={showModalRegistrar}
                          cambiarEstado={setShowModalRegistrar}
                          titulo="Registrar evento"
                        >
                          <RegistroEvento negocio={true} />
                        </Modal>

                        <button className="btnLink2" onClick={() => setShowModalRegistrar(!showModalRegistrar)}>Crear un nuevo evento</button>

                        <section id="ContEventosNegocio">
                          <ListaEventosFeed id={user.id} solicito="negocio" />
                        </section>
                      </div>
                    </>
                  ) : visua === 1 ? (
                    <>
                      <ListarComentarios id_negocio={user.id} />
                    </>
                  ) : visua === 3 ? (
                    <>
                      <h3>Estadisticas</h3>
                      <h3>
                        Aquí puedes ver tus estadisticas de eventos pasados
                      </h3>
                    </>
                  ) : visua === 4 ? (
                    <>
                      {/* Datos de roles */}
                      <div id="contInfoGen" ><h2>{rol.nombre} </h2> <button onClick={() => setShowModal1(!showModal1)}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg></button></div>
                      <div id="contInfoGen"><h2>{rol.numero !== null ? (rol.numero) : ("Sin numero de contacto")}</h2> <button onClick={() => setShowModal2(!showModal2)}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg></button></div>
                      <div id="contInfoGen"><h2>{rol.email !== null ? (rol.email) : ("Sin correo de contacto")}</h2> <button onClick={() => setShowModal3(!showModal3)}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg></button></div>
                      <div id="contInfoGen"><h2>{rol.direccion}</h2> <button onClick={() => setShowModal4(!showModal4)}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg></button></div>
                      <div id="contInfoGen"><h2>{rol.descripcion !== null ? (rol.descripcion) : ("Sin descripcion")}</h2> <button onClick={() => setShowModal5(!showModal5)}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg></button></div>
                      <div id="contInfoGen"><h2>{rol.sitio_web !== null ? (<a href={rol.sitio_web}>{rol.sitio_web}</a>) : ("Sin sitio web")}</h2> <button onClick={() => setShowModal7(!showModal7)}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg></button></div>
                      {
                        rol.rol === "negocios" && (<div id="contInfoGen"> <h2> <span>{parsHor[0]}</span> <br /> <span>{parsHor[1]}</span> <br /> <span>{parsHor[2]}</span> <br /> <span>{parsHor[3]}</span> <br /> <span>{parsHor[4]}</span> <br /> <span>{parsHor[5]}</span> <br /> <span>{parsHor[6]}</span> </h2> <button onClick={() => setShowModal6(!showModal6)}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg></button></div>)
                      }
                    </>
                  ) : visua === 5 ? (
                    <>
                      <section id="PortadaPerfilAnfitrion">
                        <img src={image} id="ImagePortadaPerfilAnfitrion" />
                      </section>

                      <section id="InfPerfilAnfitrion">
                        <section id="DatosPerfilAnfitrion">
                          <h1>{user.nombre_cargo}</h1>
                          <p>4.9 Opiniones</p>
                        </section>

                        <section id="ContFotoPerfilAnfitrion">
                          <div id="FotoPerfilAnfitrion">
                            <img src={foto} id="ImageFotoPerfilAnfitrion" />
                          </div>
                        </section>
                      </section>
                      <section id="InfOpinionesAnfitrion">
                        <h2>Calificacion - 4.9 (19 Opiniones)</h2>

                        <Modal
                          estado={showModal}
                          cambiarEstado={setShowModal}
                          titulo={"Comentar"}
                        >
                          <div id="contComentarModal">
                            <textarea name="comentario" id="txtComentar" placeholder="Comenta algo sobre este negocio" onChange={handleChange} />
                            <button>Comentar</button>
                          </div>
                        </Modal>

                        <div id="Comentar">
                          <section className="contFotoUsuario">
                            <img src={foto} alt="Foto Usuario" />
                          </section>

                          <section className="comentario">
                            <p onClick={() => setShowModal(!showModal)}>
                              Comenta algo interesante
                            </p>
                          </section>
                        </div>

                        <ComentariosNegocio id_negocio={user.id} />

                      </section>
                    </>
                  ) : visua === 6 ? (
                    <>
                      <div className="contHomeChat">

                        <section className="contSeleccion">
                          <section className="contSelChat">
                            <div className="contImgSelChat">
                              <img src={img} alt="si" />
                            </div>
                            <div className="contInfoSelChat">
                              <h2>Nombre del chat 1</h2>
                              <p>Ultimo mensaje</p>
                            </div>
                          </section>

                          <section className="contSelChat">
                            <div className="contImgSelChat">
                              <img src={img} alt="si" />
                            </div>
                            <div className="contInfoSelChat">
                              <h2>Nombre del chat 2</h2>
                              <p>Ultimo mensaje</p>
                            </div>
                          </section>
                        </section>

                        <section className="homeChat">
                          <section className="titulo">
                            <div className="contImagen">
                              <img src={img} alt="si" className="imagenTitulo" />
                            </div>

                            <div className="nombre">
                              Usuario de chat
                            </div>
                          </section>

                          <section className="mensajes">
                            <div className="mensajeEmisor">
                              <p>
                                Este es un mensaje recibido pero intentando que sea medianamente largo
                              </p>
                            </div>
                            <div className="mensajeReceptor">
                              <p>
                                Este es un mensaje enviado pero intentando que sea estupidamente largo con la idea de que salga mas largo por intentar ver como se ve
                              </p>
                            </div>
                            <div className="mensajeEmisor">
                              <p>
                                Este es un mensaje recibido pero intentando que sea medianamente largo
                              </p>
                            </div>
                            <div className="mensajeReceptor">
                              <p>
                                Este es un mensaje enviado pero intentando que sea estupidamente largo con la idea de que salga mas largo por intentar ver como se ve
                              </p>
                            </div>
                            <div className="mensajeEmisor">
                              <p>
                                Este es un mensaje recibido pero intentando que sea medianamente largo
                              </p>
                            </div>
                            <div className="mensajeReceptor">
                              <p>
                                Este es un mensaje enviado pero intentando que sea estupidamente largo con la idea de que salga mas largo por intentar ver como se ve
                              </p>
                            </div>
                            <div className="mensajeEmisor">
                              <p>
                                Este es un mensaje recibido pero intentando que sea medianamente largo
                              </p>
                            </div>
                            <div className="mensajeReceptor">
                              <p>
                                Este es un mensaje enviado pero intentando que sea estupidamente largo con la idea de que salga mas largo por intentar ver como se ve
                              </p>
                            </div>
                            <div className="mensajeEmisor">
                              <p>
                                Este es un mensaje recibido pero intentando que sea medianamente largo
                              </p>
                            </div>
                            <div className="mensajeReceptor">
                              <p>
                                Este es un mensaje enviado pero intentando que sea estupidamente largo con la idea de que salga mas largo por intentar ver como se ve
                              </p>
                            </div>
                            <div className="mensajeEmisor">
                              <p>
                                Este es un mensaje recibido pero intentando que sea medianamente largo
                              </p>
                            </div>
                            <div className="mensajeReceptor">
                              <p>
                                Este es un mensaje enviado pero intentando que sea estupidamente largo con la idea de que salga mas largo por intentar ver como se ve
                              </p>
                            </div>
                            <div className="mensajeEmisor">
                              <p>
                                Este es un mensaje recibido pero intentando que sea medianamente largo
                              </p>
                            </div>
                            <div className="mensajeReceptor">
                              <p>
                                Este es un mensaje enviado pero intentando que sea estupidamente largo con la idea de que salga mas largo por intentar ver como se ve
                              </p>
                            </div>
                            <div className="mensajeEmisor">
                              <p>
                                Este es un mensaje recibido pero intentando que sea medianamente largo
                              </p>
                            </div>
                            <div className="mensajeReceptor">
                              <p>
                                Este es un mensaje enviado pero intentando que sea estupidamente largo con la idea de que salga mas largo por intentar ver como se ve
                              </p>
                            </div>
                          </section>

                          <section className="homeEscrituraChat">
                            <div className="contMensaje">
                              <textarea name="mensaje" id="mensaje" cols="100" rows="3"></textarea>
                            </div>

                            <div className="send">
                              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-send" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                                <path d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5" />
                              </svg>
                            </div>
                          </section>
                        </section>

                      </div>
                    </>
                  ) : (
                    <>
                      <section className="contMapaNegocios">
                        <Suspense fallback={<Loading />}>
                          <MapNegocio mapSet={handleSetMap} map={map} />
                        </Suspense>
                      </section>
                    </>
                  )
                }
              </div>
            </section>
          </section>
        </div>
      </>
    )
  }

}

export default Home;
