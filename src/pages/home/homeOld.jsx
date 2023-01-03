import React from "react";
import useAuth from "../../auth/useAuth";
import { useRef, useState, Suspense, lazy, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import "../stylesheets/Home.css";
import "../stylesheets/BurguerMenu.css";
import Evento from "../../components/EventosPagPrin";
import Loading from "../../components/loadings/Loading";
import instance from "../../api/axios";
import Header from "../../components/Header";
import Modal from "../../components/modals/Modal";
import ListaEventosFeed from "../../components/infElements/ListaEventosFeed";
import RegistroEvento from "../RegistroEvento";
import ListarComentarios from "../../components/social/ListarComentarios";
import ComentariosNegocio from "../../components/social/ComentariosNegocio";
import AllChats from "../../components/social/AllChats";
import socket from "../../components/sockets/Socket";
import LoadingElement from "../../components/loadings/LoadingElement";

const Mapa = lazy(() => import("../../components/maps/Mapa"));
const MapNegocio = lazy(() => import("../../components/maps/MapNegocio"));


function Home() {
  /** @type React.MutableRefObject<HTMLInputElement> */
  const alertRef = useRef();
  const buscadorRef = useRef();

  const { eventos, user, eventosTranscurso } = useAuth();

  const [map, setMap] = useState(/** @type google.maps.Map */(null));
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBqhV6i7d19_4MlXk1gEtZ0flSx_7yYfo8",
    libraries: ["places"],
  });
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
    if (originRef.current !== undefined) {
      setUpdateRol({
        ...updateRol,
        domicilio: originRef.current.value,
      });
    }
  }
  const handleUpdate = () => {
    handleDomic();
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

    return (
      <>
       <Modal
          estado={showModal}
          cambiarEstado={setShowModal}
          titulo={"Crear un evento"}
        >
          <RegistroEvento map={map} />
        </Modal>

        <Header tipo={'color'} perfil={user.nombre} back={false} />

        <div id="ContGeneralHome">

          <div className="contMapaHome">
            <Suspense fallback={<Loading />}>
              <Mapa mapSet={handleSetMap} map={map} />
            </Suspense>
          </div>

          <div className="feedHome">
            <section id="HeaderFeedHome">
              {!isLoaded ? (<LoadingElement />) : (
                <Autocomplete>
                  <section className="contBuscador home">
                    <form onSubmit={actionBuscar} method="POST" >
                      <input type="text" className="buscador" placeholder="Buscar" ref={buscadorRef} />
                      <button type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
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
                  <NavLink to={'recomendados'} className="btnFeedHome" >Para ti</NavLink>
                  <NavLink to={'cercanos'} className="btnFeedHome" >Cercanos</NavLink>
                  <NavLink to={'curso'} className="btnFeedHome" >En curso</NavLink>
                  <NavLink to={'comunidad'} className="btnFeedHome" >Comunidad</NavLink>
                </div>
              </section>
            </section>

            <section className="contenedorContenido">
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
        </div>
      </>
    );
}

export default Home;
