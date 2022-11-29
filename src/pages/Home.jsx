import React from "react";
import useAuth from "../auth/useAuth";
import { useRef, useState, Suspense, lazy, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Autocomplete } from "@react-google-maps/api";
import "../stylesheets/Home.css";
import "../stylesheets/BurguerMenu.css";
import Evento from "../components/EventosPagPrin";
import Loading from "../components/Loading";
import instance from "../api/axios";
import Header from "../components/Header";
import Modal from "../components/modals/Modal";
import ListaEventosFeed from "../components/infElements/ListaEventosFeed";
import RegistroEvento from "./RegistroEvento";
import ListarComentarios from "../components/social/ListarComentarios";
import ComentariosNegocio from "../components/social/ComentariosNegocio";
import AllChats from "../components/social/AllChats";
import socket from "../components/sockets/Socket";

const Mapa = lazy(() => import("../components/Mapa"));
const MapNegocio = lazy(() => import("../components/maps/MapNegocio"));


function Home() {
  // Area de pruebas
  const [mensajesCarg, setMensajesCarg] = useState([]);
  /** @type React.MutableRefObject<HTMLInputElement> */
  const alertRef = useRef();
  const cambiarMensajes = (mensajes) => {
    setMensajesCarg(mensajes)
  }
  const nav = useNavigate();

  const chatRef = useRef(null);

  // Fin del area de pruebas
  const { eventos, user } = useAuth();

  const [map, setMap] = useState(/** @type google.maps.Map */(null));
  const [evCre, setEvCre] = useState([]);
  const [visua, setVisua] = useState(6);
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

  const location = useLocation();

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
              <button onClick={() => setShowModal(!showModal)} className="btnLink2">Crear un evento</button>
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
                <section id="InfOpinionesAnfitrion">

                </section>
              </>
            )
            }
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
