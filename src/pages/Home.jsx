import React from "react";
import useAuth from "../auth/useAuth";
import { useRef, useState, Suspense, lazy, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import "../stylesheets/Home.css";
import "../stylesheets/BurguerMenu.css";
import Evento from "../components/EventosPagPrin";
import Loading from "../components/loadings/Loading";
import instance from "../api/axios";
import Header from "../components/Header";
import Modal from "../components/modals/Modal";
import ListaEventosFeed from "../components/infElements/ListaEventosFeed";
import RegistroEvento from "./RegistroEvento";
import ListarComentarios from "../components/social/ListarComentarios";
import ComentariosNegocio from "../components/social/ComentariosNegocio";
import AllChats from "../components/social/AllChats";
import socket from "../components/sockets/Socket";
import LoadingElement from "../components/loadings/LoadingElement";

const Mapa = lazy(() => import("../components/maps/Mapa"));
const MapNegocio = lazy(() => import("../components/maps/MapNegocio"));


function Home() {
  // Area de pruebas
  const [mensajesCarg, setMensajesCarg] = useState([]);
  /** @type React.MutableRefObject<HTMLInputElement> */
  const alertRef = useRef();
  const buscadorRef = useRef();
  
  const cambiarMensajes = (mensajes) => {
    setMensajesCarg(mensajes)
  }
  const nav = useNavigate();

  const chatRef = useRef(null);

  // Fin del area de pruebas
  const { eventos, user, metodo, eventosTranscurso } = useAuth();

  const [map, setMap] = useState(/** @type google.maps.Map */(null));
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBqhV6i7d19_4MlXk1gEtZ0flSx_7yYfo8",
    libraries: ["places"],
  });
  const [evCre, setEvCre] = useState([]);
  const [visua, setVisua] = useState(6);
  const [visual, setVisual] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [comentario, setComentario] = useState({
    comentario: "",
    id_usuario: user.id,
    id_negocio: user.id,
    rol_usuario: user.rol,
  });
  const [usuario, setUsuario] = useState({});

  const [showCambiarFoto, setShowCambiarFoto] = useState(false);
  const [showCambiarPortada, setShowCambiarPortada] = useState(false);
  const [foto, setFoto] = useState({
    id: user.id,
    rol: user.rol,
    anterior: user.perfil,
    avatar: null,
    portada: false,
  });
  const [portada, setPortada] = useState({
    id: user.id,
    rol: user.rol,
    anterior: user.portada,
    portada: true,
    avatar: null,
  });
  const [selectFoto, setSelectFoto] = useState(user.perfil);
  const [selectPortada, setSelectPortada] = useState(user.portada);

  const handleFile = (e) => {
    alertRef.current.classList.add("d-none");
    setFoto({
      ...foto,
      [e.target.name]: e.target.files[0]
    });
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectFoto(reader.result);
    }
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleFilePortada = (e) => {
    alertRef.current.classList.add("d-none");
    setPortada({
      ...portada,
      [e.target.name]: e.target.files[0]
    });
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectPortada(reader.result);
    }
    reader.readAsDataURL(e.target.files[0]);
  };

  const subirFoto = () => {
    if (foto.avatar === null) {
      alertRef.current.classList.remove('d-none');
      alertRef.current.innerText = "Debes subir una nueva foto";
      return;
    }
    if (foto.avatar.size > 2097152) {
      alertRef.current.classList.remove('d-none');
      alertRef.current.innerText = "La foto debe ser menor a 2MB";
      return;
    }

    console.log(foto);

    setShowCambiarFoto(false);
    instance.post('/upload/profile', foto, { headers: { "Content-Type": "multipart/form-data" } })
      .then((res) => {
        instance.get(`/usuarios/${user.id}`)
          .then((res) => {
            setUsuario(res.data);
          })
      })
  };

  const subirPortada = () => {
    if (portada.avatar === null) {
      alertRef.current.classList.remove('d-none');
      alertRef.current.innerText = "Debes subir una nueva foto";
      return;
    }
    if (portada.avatar.size > 2097152) {
      alertRef.current.classList.remove('d-none');
      alertRef.current.innerText = "La foto debe ser menor a 2MB";
      return;
    }

    setShowCambiarPortada(false);
    instance.post('/upload/profile', portada, { headers: { "Content-Type": "multipart/form-data" } })
      .then((res) => {
        instance.get(`/usuarios/${user.id}`)
          .then((res) => {
            setUsuario(res.data);
          })
      })
  };

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

  const handleComentario = (e) => {
    setComentario({
      ...comentario,
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

  const actionPublicar = () => {
    console.log(comentario)
    instance.post("/negocios/comentarios", comentario)
      .then((res) => {
        setShowModal(false);
        socket.emit('comentar', comentario);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensajesCarg]);

  const actionBuscar= (e) => {{
    e.preventDefault(); //esto previene que el form se mande.
    // eslint-disable-next-line no-undef
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({
        address: buscadorRef.current.value,
      },(results, status) => {
        map.setCenter(results[0].geometry.location);
        map.setZoom(15);

        buscadorRef.current.value = "";
      }
    );
    
  }
  };

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
              {!isLoaded ? (<LoadingElement />) : (
                <Autocomplete>
                  <section className="contBuscador">
                    <form onSubmit={actionBuscar} method="POST" >
                      <input type="text" className="buscador" placeholder="Buscar" ref={buscadorRef} />
                      <button type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <circle cx="10" cy="10" r="7" />
                          <line x1="21" y1="21" x2="15" y2="15" />
                        </svg>
                      </button>
                    </form>
                  </section>
                </Autocomplete>
              )}
              <button onClick={() => setShowModal(!showModal)} className="btnLink2">Crear un evento</button>
              <section id="ContBtnFeedAnfitrion">
                <div id="BtnFeedAnfitrion">
                  <button className="btnFeedHome" onClick={() => setVisual(1)}>Para ti</button>
                  <div className="vrLine" />
                  <button className="btnFeedHome" onClick={() => setVisual(2)}>Cercanos</button>
                  <div className="vrLine" />
                  <button className="btnFeedHome" onClick={() => setVisual(4)}>En curso</button>
                  <div className="vrLine" />
                  <button className="btnFeedHome" onClick={() => setVisual(3)}>Comunidad</button>
                </div>
              </section>
            </section>

            <section className="contenedorContenido">
              {visual === 2 ? (
                <>
                  <p className="titulo">Cerca de ti</p>
                  <div id="ContEventosFeed">
                    {!eventos.length ? (<div className="comentariosNull"> No hay eventos cercanos </div>) : (null)}
                    {eventos.map((evento, index) => {
                        return (
                          <Evento
                            key={index}
                            id={evento.id_evento}
                            lugar={evento.ubicacion}
                            titulo={evento.evento}
                            fecha={evento.fecha}
                            fecha_termino={evento.fecha_termino}
                            corrs={{ lat: evento.lat, lng: evento.lng }}
                            mapa={map}
                            metodo={evento.asignacion}
                          />
                        )
                      })
                    }
                  </div>
                </>
              ): visual === 4 ? (
                <>
                  <p className="titulo">Eventos en curso</p>
                  <div id="ContEventosFeed">
                    {!eventosTranscurso.length ? (<div className="comentariosNull"> No hay eventos en curso </div>) : (null)}
                    {eventosTranscurso.map((evento, index) => {
                        return (
                          <Evento
                            key={index}
                            id={evento.id_evento}
                            lugar={evento.direccion}
                            titulo={evento.nombre}
                            fecha={evento.fecha_inicio}
                            fecha_termino={evento.fecha_termino}
                            corrs={{ lat: evento.lat, lng: evento.lng }}
                            mapa={map}
                            metodo={evento.asignacion}
                          />
                        )
                      })
                    }
                  </div>
                </>
              ) : visual === 1 ? (
                <>
                  <p className="titulo">Recomendados</p>
                  <div className="comentariosNull"> No hay eventos recomendados </div>
                </>
              ) : (
                <>
                  <p className="titulo">Comunidad</p>
                  <div className="comentariosNull"> No hay actividad </div>
                  <section id="InfOpinionesAnfitrion">

                  </section>
                </>
              )
              }

            </section>
          </div>
        </section>
      </>
    );
  }

  // Aqui inicia el home de negocios o patrocinadores

  if (user.rol !== "usuarios") {
    // formHorar(rol.horario)
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
            <p className="titulo">Anterior sitio web <a href={`https://${rol.sitio_web}`} target="_blank">{rol.sitio_web}</a> </p>
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

                  {
                    user.rol === "negocios" && (
                      <>
                        <button className="btnFeedNegocios" onClick={() => setVisua(1)}>Inicio</button>
                        <button className="btnFeedNegocios" onClick={() => setVisua(2)}>Tus eventos</button>
                        <button className="btnFeedNegocios" onClick={() => setVisua(3)}>Estadisticas</button>
                      </>
                    )
                  }

                  <button className="btnFeedNegocios" onClick={() => setVisua(4)}>Tu información</button>
                  <button className="btnFeedNegocios" onClick={() => setVisua(5)}>Tu perfil</button>
                  <button className="btnFeedNegocios" onClick={() => setVisua(6)}>Mensajeria</button>
                  <button className="btnFeedNegocios" onClick={() => setVisua(7)}>Tu ubicación</button>
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
                      <h1>Nombre</h1>
                      <div id="contInfoGen" ><h2>{rol.nombre} </h2> <button onClick={() => setShowModal1(!showModal1)}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg></button></div>
                      <h1>Numero</h1>
                      <div id="contInfoGen"><h2>{rol.numero !== null ? (rol.numero) : ("Sin numero de contacto")}</h2> <button onClick={() => setShowModal2(!showModal2)}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg></button></div>
                      <h1>Email</h1>
                      <div id="contInfoGen"><h2>{rol.email !== null ? (rol.email) : ("Sin correo de contacto")}</h2> <button onClick={() => setShowModal3(!showModal3)}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg></button></div>
                      <h1>Dirección</h1>
                      <div id="contInfoGen"><h2>{rol.direccion}</h2> <button onClick={() => setShowModal4(!showModal4)}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg></button></div>
                      <h1>Descripción</h1>
                      <div id="contInfoGen"><h2>{rol.descripcion !== null ? (rol.descripcion) : ("Sin descripcion")}</h2> <button onClick={() => setShowModal5(!showModal5)}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg></button></div>
                      <h1>Sitio Web</h1>
                      <div id="contInfoGen"><h2>{rol.sitio_web !== null ? (<a href={`https://${rol.sitio_web}`} target="_blank">{rol.sitio_web}</a>) : ("Sin sitio web")}</h2> <button onClick={() => setShowModal7(!showModal7)}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg></button></div>
                      {rol.rol === "negocios" && (<h1>Horario</h1>)}
                      {rol.rol === "negocios" && (<div id="contInfoGen"><h2> <span>{parsHor[0]}</span> <br /> <span>{parsHor[1]}</span> <br /> <span>{parsHor[2]}</span> <br /> <span>{parsHor[3]}</span> <br /> <span>{parsHor[4]}</span> <br /> <span>{parsHor[5]}</span> <br /> <span>{parsHor[6]}</span> </h2> <button onClick={() => setShowModal6(!showModal6)}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg></button></div>)}
                    </>
                  ) : visua === 5 ? (
                    <>
                      <Modal
                        estado={showCambiarFoto}
                        cambiarEstado={setShowCambiarFoto}
                        titulo="Actualizar foto de perfil"
                      >
                        <div className="modalConfPerfil">

                          <section className="contInputFile">
                            <div className="inputFile">
                              <svg xmlns="http:/  /www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-plus" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <circle cx="12" cy="12" r="9" />
                                <line x1="9" y1="12" x2="15" y2="12" />
                                <line x1="12" y1="9" x2="12" y2="15" />
                              </svg>
                              Subir Foto
                              <input type="file" accept="image/*" name="avatar" onChange={handleFile} />
                            </div>
                          </section>

                          <div ref={alertRef} className="alert d-none">
                            Algo salio mal
                          </div>

                          <section className="previsualizacion">
                            <div className="contImagen">
                              <img src={selectFoto} alt="foto de perfil" />
                            </div>
                          </section>

                          <button onClick={() => subirFoto()}>Actualizar foto de perfil</button>

                        </div>
                      </Modal>

                      <Modal
                        estado={showCambiarPortada}
                        cambiarEstado={setShowCambiarPortada}
                        titulo="Actualizar foto de portada"
                      >
                        <div className="modalConfPerfil">

                          <section className="contInputFile">
                            <div className="inputFile">
                              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-plus" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <circle cx="12" cy="12" r="9" />
                                <line x1="9" y1="12" x2="15" y2="12" />
                                <line x1="12" y1="9" x2="12" y2="15" />
                              </svg>
                              Subir Foto
                              <input type="file" accept="image/*" name="avatar" onChange={handleFilePortada} />
                            </div>
                          </section>

                          <div ref={alertRef} className="alert d-none">
                            Algo salio mal
                          </div>

                          <section className="previsualizacion">
                            <div className="contImagenPortada">
                              <img src={selectPortada} alt="foto de perfil" />
                            </div>
                          </section>

                          <button onClick={() => subirPortada()}>Actualizar foto de portada</button>

                        </div>
                      </Modal>

                      <div id="ContenedorFeedPerfilNegocioGeneral">

                        <div id="ContenedorFeedPerfilNegocio">

                          <section id="PortadaPerfilAnfitrion">
                            <img src={user.portada} id="ImagePortadaPerfilAnfitrion" />

                          </section>
                          <button className="fileSelect" onClick={() => setShowCambiarPortada(!showCambiarPortada)}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-camera-plus" width="35" height="35" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><circle cx="12" cy="13" r="3" /><path d="M5 7h2a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h2m9 7v7a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" /><line x1="15" y1="6" x2="21" y2="6" /><line x1="18" y1="3" x2="18" y2="9" /></svg>
                          </button>

                          <section id="InfPerfilAnfitrion">
                            <section id="DatosPerfilAnfitrion">
                              <h1>{user.nombre_cargo}</h1>
                              <p>4.9 Opiniones</p>
                            </section>

                            <section id="ContFotoPerfilAnfitrion">
                              <div id="FotoPerfilAnfitrion">
                                <img src={user.perfil} id="ImageFotoPerfilAnfitrion" />
                              </div>
                            </section>
                            <button className="fileSelect" onClick={() => setShowCambiarFoto(!showCambiarFoto)}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-camera-plus" width="35" height="35" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><circle cx="12" cy="13" r="3" /><path d="M5 7h2a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h2m9 7v7a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" /><line x1="15" y1="6" x2="21" y2="6" /><line x1="18" y1="3" x2="18" y2="9" /></svg>
                            </button>
                          </section>
                          <section id="InfOpinionesAnfitrion">
                            <h2>Calificacion - 4.9 (19 Opiniones)</h2>

                            <Modal
                              estado={showModal}
                              cambiarEstado={setShowModal}
                              titulo={"Comentar"}
                            >
                              <div id="contComentarModal">
                                <textarea name="comentario" id="txtComentar" placeholder="Comenta algo interesante" onChange={handleComentario} />
                                <button onClick={() => actionPublicar()}>Comentar</button>
                              </div>
                            </Modal>
                            <section className="contOpiniones">
                                <center>
                                  <div className="opCantidad">
                                    <div className="contBeer"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.713 9.87c-.103-3.382-.495-6.58-1.192-8.399-.954-.98-4.054-1.471-7.154-1.471-3.097 0-6.193.49-7.148 1.471-.821 2.144-1.219 6.204-1.219 10.223 0 4.314.459 8.581 1.346 10.374 1.147 1.287 4.087 1.932 7.027 1.932 2.938 0 5.875-.644 7.022-1.932.29-.587.535-1.439.732-2.471.318-1.658.207-2.896 2.874-2.896v-3.6c-2.418 0-2.224-1.1-2.288-3.231zm-13.284 10.758c-.596-2.462-1.506-9.642-.293-15.547.67.141 1.364.247 1.981.3-.846 5.634-.743 10.673.366 15.869-1.087-.137-2.054-.622-2.054-.622zm8.83-17.16c-.6.121-.847.532-.838 1.058.017.942.727 2.161.794 2.813.1.977-.506 1.661-1.46 1.661-.93 0-1.475-.733-1.401-1.66.055-.689.883-1.782.765-2.819-.104-.92-.778-.849-1.39-.849-2.909 0-5.729-.443-5.729-.879s2.82-.79 5.729-.79 5.268.354 5.268.79c0 .233-.683.463-1.738.675zm11.741 14.532h-1.776l-.37-1.484c-.144-.43-.546-.72-1-.72h-.854v-1.78h1.07c1.024 0 1.935.65 2.267 1.618l.663 2.366zm-2.559-5h-.935l-.498-3.653c-.079-.576.369-1.09.952-1.09.579 0 1.027.509.953 1.083l-.472 3.66z"/></svg> </div>
                                    <label>Cantidad</label>
                                    <p>4.5</p>
                                  </div>
                                </center>
                                <center>
                                  <div className="opCalidad">
                                    <div className="contLike"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 9.229c.234-1.12 1.547-6.229 5.382-6.229 2.22 0 4.618 1.551 4.618 5.003 0 3.907-3.627 8.47-10 12.629-6.373-4.159-10-8.722-10-12.629 0-3.484 2.369-5.005 4.577-5.005 3.923 0 5.145 5.126 5.423 6.231zm-12-1.226c0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-7.962-9.648-9.028-12-3.737-2.338-5.262-12-4.27-12 3.737z"/></svg></div>
                                    <label>Calidad</label>
                                    <p>4.5</p>
                                  </div>
                                </center>
                                <center>
                                  <div className="opPrecio">
                                    <div className="contRich"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 7h-19v11h-1v-12h20v1zm-2-2h-19v11h-1v-12h20v1zm-6 6c-1.656 0-3 1.344-3 3s1.344 3 3 3 3-1.344 3-3-1.344-3-3-3zm.15 4.484v.315h-.3v-.299c-.311-.005-.632-.079-.898-.217l.135-.493c.287.11.669.229.968.162.345-.078.415-.433.034-.604-.279-.129-1.133-.242-1.133-.973 0-.409.312-.775.895-.855v-.319h.301v.305c.217.006.461.043.732.126l-.108.493c-.23-.08-.485-.154-.733-.139-.446.026-.486.413-.174.575.514.242 1.182.42 1.182 1.063 0 .516-.404.791-.901.86zm-10.15-7.484v12h20v-12h-20zm18 10h-16v-8h16v8z"/></svg></div>
                                    <label>Precio</label>
                                    <p>4.5</p>
                                  </div>
                                </center>
                                <center>
                                  <div className="opSeguridad">
                                    <div className="contPolice"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.377 11.082c-.06 1.929-2.229 3.126-8.409 3.126-6.193 0-8.358-1.203-8.409-3.139 1.508 0 4.379-1.958 8.409-1.958 3.927-.001 7.144 1.971 8.409 1.971zm-8.408 4.09c-2.062 0-3.74-.131-5.078-.397.062.555.469 3.322 2.409 3.322 1.721 0 1.673-1.316 2.721-1.316 1.047 0 1.169 1.316 2.852 1.316 2.09 0 2.46-3.063 2.494-3.389-1.387.311-3.169.464-5.398.464zm6.405-.741c-.04 2.171-.717 4.769-2.28 6.437-1.048 1.119-2.377 1.687-3.949 1.687-1.575 0-2.898-.533-3.931-1.582-1.646-1.673-2.302-4.345-2.396-6.461-.523-.158-1.01-.347-1.484-.628-.016 2.472.704 5.942 2.821 8.094 1.321 1.341 3 2.022 4.99 2.022 1.972 0 3.712-.745 5.033-2.153 2.131-2.273 2.76-5.679 2.661-8.111-.459.308-.944.521-1.465.695zm-6.237-10.984l-.313.623-.701.1.507.485-.119.685.626-.324.627.324-.12-.685.507-.485-.7-.1-.314-.623zm7.211-.206s-2.537-.686-7.348-3.241c-4.812 2.555-7.348 3.241-7.348 3.241s-1.295 2.4-3.652 5.016l2.266 1.908c1.533-.165 4.64-2.082 8.734-2.082s7.201 1.917 8.734 2.083l2.266-1.909c-2.357-2.616-3.652-5.016-3.652-5.016zm-6.345 3.214c-.526.131-.605.188-.875.402-.269-.214-.349-.271-.875-.402-.731-.183-1.151-.656-1.151-1.299 0-.359.147-.691.318-1.146.192-.513.083-.675-.119-.882l-.171-.176.987-.819c.098.098.235.278.486.278.248 0 .416-.175.528-.271.102.09.268.271.523.271.248 0 .381-.171.49-.281l.983.823-.172.176c-.202.207-.311.369-.119.882.17.455.318.786.318 1.146 0 .641-.42 1.115-1.151 1.298z"/></svg></div>
                                    <label>Seguridad</label>
                                    <p>4.5</p>
                                  </div>
                                </center>
                                <center>
                                  <div className="opAmbiente">
                                    <div className="contAmb"><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M18.028 24h-.018c-.268 0-.49-.213-.499-.483-.05-1.462.19-2.847 2.265-3.08.795-.089.858-.367.996-.977.229-1.008.607-1.922 2.701-2.032.285-.02.512.197.526.473.014.276-.197.512-.473.526-1.512.079-1.618.547-1.778 1.254-.152.667-.359 1.581-1.861 1.751-1.016.113-1.432.423-1.377 2.051.01.276-.207.507-.482.517zm-8.342-18.714c.241.213.53.366.842.444l3.566.896c.3.076.617.051.903-.07 1.082-.461 3.862-1.684 5.062-2.155.76-.299 1.268.63.655 1.097-1.39 1.062-5.714 4.086-5.714 4.086l-.862 3.648s1.785 1.86 2.544 2.7c.423.469.696.919.421 1.595-.481 1.181-1.457 3.477-1.908 4.547-.255.605-1.164.453-1.015-.322.217-1.128.781-4.016.781-4.016l-3.558-1.62s-.253 5.953-.327 7.296c-.019.341-.253.589-.582.588-.249-.001-.508-.173-.612-.596-.534-2.178-2.142-8.99-2.142-8.99-.209-.837-.329-1.53-.053-2.564l.915-3.85s-2.726-3.984-3.709-5.476c-.402-.611.356-1.18.808-.78l3.985 3.542zm-7.178 8.489l-.853.511 2.708 4.524c-1.788.306-2.917 1.904-2.048 3.356.537.897 1.753 1.106 2.622.586 1.034-.619 1.774-1.952.979-3.284l-3.408-5.693zm17.721-5.193l.904 1.669 1.867.344-1.308 1.376.249 1.882-1.712-.819-1.713.819.25-1.882-1.309-1.376 1.867-.344.905-1.669zm-17.298-2.935l-2.934 2.935 2.934 2.935 2.935-2.935-2.935-2.935zm9.055-5.398c1.36-.626 2.972-.03 3.597 1.33.626 1.36.03 2.972-1.33 3.598-1.36.625-2.972.029-3.598-1.331-.625-1.36-.029-2.972 1.331-3.597z"/></svg></div>
                                    <label>Ambiente</label>
                                    <p>4.5</p>
                                  </div>
                                </center>
                              </section>
                            <div id="Comentar">
                              <section className="contFotoUsuario">
                                <img src={user.perfil} alt="Foto Usuario" />
                              </section>

                              <section className="comentario">
                                <p onClick={() => setShowModal(!showModal)}>
                                  Comenta algo interesante
                                </p>
                              </section>
                            </div>

                            <ComentariosNegocio id_negocio={user.id} />

                          </section>
                        </div>
                      </div>
                    </>
                  ) : visua === 6 ? (
                    <>
                      <div className="contHomeChat">
                        <AllChats />
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
