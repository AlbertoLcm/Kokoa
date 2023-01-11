import React from "react";
import useAuth from "../../auth/useAuth";
import { useRef, useState, Suspense, lazy, useEffect } from "react";
import { NavLink, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import "../../stylesheets/Home.css";
import Loading from "../../components/loadings/Loading";
import Header from "../../components/Header";
import LoadingElement from "../../components/loadings/LoadingElement";
import Eventos from './Eventos';
import Comunidad from './Comunidad';
import { libraries } from "../../helpers/methodsMap";
import socket from "../../components/sockets/Socket";
import Inicio from "./Inicio";
import Crear from "./eventos/Crear";
const Mapa = lazy(() => import("../../components/maps/Mapa"));

function Home() {

  const { user } = useAuth();

  const navigation = useNavigate();
  const location = useLocation();

  const activeRef = useRef(null);
  const buscadorRef = useRef(null);

  const [map, setMap] = useState(/** @type google.maps.Map */(null));
  const [data, setData] = useState(false);
  const [buscadorActive, setBuscadorActive] = useState(false);
  const [busquedaLugares, setBusquedaLugares] = useState([]);
  const [busquedaEventos, setBusquedaEventos] = useState([]);
  const [busquedaNegocios, setBusquedaNegocios] = useState([]);
  const [selectBusqueda, setSelectBusqueda] = useState('lugares');
  const [search, setSearch] = useState({
    data: ''
  });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBqhV6i7d19_4MlXk1gEtZ0flSx_7yYfo8",
    libraries: libraries,
  });

  const actionDisabledBuscar = () => {
    setBuscadorActive(false);
    setSearch({
      data: ''
    });
    setData(false);
    setBusquedaEventos([]);
    setBusquedaNegocios([]);
    setBusquedaLugares([]);
  }

  // Si da click fuera del busacodor, se desactiva
  useEffect(() => {
    const handleClick = (e) => {
      if (activeRef.current && !activeRef.current.contains(e.target)) {
        actionDisabledBuscar();
      }
    };
    document.addEventListener("click", handleClick);
  }, [activeRef]);

  useEffect(() => {
    socket.on('busqueda-kokoa', (data) => {
      setBusquedaEventos(data.eventos);
      setBusquedaNegocios(data.negocios);
    })
  }, [busquedaEventos, busquedaNegocios]);

  // Funciones de la pagina

  const handleSetMap = (mapita) => {
    setMap(mapita);
  };

  const handleChange = (e) => {
    setSearch({
      data: e.target.value
    });
    setData(true);
    !e.target.value.length && setBusquedaLugares([]);
    // eslint-disable-next-line no-undef
    new google.maps.places.AutocompleteService().getPlacePredictions({
      input: e.target.value,
      types: ['(cities)'],
      componentRestrictions: { country: 'mx' }
    }).then((response) => {
      setBusquedaLugares(response.predictions);
    })

    socket.emit('busqueda-kokoa', e.target.value);
  };

  const redireccionar = (nombre) => {
    // eslint-disable-next-line no-undef
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ 'address': nombre }, (results, status) => {
      map.setCenter(results[0].geometry.location);
      map.setZoom(15);
    });

    actionDisabledBuscar();
  }

  const actionBuscar = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Header tipo={'color'} perfil={user.nombre} back={false} >

        <section ref={activeRef}>
          {!isLoaded ? (<LoadingElement />) : (
            <section className={buscadorActive ? ("contBuscadorHomeActive") : ("contBuscadorHome")}>
              {buscadorActive && (
                <button className="btnBackBuscador" onClick={() => actionDisabledBuscar()}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-left" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3a4" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <line x1="5" y1="12" x2="11" y2="18" />
                    <line x1="5" y1="12" x2="11" y2="6" />
                  </svg>
                </button>
              )}
              <form onSubmit={actionBuscar} method="POST" >
                <input onClick={() => setBuscadorActive(true)} onChange={handleChange} value={search.data} type="text" className="buscador" placeholder="Buscar en Kokoa" ref={buscadorRef} />
                <button type="submit">
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <circle cx="10" cy="10" r="7" />
                    <line x1="21" y1="21" x2="15" y2="15" />
                  </svg>
                </button>
              </form>
            </section>
          )}
          {buscadorActive && (
            <div className="popmenuBuscador">
              <h3>Busquedas</h3>
              <section className="header">
                <button onClick={() => setSelectBusqueda('lugares')} className={selectBusqueda === 'lugares' ? "btn active" : "btn normal"} >Lugares</button>
                <button onClick={() => setSelectBusqueda('eventos')} className={selectBusqueda === 'eventos' ? "btn active" : "btn normal"} >Eventos</button>
                <button onClick={() => setSelectBusqueda('negocios')} className={selectBusqueda === 'negocios' ? "btn active" : "btn normal"} >Negocios</button>
              </section>

              {!data ? ((<div className="busquedasNull"> Busca lugares, eventos o negocios </div>))
                : (
                  <>
                    {selectBusqueda === 'eventos' && (
                      <ul>
                        {!busquedaEventos.length ? (<div className="busquedasNull"> {search.data ? (<p> No hay eventos con "{search.data}"</p>) : <p>Escribe algo para buscar eventos</p>} </div>) : (null)}
                        {busquedaEventos.map((evento, index) => (
                          <Link to={`?nombre=${evento.nombre}&id=${evento.id_evento}`} onClick={() => actionDisabledBuscar()} >
                            <li key={index}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f369" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <circle cx="10" cy="10" r="7" />
                                <line x1="21" y1="21" x2="15" y2="15" />
                              </svg>
                              <h4>{evento.nombre}</h4>
                            </li>
                          </Link>
                        ))}
                      </ul>
                    )}

                    {selectBusqueda === 'lugares' && (
                      <ul>
                        {!busquedaLugares.length ? (<div className="busquedasNull"> {search.data ? (<p> No hay lugares con "{search.data}"</p>) : <p>Escribe algo para buscar lugares</p>} </div>) : (null)}

                        {busquedaLugares.map((lugar, index) => (
                          <li key={index} onClick={() => redireccionar(lugar.description)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f369" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                              <circle cx="10" cy="10" r="7" />
                              <line x1="21" y1="21" x2="15" y2="15" />
                            </svg>
                            <h4>{lugar.description}</h4>
                          </li>
                        ))}
                      </ul>
                    )}

                    {selectBusqueda === 'negocios' && (
                      <ul>
                        {!busquedaNegocios.length ? (<div className="busquedasNull"> {search.data ? (<p> No hay negocios con "{search.data}"</p>) : <p>Escribe algo para buscar negocios</p>} </div>) : (null)}

                        {busquedaNegocios.map((negocio, index) => (
                          <Link to={`negocio/${negocio.nombre}/${negocio.id}`} >
                            <li key={index}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f369" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <circle cx="10" cy="10" r="7" />
                                <line x1="21" y1="21" x2="15" y2="15" />
                              </svg>
                              <h4>{negocio.nombre}</h4>
                            </li>
                          </Link>
                        ))}
                      </ul>
                    )}
                  </>
                )}
            </div>
          )}
        </section>
      </Header>

      <Routes>
        <Route path="crear/evento" element={<Crear />} />
      </Routes>

      <div id="ContGeneralHome">
        <section className="contMapaHome">
          <Suspense fallback={<Loading />}>
            <Mapa mapSet={handleSetMap} map={map} />
          </Suspense>
        </section>

        <section className="feedHome">
          <section id="HeaderFeedHome">

            <button onClick={() => navigation('/crear/evento', { state: { from: location.pathname } })} className="btnLink2">Crear un evento</button>
            <div id="ContBtnFeedAnfitrion">
              <div id="BtnFeedAnfitrion">
                <NavLink to={'/'} className={({ isActive }) => isActive ? "active" : ""}  >Inicio</NavLink>
                <NavLink to={'/eventos'} >Eventos</NavLink>
                <NavLink to={'/comunidad'} >Comunidad</NavLink>
              </div>
            </div>
          </section>

          <section className="contenedorContenido">
            <Routes>
              <Route path="" element={<Inicio />} />
              <Route path="eventos/*" element={<Eventos />} />
              <Route path="comunidad" element={<Comunidad />} />
            </Routes>
          </section>
        </section>
      </div>
    </>
  );
}

export default Home;
