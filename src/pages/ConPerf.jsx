import React from "react";
import { useRef, useState} from "react";
import { Autocomplete } from "@react-google-maps/api";
import useAuth from "../auth/useAuth";
import Header from "../components/Header";
import { slide as Menu } from "react-burger-menu";
import "../stylesheets/ConfPerf.css"
import img from "../images/Plagui.jpg"
import { Link} from "react-router-dom";
import routes from "../helpers/routes";
import backimg from "../images/Wall (15).jpg"
import { useNavigate } from "react-router-dom";
import instance from "../api/axios";
import Modal from "../components/Modal";
import '../stylesheets/Modal.css'

function ConPerf() {
  const nav = useNavigate();
  const { logout, user, loginCargo } = useAuth();
  const [cont, setCont] = useState(1);

  const [negocios, setNegocios] = useState([]);
  const [patrocinios, setPatrocinios] = useState([]);
  const [artistas, setArtistas] = useState([]);
  const [opcio, setOpcio] = useState(false);
  const toggle = () => { setOpcio(!opcio) };
  
  // Para mostrar un modal diferente (esta fue la primer forma que se me ocurrio no me juzguen)
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [showModal5, setShowModal5] = useState(false);

  function cambioVis(ver) {
    setCont(ver);
  }

  // handleChance para los inputs
  const [usuarioUpdate, setUsuarioUpdate] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    domicilio: "",
    fecha_nacimiento: ""
  });

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();

  const handleChange = (e) => {
    setUsuarioUpdate({
      ...usuarioUpdate,
      [e.target.name]: e.target.value,
    });
  }
  const handleDomic = () => {
    // console.log(originRef.current)
    if(originRef.current !== undefined){
      setUsuarioUpdate({
        ...usuarioUpdate,
        domicilio: originRef.current.value,
      });
    }
  }
  const handleUpdate = () => {
    handleDomic();
    instance.put(`/usuarios/${user.id}`, usuarioUpdate)
      .then((res) => {
        alert("Se actualizo correctamente");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  let consneg = false;
  let conspat = false;
  let consart = false;
  const cargVis = (dond) => {
    if (dond === 2 && !consneg) {
      instance.get(`/cargos/negocio/${user.id}`).then((res) => {
        setNegocios(res.data);
      })
        .catch((err) => {
          console.log(err);
        });
      consneg = true
    }
    if (dond === 3 && !conspat) {
      instance.get(`/cargos/patrocinador/${user.id}`).then((res) => {
        setPatrocinios(res.data);
      })
        .catch((err) => {
          console.log(err);
        })
    }
    if (dond === 4 && !consart) {
      instance.get(`/cargos/artista/${user.id}`).then((res) => {
        setArtistas(res.data);
      })
        .catch((err) => {
          console.log(err);
        })
    }
    cambioVis(dond)
  }

  return (
    <>
      <Header tipo={'responsive'} perfil={user.nombre} back={true} />

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

      <div className="contPerf">

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
        <div className="contBase">
          <Menu>
            <button onClick={() => cargVis(1)}>Información personal</button>
            <button onClick={() => cargVis(2)}>Negocios</button>
            <button onClick={() => cargVis(3)}>Patrocinios</button>
            <button onClick={() => cargVis(4)}>Entretenimiento</button>
          </Menu>
          <div className="navSideBar">
            <button onClick={() => cargVis(1)}>Información general</button>
            <button onClick={() => cargVis(2)}>Negocios</button>
            <button onClick={() => cargVis(3)}>Patrocinios</button>
            <button onClick={() => cargVis(4)}>Entretenimiento</button>
          </div>
          <div className="contVis">
            {
              cont === 1 ? (
                <div className="confPerfVisPrin">
                  <div className="confPerfContImgUsBack">
                    <div className="confPerfImg">
                      <img src={img} alt="Allí no era" id="imgConfPerfPers" />
                    </div>
                    <img src={backimg} id="confPerfImgBack" />
                  </div>
                  <div className="confPerfInfoGen">
                    <div id="contInfoGen" ><h2>{user.nombre} {" "} {user.apellidos} </h2> <button onClick={() => setShowModal1(!showModal1)}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg></button></div>
                    <div id="contInfoGen"><h2>{user.telefono}</h2> <button onClick={() => setShowModal2(!showModal2)}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg></button></div>
                    <div id="contInfoGen"><h2>{user.email}</h2> <button onClick={() => setShowModal3(!showModal3)}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg></button></div>
                    <div id="contInfoGen"><h2>{user.domicilio !== null ? (user.domicilio) : ("Sin dirección")}</h2> <button onClick={() => setShowModal4(!showModal4)}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg></button></div>
                    <div id="contInfoGen"><h2>{user.fecha_nacimiento !== null ? (user.fecha_nacimiento) : ("Sin fecha de nacimiento")}</h2> <button onClick={() => setShowModal5(!showModal5)}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg></button></div>
                  </div>
                </div>
              ) : cont === 2 ? (
                <div className="confVar">
                  {
                    !negocios.length ? (
                      <div className="contConfVar">
                        <p>Las cuentas de negocios tienen aceso a un historial de eventos, solicitud de patrocinio e invitaciones a artistas</p>
                        <Link to={routes.newnegocio} >Crear nuevo negocio </Link>
                      </div>
                    ) : (
                      <div className="contConfVarEx">
                        <div className="contConfVarNav">
                          <Link to={routes.newnegocio}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-plus" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><circle cx="12" cy="12" r="9" /><line x1="9" y1="12" x2="15" y2="12" /><line x1="12" y1="9" x2="12" y2="15" /></svg>
                            Crear nuevo
                          </Link>
                          <div id="ingoNegHov" className="contConfInfoNeg" title="Las cuentas de negocios tienen aceso a un historial de eventos, solicitud de patrocinio e invitaciones a artistas"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-question-mark" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4" /><line x1="12" y1="19" x2="12" y2="19.01" /></svg></div>
                        </div>
                        <div className="contTarj">
                          {
                            negocios.map((negocio) => {
                              return (

                                <div className="tarj" onClick={() => loginCargo(negocio)}>
                                  <div className="contImgTarj">
                                    <div className="contContimg"><img src={img} alt="Sin imagen" /></div>
                                  </div>
                                  <div className="contInfoTarj">
                                    <h1>{negocio.nombre} </h1>
                                    <h2>Ubicado en: <span>{negocio.direccion} </span></h2>
                                  </div>
                                </div>
                              )
                            })
                          }
                        </div>
                      </div>
                    )
                  }
                </div>
              ) : cont === 3 ? (
                <div className="confVar">
                  {
                    !patrocinios.length ? (
                      <div className="contConfVar">
                        <p>Las cuentas de patrocinadores tienen acceso a eventos cercanos, solicitudes de patrocinio, busqueda de eventos abiertos a patrocinio y a su contacto</p>
                        <Link to={routes.newpatrocinador} >Crear nuevo patrocinio </Link>
                      </div>
                    ) : (
                      <div className="contConfVarEx">
                        <div className="contConfVarNav">
                          <Link to={routes.newpatrocinador}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-plus" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><circle cx="12" cy="12" r="9" /><line x1="9" y1="12" x2="15" y2="12" /><line x1="12" y1="9" x2="12" y2="15" /></svg>
                            Crear nuevo
                          </Link>
                          <div id="ingoNegHov" className="contConfInfoNeg" title="Las cuentas de patrocinadores tienen acceso a eventos cercanos, solicitudes de patrocinio, busqueda de eventos abiertos a patrocinio y a su contacto"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-question-mark" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4" /><line x1="12" y1="19" x2="12" y2="19.01" /></svg></div>
                        </div>
                        <div className="contTarj">
                          {
                            patrocinios.map((patrocinio) => {
                              return (

                                <div className="tarj" onClick={() => loginCargo(patrocinio)}>
                                  <div className="contImgTarj">
                                    <div className="contContimg"><img src={img} alt="Sin imagen" /></div>
                                  </div>
                                  <div className="contInfoTarj">
                                    <h1>{patrocinio.nombre} </h1>
                                    <h2>Ubicado en: <span>{patrocinio.direccion} </span></h2>
                                    <h2>Aqui proporcionas: <span>{patrocinio.tipo}</span></h2>
                                  </div>
                                </div>
                              )
                            })
                          }
                        </div>
                      </div>
                    )
                  }
                </div>
              ) : cont === 4 ? (
                <div className="confVar">
                  {
                    !artistas.length ? (
                      <div className="contConfVar">
                        <p>Las cuentas de Entretenimiento tienen acceso a configuracion de tipo de entretenimineto, solicitudes de participacion en eventos y contacto de eventos en busqueda de entretenimiento</p>
                        <Link to={routes.newartista} >Crear nuevo entretenimiento </Link>
                      </div>
                    ) : (
                      <div className="contConfVarEx">
                        <div className="contConfVarNav">
                          <Link to={routes.newartista}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-plus" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><circle cx="12" cy="12" r="9" /><line x1="9" y1="12" x2="15" y2="12" /><line x1="12" y1="9" x2="12" y2="15" /></svg>
                            Crear nuevo
                          </Link>
                          <div id="ingoNegHov" className="contConfInfoNeg" title="Las cuentas de Entretenimiento tienen acceso a configuracion de tipo de entretenimineto, solicitudes de participacion en eventos y contacto de eventos en busqueda de entretenimiento"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-question-mark" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4" /><line x1="12" y1="19" x2="12" y2="19.01" /></svg></div>
                        </div>
                        <div className="contTarj">
                          {
                            artistas.map((artista) => {
                              return (

                                <div className="tarj" onClick={() => loginCargo(artista)}>
                                  <div className="contImgTarj">
                                    <div className="contContimg"><img src={img} alt="Sin imagen" /></div>
                                  </div>
                                  <div className="contInfoTarj">
                                    <h1>{artista.nombre} </h1>
                                    <h2>Ubicado en: <span>{artista.domicilio} </span></h2>
                                    {
                                      artista.tipo === 1 ? (
                                        <h2>Tipo: <span>Musico</span></h2>
                                      ) : (
                                        <h2>Tipo: <span>Entretenimiento</span></h2>
                                      )
                                    }

                                  </div>
                                </div>
                              )
                            })
                          }
                        </div>
                      </div>
                    )
                  }
                </div>
              ) : (
                <div className="entrVis">
                  <h1>¡UPS!, ¡¿Como llegaste hasta aqui?!</h1>
                  <h1>No te preocupes, solo selecciona alguno de los botones</h1>
                  <h1> {"<= "} {"De los de ese lado"} </h1>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default ConPerf;